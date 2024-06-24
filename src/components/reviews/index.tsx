import React, { useEffect, useState } from "react";
import Review from "../../components/review";
import { getBinhLuanTheoCongViec, postBinhLuan } from "./../../apis/apiBinhLuan";
import { BinhLuanViewModel } from "../../models/BinhLuanViewModel";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { ThongTinNguoiDung } from "../../models/ThongTinNguoiDung";
import { usedanhSachBLStore } from "../../store/commentStore";
import { useParams } from "react-router-dom";
export default function Reviews() {
  const currentDate = dayjs().format("YYYY-MM-DD");
  const { id } = useParams();
  const { daSachBL, addRanges, add } = usedanhSachBLStore();
  const [currentUser, setUser] = useState<ThongTinNguoiDung>(
    JSON.parse(localStorage.getItem("currentUser") ?? "null")
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BinhLuanViewModel>({
    defaultValues: {
      maCongViec: Number(id),
      saoBinhLuan: 5,
      ngayBinhLuan: currentDate,
      maNguoiBinhLuan: currentUser.id,
    },
  });
  const [count, setCount] = useState<number>(2);

  const handleIncrement = () => {
    setCount(count + 5);
  };

  const onSubmit = async (data: BinhLuanViewModel) => {
    //e.preventDefault();
    try {
      const res = await postBinhLuan(data);
      add(res);
      //setListComments([...listComments, res]);

    } catch (err: any) {}
  };
  useEffect(() => {
    async function fetchComments() {
      const comments = await getBinhLuanTheoCongViec(id);
      addRanges(comments);
    }
    fetchComments();
  }, [addRanges]);

  function loadbinhLuan() {
    //const clone = [...listComments];
    return daSachBL
      .reverse()
      .slice(0, count)
      .map((comment) => {
        return <Review key={comment.id} content={comment} />;
      });
  }
  return (
    <div>
      <div className="mt-5">
        <h2 className="text-xl font-bold">Comments</h2>
        <div>
          <div className="my-8 flex max-w-screen-lg rounded-xl border border-gray-100 p-4 text-left text-gray-600 shadow-lg sm:p-8">
            <img
              className="mr-5 block h-8 w-8 max-w-full text-left align-middle sm:h-16 sm:w-16"
              src="https://tecdn.b-cdn.net/img/new/avatars/5.webp"
              alt="Profile Picture"
            />
            <div className="w-full text-left">
              <div className="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row">
                <h3 className="font-medium">Diana Anderson</h3>
                <time className="text-xs" dateTime="2022-11-13T20:00Z">
                  Jasn 18, 2024 at 10:36 AM
                </time>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit!
              </p>
              <div className="mt-5 flex items-center justify-between text-gray-600">
                <button className="cursor-pointer border py-2 px-8 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-gray-500 rounded-lg">
                  Reply
                </button>
                <a
                  title="Likes"
                  href="#"
                  className="group flex cursor-pointer items-center justify-around"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 rounded-full p-1 group-hover:bg-red-200 group-hover:text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  12
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="load-comment">
          {loadbinhLuan()}

          <button
            type="button"
            className="text-black hover:text-white border border-black hover:bg-blue-700 bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center my-5"
            onClick={handleIncrement}
          >
            Load more
          </button>
        </div>
      </div>
      <div className="mt-5">
        <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              {...register("noiDung", { required: "Comment is required" })}
              rows={6}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
              defaultValue={""}
            />
            {errors.noiDung && (
              <p className="text-danger-700">{errors.noiDung.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center rounded-lg text-white bg-blue-700"
          >
            Post comment
          </button>
        </form>
      </div>
    </div>
  );
}
