import { useEffect } from "react";
import { useRouter } from 'next/router'
import { authenticate } from "../../lib/feed";

export default function Login({ setCurrentAccount }) {
  const router = useRouter()

	const didAuth = async () => {
		const ceramicID = await authenticate();
		if (ceramicID) {
			console.log("Logged in: " + ceramicID);
			router.push('/dashboard')
		} else {
			console.warn("Login Failed");
		}
	};

  useEffect(() => {
		didAuth()
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
          onClick={didAuth}
        >
          Connect Wallet
        </button>
      </div>
      <div className="bg-sheet bg-cover w-1/2"></div>
    </main>
  );
}
