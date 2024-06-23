import { StarFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { CongViecViewModel } from '../../models/CongViecViewModel'
import { postHoanThanhCongViec, deleteThueCongViec } from '../../apis/apiThueCongViec'
import Swal from 'sweetalert2'
import { useDanhSachThueStore } from '../../store/orderStore'

type Props = {
  item: CongViecViewModel,
  hoanThanh?: boolean,
  maThueCongViec?: number
}
export default function JobItem(props: Props) {
  const { item, hoanThanh, maThueCongViec } = props;
  const { remove, update } = useDanhSachThueStore();
  const btnHoanThanh = () => {
    Swal.fire({
      title: "Are you finish this job?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Finished",
    }).then((result) => {
      if (result.isConfirmed) {
        postHoanThanhCongViec(maThueCongViec).then(() => {
          if (maThueCongViec) {
            update(maThueCongViec);
          }

        });
        Swal.fire("Finished!", "Your job has been finished.", "success");
      }
    });

  }
  const btnDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteThueCongViec(maThueCongViec).then(() => {
          if (maThueCongViec) {
            remove(maThueCongViec);
          }
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
  function showBtnHoanThanh() {
    if (hoanThanh === true) {
      return (
        <div>
          <button className="bg-red-500 text-white text-sm font-bold py-2 px-4 mx-2 rounded-full" onClick={() => btnDelete()}>
            Delete
          </button>
          <button className="bg-green-500 text-white text-sm font-bold py-2 px-4 rounded-full">
            Done
          </button>
        </div>

      )

    }
    else {
      if (hoanThanh === false) {
        return (
          <button className="bg-yellow-500 text-black text-sm font-bold py-2 px-4 rounded-full" onClick={() => btnHoanThanh()}>
            On Working
          </button>
        )
      }
      else {
        <></>
      }
    }

  }
  return (
    <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark" key={item.id}>
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        <img className="rounded-t-lg m-auto" src={item.hinhAnh} />
        <Link to={`/gig/${item.id}`}>
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100" />
        </Link>
      </div>
      <div className="p-6 text-surface dark:text-white">
        <h5 className="mb-2 text-lg text-black font-bold leading-tight">
          {item.tenCongViec}
        </h5>
        <p className="mb-4 text-base truncate  text-ellipsis overflow-hidden">
          {item.moTaNgan}
        </p>
        <div className="flex items-center align-baseline justify-between">
          <div>
            <span className="text-black font-bold"> Rate {item.saoCongViec}/5</span>
            <StarFilled className="ml-1 mb-1" />
          </div>
          <div>
            <span className="text-gray-500">
              Vote: {item.danhGia}
            </span>
          </div>
        </div>
        <div className="my-3 flex items-center justify-between">
          <span className="text-black font-bold text-lg">
            From ${item.giaTien}
          </span>
          {showBtnHoanThanh()}
        </div>
      </div>
    </div>
  )
}
