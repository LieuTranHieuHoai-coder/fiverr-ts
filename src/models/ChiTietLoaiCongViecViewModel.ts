import { ChiTietLoaiView } from "./ChiTietLoaiView";

export interface ChiTietLoaiCongViecViewModel {
  id?: number;
  tenNhom?: string;
  hinhAnh?: string;
  maLoaiCongViec?: number;
  dsChiTietLoai?: ChiTietLoaiView[];
  maLoaiCongviec?: number;
}

export interface NhomChiTietLoai {
  tenChiTiet?: string;
  maLoaiCongViec?: number;
  danhSachChiTiet?: ChiTietLoaiView[];
}