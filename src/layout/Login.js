import { useEffect } from "react";

export default function Login({ setCurrentAccount }) {
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <main className="flex h-screen justify-between">
      <div className="flex flex-col items-center justify-center w-1/2">
        <div className="text-4xl font-bold pb-2">Login using MetaMask</div>
        <div className="text-xl text-gray-500 pb-5">
          Don't have it? Sign up{" "}
          <a
            className="text-indigo-600 hover:text-indigo-500"
            href="https://metamask.io/"
            target="_blank"
          >
            here
          </a>
        </div>
        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 h-10 rounded-md cursor-pointer transition-colors duration-200 ease-in-out transform"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      </div>
      <div className="bg-sheet bg-cover w-1/2"></div>
    </main>
  );
}
