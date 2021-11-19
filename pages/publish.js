import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import NavBar from "./../src/layout/Navbar";

const Prose = dynamic(() => import("./../src/components/Prose.tsx"), {
  ssr: false,
});

export default function Publish() {
  const [proseState, setProseState] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <>
      <Head>
        <title>Publish - 3Feed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="container mx-auto mt-20 py-24">
        <div className="max-w-[728px] mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <input
                className="text-4xl font-bold focus:outline-none pb-2"
                type="text"
                id="title"
                placeholder="Enter title..."
                {...register("title", { required: true, maxLength: 80 })}
              />
              <input
                className="text-xl focus:outline-none pb-5"
                type="text"
                id="subtitle"
                placeholder="Enter subtitle..."
                {...register("subtitle", { required: true, maxLength: 360 })}
              />
            </div>

            <Prose />
            <div className="flex justify-between items-center w-full">
              <label className="relative flex justify-between items-center group p-2 text-lg">
                Paid subscribers only?
                <input
                  type="checkbox"
                  className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                />
                <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-indigo-600 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
              </label>

              <input
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 h-10 rounded-md cursor-pointer transition-colors duration-200 ease-in-out transform"
                type="submit"
                value="Publish"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
