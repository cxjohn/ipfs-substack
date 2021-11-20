import Head from "next/head";
import Login from "./../src/layout/Login";

export default function Home() {

  return (
    <div className="min-h-screen">
      <Head>
        <title>Login - 3Feed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </div>
  );
}
