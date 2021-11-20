import { useState } from "react";
import { useForm } from "react-hook-form";
import { subscribeToDid } from "../../lib/feed";

export default function FollowCard() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    console.log("hello?");

    // TODO: We should validate this
    subscribeToDid(data.id);
    //setLoading(false);
  };
  return (
    <div className="py-24 fixed top-8 right-12">
      <div className="flex border-2 border-indigo-600 bg-white transition-colors duration-200 ease-in-out transform font-semibold rounded-md drop-shadow-lg">
        <div className="p-8">
          <div className="text-2xl text-left mb-6">Follow new creator</div>
          <form
            className="flex flex-col items-start"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="text-xl font-bold focus:outline-none focus:bg-indigo-50 mb-4 rounded-md"
              type="text"
              id="title"
              placeholder="Enter creator id..."
              {...register("id", { maxLength: 80 })}
            />
            <button
              className="bg-indigo-600 hover:bg-indigo-500 text-white w-32 h-10 rounded-md cursor-pointer transition-colors duration-200 ease-in-out transform text-left pl-[40.625px]"
              type="submit"
            >
              {loading ? (
                <>
                  <div className="fixed left-3 top-[9px] w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                  Following
                </>
              ) : (
                "Follow"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
