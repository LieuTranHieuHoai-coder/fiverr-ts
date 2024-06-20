export interface Content {
  pageIndex: number;
  pageSize:  number;
  totalRow:  number;
  keywords:  null;
  data: CongViecViewModel[];
}


export interface CongViecViewModel {
  id?: number;
  tenCongViec?: string;
  danhGia?: number;
  giaTien?: number;
  nguoiTao?: number;
  hinhAnh?: string;
  moTa?: string;
  maChiTietLoaiCongViec?: number;
  moTaNgan?: string;
  saoCongViec?: number;
}

