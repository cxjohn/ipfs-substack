import Link from "next/link";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { authenticate, getFeeds } from "../../lib/feed";
import { checkLock, purchaseKey } from "../../lib/locks";

const articles = [
  {
    title: "The meaning of Afghanistan",
    id: "1",
    subtitle: `"The thing it is doing is by no means the thing we want to have done."`,
    paid: true,
  },
  {
    title: "For the times they are a-changing",
    id: "2",
    subtitle: `"And admit that the waters around you have grown."`,
  },
  {
    title: "As breathing and consciousness return",
    id: "3",
    subtitle: `"The big things are useful, but hard. The small things are easy, but useless."`,
  },
  {
    title: "Rise of the neutral company",
    id: "4",
    subtitle: `"Politics is the exercise of collective power against human opposition."`,
    paid: true,
  },
  {
    title: "The meaning of Afghanistan",
    id: "5",
    subtitle: `"The thing it is doing is by no means the thing we want to have done."`,
    paid: true,
  },
  {
    title: "For the times they are a-changing",
    id: "6",
    subtitle: `"And admit that the waters around you have grown."`,
  },
];

export default function Feed({}) {
  const router = useRouter()
  const [feed, setFeed] = useState([]);

  const unlock = (article) => {
		const inner = async () => {
			if (typeof article.paid === "string" && await checkLock(article.paid)) {
				router.push('/read/' + article.id);
			} else {
				if (await purchaseKey(article.paid)) {
					router.push('/read/' + article.id);
				} else {
					console.log("Did not buy the article");
				}
			}
		};

		inner();
  };

  useEffect(() => {
    const inner = async () => {
      if (!window.did) {
        await authenticate();
      }

      const feed = await getFeeds();
      setFeed(feed);
    };

    inner();
  }, []);

  return (
    <div className="py-24">
      <div className="border-b pb-4">
        {feed.map((article, idx) => {
          return (
            <>
              {article.paid ? (
                <div
                  onClick={() => unlock(article)}
                  className="relative w-[728px] flex py-3 pl-3 mb-4 cursor-pointer bg-gray-100 hover:bg-gray-50 transition-colors duration-100 ease-in-out transform rounded-md"
                  key={idx}
                >
                  <div className="absolute -top-2 -left-2" key={idx}>
                    <svg
                      x="0px"
                      y="0px"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                    >
                      <path d="M 15 2 C 11.154545 2 8 5.1545455 8 9 L 8 11 L 6 11 C 4.9 11 4 11.9 4 13 L 4 25 C 4 26.1 4.9 27 6 27 L 24 27 C 25.1 27 26 26.1 26 25 L 26 13 C 26 11.9 25.1 11 24 11 L 22 11 L 22 9 C 22 8.2047619 21.890601 7.4100849 21.648438 6.6835938 A 1.0001 1.0001 0 0 0 21.630859 6.6347656 C 20.590278 3.9754991 18.035897 2 15 2 z M 15 4 C 17.156184 4 18.991314 5.4178066 19.755859 7.3476562 C 19.908334 7.8171537 20 8.4064272 20 9 L 20 11 L 10 11 L 10 9 C 10 6.2454545 12.245455 4 15 4 z"></path>
                    </svg>
                  </div>
                  <img src="/article.svg" width="60" />
                  <div className="pl-3 text-left">
                    <p className="text-2xl font-bold pb-2">{article.title}</p>
                    <p className="text-lg text-gray-500">{article.subtitle}</p>
                  </div>
                </div>
              ) : (
                <Link href={"/read/" + article.id} key={idx}>
                  <div className="w-[728px] flex py-3 pl-3 mb-4 cursor-pointer hover:bg-gray-50 transition-colors duration-100 ease-in-out transform rounded-md">
                    <img src="/article.svg" width="60" />
                    <div className="pl-3 text-left">
                      <p className="text-2xl font-bold pb-2">{article.title}</p>
                      <p className="text-lg text-gray-500">
                        {article.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
