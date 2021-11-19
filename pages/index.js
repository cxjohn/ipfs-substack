import Head from "next/head";
import { useState } from "react";
import Dashboard from "./../src/layout/Dashboard";
import Login from "./../src/layout/Login";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");

  return (
    <div className="min-h-screen">
      <Head>
        <title>3Feed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {currentAccount ? (
        <Dashboard currentAccount={currentAccount} />
      ) : ( */}
      <Login setCurrentAccount={setCurrentAccount} />
      {/* )} */}
    </div>
  );
}
