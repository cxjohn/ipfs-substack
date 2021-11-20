
import Ceramic from '@ceramicnetwork/http-client'
import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { DID } from 'dids'
import { IDX } from '@ceramicstudio/idx'
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

	window.idx = new IDX({ ceramic });
	window.ceramic = ceramic;
	window.did = did.id;
	
	return did.id;
}

async function getStreamID(address) {
	const doc = await TileDocument.deterministic(
		window.ceramic,
		{
			controllers: [window.did],
			family: "3Feed:"+address,
		},
		{ anchor: false, publish: false } // TODO: Make this publish I think?
	);
	console.log(doc.id.toString())

	return doc.id;
}

export async function getFeed(address) {
	const streamID = await getStreamID(address);
	const doc = await TileDocument.load(window.ceramic, streamID);
	console.log(doc.content);
}

// content will conform to the following
// {
// title: string
// subtitle: string;
// articleBody: string;
// paid: boolean;
// }
export async function updateFeed(address, content) {
	const streamID = await getStreamID(address);
	const doc = await TileDocument.load(window.ceramic, streamID);
	await doc.update([content, ...doc.content]);
}
