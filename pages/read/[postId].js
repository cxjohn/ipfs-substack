import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import NavBar from "../../src/layout/Navbar";
import { authenticate, getArticle } from "../../lib/feed";

export default function Read() {
  const [post, setPost] = useState({});
  const router = useRouter();

  const { postId } = router.query;

  useEffect(() => {
    const inner = async () => {
      if (!window.did) {
        await authenticate();
      }

      const article = await getArticle(postId);
      setPost(article);
      console.log(article);
    };

    inner();
    if (!window.did) {
      authenticate();
    }
  }, []);

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
          <div className="text-xl text-gray-500 pb-5">{post.subtitle}</div>
          <div className="pb-8">{post.body && parse(post.body)}</div>
        </div>
      </div>
    </>
  );
}
