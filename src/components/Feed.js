import Link from "next/link";

const articles = [
  {
    title: "The meaning of Afghanistan",
    subtitle: `"The thing it is doing is by no means the thing we want to have done."`,
  },
  {
    title: "For the times they are a-changing",
    subtitle: `"And admit that the waters around you have grown."`,
  },
  {
    title: "As breathing and consciousness return",
    subtitle: `"The big things are useful, but hard. The small things are easy, but useless."`,
  },
  {
    title: "Rise of the neutral company",
    subtitle: `"Politics is the exercise of collective power against human opposition."`,
  }, {
    title: "The meaning of Afghanistan",
    subtitle: `"The thing it is doing is by no means the thing we want to have done."`,
  },
  {
    title: "For the times they are a-changing",
    subtitle: `"And admit that the waters around you have grown."`,
  },
  {
    title: "As breathing and consciousness return",
    subtitle: `"The big things are useful, but hard. The small things are easy, but useless."`,
  },
  {
    title: "Rise of the neutral company",
    subtitle: `"Politics is the exercise of collective power against human opposition."`,
  }, {
    title: "The meaning of Afghanistan",
    subtitle: `"The thing it is doing is by no means the thing we want to have done."`,
  },
  {
    title: "For the times they are a-changing",
    subtitle: `"And admit that the waters around you have grown."`,
  },
  {
    title: "As breathing and consciousness return",
    subtitle: `"The big things are useful, but hard. The small things are easy, but useless."`,
  },
  {
    title: "Rise of the neutral company",
    subtitle: `"Politics is the exercise of collective power against human opposition."`,
  }, {
    title: "The meaning of Afghanistan",
    subtitle: `"The thing it is doing is by no means the thing we want to have done."`,
  },
  {
    title: "For the times they are a-changing",
    subtitle: `"And admit that the waters around you have grown."`,
  },
  {
    title: "As breathing and consciousness return",
    subtitle: `"The big things are useful, but hard. The small things are easy, but useless."`,
  },
  {
    title: "Rise of the neutral company",
    subtitle: `"Politics is the exercise of collective power against human opposition."`,
  }, {
    title: "The meaning of Afghanistan",
    subtitle: `"The thing it is doing is by no means the thing we want to have done."`,
  },
  {
    title: "For the times they are a-changing",
    subtitle: `"And admit that the waters around you have grown."`,
  },
  {
    title: "As breathing and consciousness return",
    subtitle: `"The big things are useful, but hard. The small things are easy, but useless."`,
  },
  {
    title: "Rise of the neutral company",
    subtitle: `"Politics is the exercise of collective power against human opposition."`,
  }, {
    title: "The meaning of Afghanistan",
    subtitle: `"The thing it is doing is by no means the thing we want to have done."`,
  },
  {
    title: "For the times they are a-changing",
    subtitle: `"And admit that the waters around you have grown."`,
  },
  {
    title: "As breathing and consciousness return",
    subtitle: `"The big things are useful, but hard. The small things are easy, but useless."`,
  },
  {
    title: "Rise of the neutral company",
    subtitle: `"Politics is the exercise of collective power against human opposition."`,
  },
];

export default function Feed({}) {
  return (
    <div className="py-24">
      {articles.map((article, idx) => {
        return (
            <Link href="/read/123" key={idx}>
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
  );
}
