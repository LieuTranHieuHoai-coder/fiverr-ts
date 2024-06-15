import { ChiTietLoaiView } from "./ChiTietLoaiView";

export interface ChiTietLoaiCongViecViewModel {
  id?: number;
  tenNhom?: string;
  hinhAnh?: string;
  maLoaiCongViec?: number;
  dsChiTietLoai?: ChiTietLoaiView[];
}
