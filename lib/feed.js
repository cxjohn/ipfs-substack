
import Ceramic from '@ceramicnetwork/http-client'
import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { DID } from 'dids'
import Web3Modal from "web3modal";
import { TileDocument } from '@ceramicnetwork/stream-tile';

const providerOptions = {
  /* See Provider Options Section */
};


const API_URL = 'https://ceramic-clay.3boxlabs.com'

// const API_URL = 'https://gateway-clay.ceramic.network'

export async function authenticate() {
	const threeIdConnect = new ThreeIdConnect()

	const web3Modal = new Web3Modal({
	  network: "mainnet", // optional
	  cacheProvider: true, // optional
	  providerOptions // required
	});

	const ethProvider = await web3Modal.connect()
  const addresses = await ethProvider.enable()

	const authProvider = new EthereumAuthProvider(ethProvider, addresses[0])
  await threeIdConnect.connect(authProvider)

	const ceramic = new Ceramic(API_URL)
  const did = new DID({
    provider: threeIdConnect.getDidProvider(),
    resolver: ThreeIdResolver.getResolver(ceramic),
  })
	ceramic.did = did;

	await did.authenticate()

	window.ceramic = ceramic;
	window.did = did.id;

	return did.id;
}

async function getStreamID(did, type) {
	const doc = await TileDocument.deterministic(
		window.ceramic,
		{
			controllers: [did],
			family: "3Feed:"+type,
		},
		{ anchor: false, publish: false } // TODO: Make this publish I think?
	);

	return doc.id;
}

async function getFeed(did) {
	const streamID = await getStreamID(did, "posts");
	const doc = await TileDocument.load(window.ceramic, streamID);

	return doc.content.feed ? doc.content.feed : [];
}

// Some of our older feeds are missing info, this will infill that 
// missing data
const defaultFeed = {
	time: 0,
	title: "Missing title...",
	subtitle: "Missing subtitle",
	id: 'no_id',
}

export async function getFeeds() {
	const subDids = await getSubscriptions();
	const feeds = await Promise.all(subDids.map(getFeed));
	// Filter out empties
	const filtered = feeds.flat().filter(f => f.id);
	const clean = filtered.map(f => { return {...defaultFeed, ...f}; });
	console.log(clean);
	return clean.sort((a, b) => b.time - a.time);
}

// content will conform to the following
// {
// title: string
// subtitle: string;
// articleBody: string;
// paid: boolean;
// }
export async function updateFeed(content) {

	const post = await TileDocument.create(
	  window.ceramic,
		content,
	  {
	    controllers: [window.did],
	    family: 'post',
	  }
	);


	const streamID = await getStreamID(window.did, "posts");
	const doc = await TileDocument.load(window.ceramic, streamID);
	const old = doc.content.feed ? doc.content.feed : [];
	await doc.update({feed: [{title: content.title, subtitle: content.subtitle, time: content.time, id: post.id.toString()}, ...old]});

	return post.id.toString();
}

export async function getArticle(streamID) {
	const doc = await TileDocument.load(window.ceramic, streamID);

	return doc.content;
}

// Appends a did to the feed list
export async function subscribeToDid(did) {
	const streamID = await getStreamID(window.did, "following");
	const doc = await TileDocument.load(window.ceramic, streamID);
	const old = doc.content.following ? doc.content.following : [];
	await doc.update({following: [did, ...old]});
}

// Appends a did to the feed list
export async function unSubscribeDid(did) {
	const streamID = await getStreamID(window.did, "following");
	const doc = await TileDocument.load(window.ceramic, streamID);
	const old = doc.content.following ? doc.content.following : [];
	const filtered = old.filter(d => d !== did);
	await doc.update({following: filtered});
}

export async function getSubscriptions() {
	const streamID = await getStreamID(window.did, "following");
	const doc = await TileDocument.load(window.ceramic, streamID);
	return doc.content.following ? doc.content.following : [];
}
