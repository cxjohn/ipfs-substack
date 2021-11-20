import Web3Modal from "web3modal";

const providerOptions = {
  /* See Provider Options Section */
};

export async function getProvider() {
	const web3Modal = new Web3Modal({
	  network: "rinkeby", // optional
	  cacheProvider: true, // optional
	  providerOptions // required
	});

	const ethProvider = await web3Modal.connect()

	return ethProvider;
}
