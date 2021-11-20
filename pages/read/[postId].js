import Head from "next/head";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import parse, { attributesToProps } from "html-react-parser";
import NavBar from "../../src/layout/Navbar";
import { authenticate, getArticle } from "../../lib/feed";

const text = {
  title: "The contract of any next regime",
  subtitle: `"Our own revolution must be both gentler, and more complete."`,
  body: `<p><span style="font-size: 18px;">Back in 1994, the lovely and talented Newton Leroy “Newt” Gingrich, a sort of C-tier American Metternich from the Hardee’s belt, invented the “Contract with America.”</span></p>
<p></p>
<p><span style="font-size: 18px;">Except for winning an election or two, the Contract was a complete failure. It was not even a thing. Its content was the kind of vague, petty powerpoint of half-meaningful, mostly-irrelevant bullet points that passes for a “platform” in a post-democratic age.</span></p>
<p></p>
<p><span style="font-size: 18px;">Yet it represents the high point of cohesive energy in counter-regime American politics in the last 30 years—so why not imagine it done right?</span></p>
<p></p>
<p><span style="font-size: 18px;">What covenant of consent could define the mission of the next American regime? Given sovereign power to achieve some purpose—what would that purpose be?</span></p>
<p></p>
<p><span style="font-size: 30px;"><strong>The turn and the operation</strong></span></p>
<p><span style="font-size: 18px;">Any potential next regime has to ask Americans to restore their popular sovereignty—yet not to exercise that sovereignty by ruling themselves. For they simply do not have the virtue, or even the energy, to rule themselves—yet still deserve to be well-ruled.</span></p>
<p></p>
<p><span style="font-size: 18px;">Their one path to being well-ruled is to replace one autocracy with another. They need to shrug off their current autocratic oligarchy (“liberal democracy”), and replace it with an autocratic monarchy (“dictatorship”), in a transition of power as total as the fall of East Germany—the complete and final end of both an institutional infrastructure and an ideology.</span></p>
`,
};

// const text2 = `<p className="text-white"><span style="font-size: 18px;">Their one path to being well-ruled is to replace one autocracy with another. They need to shrug off their current autocratic oligarchy (“liberal democracy”), and replace it with an autocratic monarchy (“dictatorship”), in a transition of power as total as the fall of East Germany—the complete and final end of both an institutional infrastructure and an ideology.</span></p>`;

// {
//   parse(text2, {
//     replace: (domNode) => {
//       if (domNode.attribs && domNode.name === "p") {
//         return domNode.attribs({
//           name: "classname",
//           namespace: undefined,
//           prefix: undefined,
//           value: "mb-8",
//         });
//         console.log("hello");
//         console.dir(domNode);
//       }
//     },
//   });
// }
export default function Read() {
	const [post, setPost] = useState({});
	const router = useRouter()

  const { postId } = router.query

	useEffect(() => {
		const inner = async () => {
			if (!window.did) { await authenticate(); }

			const article = await getArticle(postId);
			setPost(article);
			console.log(article);
		}

		inner();
		if (!window.did) { authenticate(); }

	}, []);

  return (
    <>
    <Head>
        <title>Read Post - 3Feed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <NavBar />
    <div className="container mx-auto mt-20 py-24">
      <div className="max-w-[728px] mx-auto">
        <div className="text-4xl font-bold pb-2">{post.title}</div>
        <div className="text-xl text-gray-500 pb-5">{post.subtitle}</div>
        {post.body && parse(post.body)}
      </div>
    </div>
    </>
  );
}
