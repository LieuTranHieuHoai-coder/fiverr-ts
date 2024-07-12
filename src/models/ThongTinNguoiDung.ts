export interface ThongTinNguoiDung {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
  password?: string;
  phone?: string;
  birthday?: string;
  gender?: boolean;
  role?: string;
  skill?: [];
  certification?: [];
  bookingJob?: [];
}

export interface NguoiDung {
  token: string;
  user?: ThongTinNguoiDung;
}
