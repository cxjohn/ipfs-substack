import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import Dashboard from "./../src/layout/Dashboard";
import Login from "./../src/layout/Login";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");

  return (
    <div className='min-h-screen'>
      <Head>
        <title>MaybeSubstack</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {currentAccount ? (
        <Dashboard />
      ) : (
        <Login setCurrentAccount={setCurrentAccount} />
      )}
    </div>
  );
}
