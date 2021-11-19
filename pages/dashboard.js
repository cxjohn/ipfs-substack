import Head from "next/head";
import Link from "next/link";
import NavBar from "./../src/layout/Navbar";
import Feed from "./../src/components/Feed";

export default function Dashboard({ currentAccount }) {
    
    console.log(window.ethereum)
  return (
    <div className="min-h-screen">
      <Head>
        <title>Dashboard - 3Feed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar currentAccount={currentAccount} />
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 pt-20 text-center">
        <Feed />
      </main>
    </div>
  );
}
