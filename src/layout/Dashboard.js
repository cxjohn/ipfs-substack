import Link from "next/link";
import NavBar from "./Navbar";
import Feed from "./../components/Feed"

export default function DashBoard({currentAccount}) {
  return (
    <>
    <NavBar currentAccount={currentAccount} />
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 pt-20 text-center">
      <Feed />
    </main>
  </>
  );
}
