import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <Link href="/publish">
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 h-10 rounded-md cursor-pointer transition-colors duration-200 ease-in-out transform">publish</button>
      </Link>
    </main>
  );
}
