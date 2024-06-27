import { useEffect, useState } from "react";
import { BinhLuanViewModel } from "../../models/BinhLuanViewModel";
import "./review.scss";
import { ThongTinNguoiDung } from "../../models/ThongTinNguoiDung";
import { getUsersById } from "./../../apis/apiNguoiDung"
import { FaStar } from "react-icons/fa6";
import { usedanhSachBLStore } from "../../store/commentStore";
import Swal from 'sweetalert2'
type Props = {
  content: BinhLuanViewModel
}
export default function Review(props: Props) {
  const { content } = props;
  const [inputValue, setInputValue] = useState(content.noiDung)
  const [ttUserId, setTTUserId] = useState<ThongTinNguoiDung>();
  const { remove, update } = usedanhSachBLStore();
  const [currentUser, setUser] = useState<ThongTinNguoiDung>();
  useEffect(() => {
    if(localStorage.getItem("currentUser") !== "undefined"){
      setUser(()=> {
        return JSON.parse(localStorage.getItem("currentUser") ?? "null");
      });
    } 
    //console.log(localStorage.getItem("currentUser"));
  }, []);

  useEffect(() => {
    async function flecthUser() {
      if(localStorage.getItem("currentUser") !== "undefined"){
        const data = await getUsersById(content.maNguoiBinhLuan);
        setTTUserId(data);
      }
      
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

  const updateComment = () => {
    Swal.fire({
      title: "Input something to this comment?",
      input: 'text',
      inputValue,
      preConfirm: () => {
        setInputValue(Swal.getInput()?.value || content.noiDung)
      },
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, modify it",
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire("Updated!", "Your comment has been updated.", "success");
        const edit = {...content};
        edit.noiDung = result.value;
        update(edit);
      }
    });
  }

  const deleteComment = () => {
    Swal.fire({
      title: "Are you sure delete this comment?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        remove(content.id);
        Swal.fire("Deleted!", "Your comment has been deleted.", "success");
      }
    });
  }

  function renderDeleteBtn(){
    if(content.tenNguoiBinhLuan === currentUser?.name && currentUser !== undefined && currentUser){
      return <button className="cursor-pointer border mx-2 py-2 px-8 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-red-500 rounded-lg" onClick={()=>deleteComment()}>Delete</button>
    }
    return <></>;
  }

  function renderUpdateBtn(){
    if(content.tenNguoiBinhLuan === currentUser?.name && currentUser !== undefined && currentUser ){
      return <button className="cursor-pointer border py-2 px-8 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-yellow-500 rounded-lg" onClick={()=>updateComment()}>Modify</button>
    }
    return <></>;
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
            <div className="flex">
              <button className="cursor-pointer border py-2 px-8 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-gray-500 rounded-lg">
                Reply
              </button>
              { renderDeleteBtn() }
              { renderUpdateBtn() }
            </div>

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
