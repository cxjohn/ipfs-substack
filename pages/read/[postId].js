import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import NavBar from "../../src/layout/Navbar";
import { authenticate, getArticle } from "../../lib/feed";
import { claimFunds, getArticlePayout } from "../../lib/locks";

export default function Read() {
  const [post, setPost] = useState({});
  const [payout, setPayout] = useState(0.0);
  const router = useRouter();

  const { postId } = router.query;

  useEffect(() => {
    const inner = async () => {
      if (!window.did) {
        await authenticate();
      }

      const article = await getArticle(postId);
      setPost(article);
    };

    inner();
    if (!window.did) {
      authenticate();
    }
  }, []);

  useEffect(() => {
    if (post.paid) {
      getArticlePayout(post.paid).then(setPayout);
    }
  }, [post]);

  const claim = () => {
    if (post.paid) {
      claimFunds(post.paid).then(st => {
        if (st) {
          setPayout(0.0);
        } else {
          console.log("Transaction failed");
        }
      });
    }
  };

  return (
    <>
      <Head>
        <title>Read Post - 3Feed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="container mx-auto mt-20 py-24">
        <div className="max-w-[728px] mx-auto border-b">
          <div className="text-4xl font-bold pb-2">{post.title}</div>
    {payout > 0 && (
      <div className="text-l text-gray-500 pb-5" onClick={claim}>Claim your {payout} ETH</div>
    )}
          <div className="text-xl text-gray-500 pb-5">{post.subtitle}</div>
          <div className="pb-8">{post.body && parse(post.body)}</div>
        </div>
      </div>
    </>
  );
}
