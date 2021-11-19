import Head from "next/head";
import { useState } from "react";
import Login from "./../src/layout/Login";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");

  return (
    <div className="min-h-screen">
      <Head>
        <title>Login - 3Feed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login setCurrentAccount={setCurrentAccount} />
    </div>
  );
}
