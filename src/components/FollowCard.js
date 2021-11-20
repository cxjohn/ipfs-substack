import { useForm } from "react-hook-form";

export default function FollowCard({}) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="py-24 fixed top-8 right-12">
      <div className="flex border-2 border-indigo-600 transition-colors duration-200 ease-in-out transform font-semibold rounded-md">
        <div className="p-8">
          <div className="text-2xl text-left mb-6">Follow new creator</div>
          <form className="flex flex-col items-start" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="text-xl font-bold focus:outline-none focus:bg-indigo-50 mb-4 rounded-md"
              type="text"
              id="title"
              placeholder="Enter creator id..."
              {...register("id", { maxLength: 80 })}
            />
            <button
              className="bg-indigo-600 hover:bg-indigo-500 text-white w-32 h-10 rounded-md cursor-pointer transition-colors duration-200 ease-in-out transform"
              type="submit"
            >
              Follow
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
