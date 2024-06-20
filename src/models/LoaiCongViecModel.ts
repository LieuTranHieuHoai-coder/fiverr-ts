export interface LoaiCongViecViewModel {
  id?: number;
  tenLoaiCongViec?: string;
}


export interface MenuLoaiCongViec {
  id:                number;
  tenLoaiCongViec:   string;
  dsNhomChiTietLoai: DsNhomChiTietLoai[];
}

export interface DsNhomChiTietLoai {
  id:             number;
  tenNhom:        string;
  hinhAnh:        string;
  maLoaiCongviec: number;
  dsChiTietLoai:  DsChiTietLoai[];
}

export interface DsChiTietLoai {
  id:         number;
  tenChiTiet: string;
}