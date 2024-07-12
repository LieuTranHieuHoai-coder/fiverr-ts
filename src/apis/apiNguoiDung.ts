import { CapNhatNguoiDung } from "../models/CapNhatNguoiDung";
import { ThongTinNguoiDung } from "../models/ThongTinNguoiDung";
import api from "./apiUtil";

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};
export const postUsers = async (payload?: ThongTinNguoiDung) => {
  try {
    const response = await api.post("/users", payload);
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};

export const putUsers = async (id?: number, payload?: ThongTinNguoiDung) => {
  try {
    const response = await api.put("/users/" + id, payload);
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};

export const deleteUsers = async (id: number) => {
  try {
    const response = await api.delete("/users?id=" + id);
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getUsersById = async (id: string) => {
  try {
    if (id) {
      const response = await api.get("/users/" + id);
      return response.data.content;
    }
  } catch (error: any) {
    throw Error(error);
  }
};

export const getUserPhanTrang = async (
  pageIndex: number,
  pageSize: number,
  keyword: string
) => {
  try {
    const response = await api.get(
      "/users/phan-trang-tim-kiem?pageIndex=" +
        pageIndex +
        "&pageSize=" +
        pageSize +
        "&keyword=" +
        keyword
    );
    return response.data.content.data;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getUserSearch = async (TenNguoiDung: string) => {
  try {
    const response = await api.get("/users/search/" + TenNguoiDung);
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};

export const uploadAvatar = async (payload: File) => {
  try {
    const response = await api.post("/users/upload-avatar", payload);
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};
