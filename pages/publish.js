import { useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import Switch from "../src/components/Switch";

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
    <div className="container mx-auto py-24">
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
          <div className="flex justify-end w-full">
              <Switch/>
        
  {/* <div><input type="checkbox" class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" />
  <span class="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span></div> */}


            <input
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 h-10 rounded-md cursor-pointer transition-colors duration-200 ease-in-out transform"
              type="submit"
              value="Publish"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
