import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function NavBar({ }) {
  const [publish, setPublish] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setPublish(router.pathname.includes("publish"));
  }, []);

  return (
    <div className="fixed top-0 w-full bg-white z-10 shadow-md">
      <div className="container mx-auto max-w-[728px]">
        <div className="flex items-center justify-between w-full h-20">
          <div className="flex items-center justify-between">
            {router.pathname === "/dashboard" ? (
              `Welcome ${window.did?.split(":")[2].slice(0, 9)}`
            ) : (
              <Link href="/dashboard">
                <button className="hover:text-gray-600 transition-colors duration-200 ease-in-out transform">
                  &#8592; Dashboard
                </button>
              </Link>
            )}
          </div>

          <div className="flex">
            <Link href="/dashboard">
              <button
                className={`w-24 h-10 rounded-md transition-colors duration-200 ease-in-out transform mr-2 ${
                  !publish
                    ? "border-2 border-indigo-600 text-indigo-600 font-semibold cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                }`}
                disabled={!publish}
              >
                Read
              </button>
            </Link>
            <Link href="/publish">
              <button
                className={`w-24 h-10 rounded-md transition-colors duration-200 ease-in-out transform ${
                  publish
                    ? "border-2 border-indigo-600 text-indigo-600 font-semibold cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                }`}
                disabled={publish}
              >
                Publish
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
