import { ChiTietLoaiCongViecViewModel } from "../../models/ChiTietLoaiCongViecViewModel";
type Props = {
  chiTietLoaiCongViec: ChiTietLoaiCongViecViewModel
}
function CatCard(props: Props) {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg">
      <a href="#">
        <img className="p-8 rounded-t-lg" src={props.chiTietLoaiCongViec.hinhAnh} alt="product image" />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{props.chiTietLoaiCongViec.tenNhom}</h5>
        </a>
      </div>
    </div>
  );
}
export default CatCard;