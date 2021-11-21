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
							<div className="flex cursor-pointer" onClick={() => {navigator.clipboard.writeText(window.did)}}>
							{`Welcome ${window.did.slice(0, 16)}...`} <svg class="h-4 w-4 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="8" y="8" width="12" height="12" rx="2" />  <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" /></svg>
							</div>
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
