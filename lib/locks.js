import { ethers } from "ethers";
import { PublicLockV9 } from '@unlock-protocol/contracts';
import { Unlock } from '@unlock-protocol/unlock-abi-9';
import { getProvider } from './provider';

// Let's use eth for simplicity for now
// const DAIAddress = "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea"
const paymentTokenAddress = "0x0000000000000000000000000000000000000000"
const unlockAddress = "0xD8C88BE5e8EB88E38E6ff5cE186d764676012B0b";
const actuallyBigNumber = "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
const priceWei = 1000000000000000; // 10**15 == 0.001ETH ~= $5

function toHex12(uint) {
	const u = uint % 79228162514264337593543950336;
	return ethers.utils.hexZeroPad(ethers.utils.hexValue(u), 12);
}


export async function createLock(did, count) {
	const ethProvider = await getProvider();

	const provider = new ethers.providers.Web3Provider(ethProvider);
	const signer = provider.getSigner();

	const un = new ethers.Contract(unlockAddress, Unlock.abi, signer);

	console.log(await un.locks(await signer.getAddress()));

	const params = [
		60*60*24*14, // 2 week duration
		paymentTokenAddress, // ERC20 token address for payments (or 0x0 for ETH)
		priceWei, // Price to unlock
		actuallyBigNumber, // Unlimited I think
		"3Feed"+count+did, // Lock name
		toHex12(count), // Salt to make it unique (12 byte max)
	];

	const gasPrice = await provider.getGasPrice() // Let's get the current gas price
	const options = {
		gasPrice: Math.floor(gasPrice * 1.5),
		value: 0, // we're not sending any money to the contract
		gasLimit: 1000000,
	};
	const tx = await un.createLock(...params, options)
	const receipt = await tx.wait();

	return receipt?.logs?.topics[2];
}

export async function checkLock(address) {
	const ethProvider = await getProvider();

	const provider = new ethers.providers.Web3Provider(ethProvider);
	const signer = provider.getSigner();

	const lock = new ethers.Contract(address, PublicLockV9.abi, signer);

	const hasKey = await lock.balanceOf(await signer.getAddress());

	return !!hasKey.toNumber();
}

export async function getKeyPrice(address) {
	const ethProvider = await getProvider();

	const provider = new ethers.providers.Web3Provider(ethProvider);
	const signer = provider.getSigner();

	const lock = new ethers.Contract(address, PublicLockV9.abi, signer);

	return await lock.keyPrice();
}

export async function purchaseKey(address) {
	const ethProvider = await getProvider();

	const provider = new ethers.providers.Web3Provider(ethProvider);
	const signer = provider.getSigner();

	const lock = new ethers.Contract(address, PublicLockV9.abi, signer);

	const amount = await lock.keyPrice()
	const walletAddress = await signer.getAddress();

	const params = [
		amount,
		walletAddress,
		walletAddress,
		[],
	];

	const gasPrice = await provider.getGasPrice() // Let's get the current gas price
	const options = {
		gasPrice: Math.floor(gasPrice * 1.5),
		value: amount,
	};
	console.log(params)
	console.log(options)

	const gasEstimate = await lock.estimateGas.purchase(...params, options);
	options.gasLimit = gasEstimate;

	const tx = await lock.purchase(...params, options)
	const receipt = await tx.wait();
	console.log(tx);
	console.log(receipt);
}
