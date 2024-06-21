import { CongViecViewModel } from "../../models/CongViecViewModel";
import Swal from 'sweetalert2';
import { ThueCongViecViewModel } from "../../models/ThueCongViecModel";
import { useEffect, useState } from "react";
import { postThueCongViec } from "../../apis/apiThueCongViec";
import { ThongTinNguoiDung } from "../../models/ThongTinNguoiDung";
import dayjs from 'dayjs';

type Props = {
  value?: CongViecViewModel
}
export default function SaleCard(props: Props) {
  const { value } = props;
  const [thueCongViec,setThueCongViec] = useState<ThueCongViecViewModel>();
  const [currentUser, setUser] = useState<ThongTinNguoiDung>(JSON.parse(localStorage.getItem("currentUser") ?? "null")); 
  const currentDate = dayjs().format('DD-MM-YYYY');

  const handleClick = () => {
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
        const sendData: ThueCongViecViewModel = {
          maCongViec: value?.id,
          maNguoiThue: currentUser.id,
          ngayThue: currentDate,
          hoanThanh: false
        }
        setThueCongViec(sendData);
        await postThueCongViec(thueCongViec,);
        Swal.fire({
          title: "Successed!",
          text: "You have successfully.",
          icon: "success"
        });
      }
    });
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
