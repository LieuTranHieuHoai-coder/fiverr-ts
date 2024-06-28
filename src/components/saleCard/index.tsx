import { CongViecThue, CongViecViewModel } from "../../models/CongViecViewModel";
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";
import { getDanhSachDaThue, postThueCongViec } from "../../apis/apiThueCongViec";
import { ThongTinNguoiDung } from "../../models/ThongTinNguoiDung";
import dayjs from 'dayjs';
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  value?: CongViecViewModel
}
export default function SaleCard(props: Props) {
  const { value } = props;
  const navigate = useNavigate();
  let index = 0;
  const [danhSachThue, setLst] = useState<CongViecThue[]>([]);

  useEffect(() => {
    getDanhSachDaThue().then((res) => {
      setLst(res);
    });
  }, []);

  useEffect(() => {
    getDanhSachDaThue().then((res) => {
      setLst(res);
    });
  }, [()=>handleClick]);
  const [currentUser, setUser] = useState<ThongTinNguoiDung>(JSON.parse(localStorage.getItem("currentUser") ?? "null")); 
  const currentDate = dayjs().format('DD-MM-YYYY'); 
  const handleClick = () => {
    if(localStorage.getItem("currentUser") === "undefined" || localStorage.getItem("currentUser") === "null" || !localStorage.getItem("currentUser")){
      Swal.fire("You need login first!");
      //navigate("/login"); 
    } 
    else{
      Swal.fire({
        title: "Hire Me With " + "$"+value?.giaTien + "?",
        text: value?.tenCongViec,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34D399",
        cancelButtonColor: "#d33",
        confirmButtonText: "Buy it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          
          for (let i = 0; i < danhSachThue.length; i++) {
            if (danhSachThue[i].congViec.id === value?.id) {
              index = i;
              break;
            }
          }
          if (index !== 0) {
            Swal.fire({
              title: "Warning!",
              text: "This job has been hired.",
              icon: "warning",
            });
          }
          else{
            await postThueCongViec({
              maCongViec: value?.id,
              maNguoiThue: currentUser.id,
              ngayThue: currentDate,
              hoanThanh: false
            });
            Swal.fire({
              title: "Successed!",
              text: "You have successfully.",
              icon: "success"
            });
          }
          
        }
      });
    }
    
  };

  return (
    <div>
      <div className="mx-auto my-8 bg-gray-800 p-8 text-white sm:max-w-lg sm:rounded-xl md:py-16 lg:mx-0 lg:max-w-xs">
        <h2 className="mb-6 max-w-lg text-3xl font-bold sm:text-4xl">
          Hire me!
        </h2>
        {
          value?.moTaNgan
        }
        <br />
        <br />
        <button className="focus:outline-4 rounded-xl bg-emerald-400 px-4 py-3 font-medium text-white shadow-md outline-white transition hover:bg-emerald-500" onClick={handleClick}>
          From ${value?.giaTien}
        </button>
      </div>
    </div>
  );
}
