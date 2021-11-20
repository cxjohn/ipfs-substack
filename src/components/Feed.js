import Link from "next/link";
import { useEffect, useState } from "react";
import { authenticate, getFeed } from "../../lib/feed";

export default function Feed({}) {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const inner = async () => {
      if (!window.did) {
        await authenticate();
      }

      const feed = await getFeed(0x123);
      setFeed(feed);
    };

    inner();
  }, []);

  return (
    <div className="py-24">
      <div className="border-b pb-8">
        {feed.map((article, idx) => {
          return (
            <Link href={"/read/" + article.id} key={idx}>
              <div
                onClick={() => console.log("open sesame")}
                className="w-[728px] flex py-3 pl-3 cursor-pointer hover:bg-gray-50"
              >
                <img src="/article.svg" width="60" />
                <div className="pl-3 text-left">
                  <p className="text-2xl font-bold pb-2">{article.title}</p>
                  <p className="text-lg text-gray-500">{article.subtitle}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
