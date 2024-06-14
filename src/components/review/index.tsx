import { useEffect, useState } from "react";
import { BinhLuanViewModel } from "../../models/BinhLuanViewModel";
import "./review.scss";
import { ThongTinNguoiDung } from "../../models/ThongTinNguoiDung";
import { getUsersById } from "./../../apis/apiNguoiDung"
import { FaStar } from "react-icons/fa6";
type Props = {
  content: BinhLuanViewModel
}
export default function Review(props: Props) {
  const { content } = props;
  const [ttUserId, setTTUserId] = useState<ThongTinNguoiDung>();

  useEffect(() => {
    async function flecthUser() {
      const data = await getUsersById(content.maNguoiBinhLuan);
      setTTUserId(data);
    }
    flecthUser();
  }, [content.maNguoiBinhLuan])
  function loadStar(number: number) {
    const stars = [];
    for (let i = 0; i < number; i++) {
      stars.push(<FaStar key={i} />);
    }
    return stars;
  }
  return (
    <div>
      <div className="flex max-w-screen-lg rounded-xl border border-gray-100 p-4 text-left text-gray-600 shadow-lg sm:p-8">
        <img
          className="mr-5 block h-8 w-8 max-w-full text-left align-middle sm:h-16 sm:w-16"
          src={ttUserId?.avatar || "/img/noavatar.jpg"}
          alt="Profile Picture"
        />
        <div className="w-full text-left">
          <div className="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row">
            <h3 className="font-medium">{ttUserId?.name}</h3>
            <time className="text-xs" dateTime={content.ngayBinhLuan}>
              {content.ngayBinhLuan}
            </time>
          </div>
          <div className="flex items-start mb-2">
            {loadStar(content.saoBinhLuan)}
          </div>

          <p className="text-sm">
            {content.noiDung}
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
  );
}
