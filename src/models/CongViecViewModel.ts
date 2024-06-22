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

export interface CongViecById {
  id:                 number;
  congViec:           CongViecViewModel;
  tenLoaiCongViec:    string;
  tenNhomChiTietLoai: string;
  tenChiTietLoai:     string;
  tenNguoiTao:        string;
  avatar:             string;
}

export interface CongViecThue {
  id:        number;
  ngayThue:  string;
  hoanThanh: boolean;
  congViec:  CongViecViewModel;
}


