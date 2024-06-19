import { CongViecViewModel } from "../models/CongViecViewModel";
import api from "./apiUtil";

export const getCongViec = async () => {
    try {
        const response = await api.get("/cong-viec");
        return response.data.content; // list congviecviewmodel
    } catch (error: any) {
        throw Error(error);
    }
};
 export const postCongViec = async (payload: CongViecViewModel) => {
    try {
        const response = await api.post("/cong-viec", payload);
        return response.data.content; // congviecviewmodel
    } catch (error: any) {
        throw Error(error);
    }
 };

 export const getApiCongViecPhanTrang = async (pageIndex: number, pageSize: number) => {
    try {
        const response = await api.get(`/cong-viec/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`);
        return response.data.content; // list congviecviewmodel
    } catch (error: any) {
        throw Error(error);
    }
 };

 export const getCongViecTheoId = async (id: number) => {
    try {
        const response = await api.get("/cong-viec/" + id);
        return response.data.content; // congviecviewmodel
    } catch (error: any) {
        throw Error(error);
    }
 }

 export const putCongViec = async (id: number, payload: CongViecViewModel) => {
    try {
        const response = await api.put("/cong-viec/" + id, payload);
        return response.data.content; // congviecviewmodel
    } catch (error: any) {
        throw Error(error);
    }
 };

 export const deleteCongViec = async (id: number) => {
    try {
        const response = await api.delete("/cong-viec/" + id);
        return response.data.content; // congviecviewmodel
    } catch (error: any) {
        throw Error(error);
    }
 };

 export const uploadHinhCongViec = async (MaCongViec:any, payload:File) => {
    try {
        const response = await api.post(`cong-viec/upload-hinh-cong-viec/${MaCongViec}`, payload);
        return response.data.content; // congviecviewmodel
    } catch (error:any) {
        throw Error(error);
    }
 }

 export const getMenuLoaiCongViec = async ()=> {
    try {
        const response = await api.get("/cong-viec/lay-menu-loai-cong-viec");
        return response.data.content; // list loaiCongViecModel
    } catch (error:any) {
        throw Error(error);
    }
 }

 export const getChiTietLoaiCongViec = async (maLoaiCongViec:number) => {
    try {
        const response = await api.get("/cong-viec/lay-chi-tiet-loai-cong-viec/" + maLoaiCongViec);
        return response.data.content; // list congviecviewmodel
    } catch (error:any) {
        throw Error(error);
    }
 };

 export const getCongViecTheoChiTietLoai = async (MaChiTietLoai: number) => {
    try {
        const response = await api.get("/cong-viec/lay-cong-viec-theo-chi-tiet-loai/" + MaChiTietLoai);
        return response.data.content; // list congviecviewmodel
    } catch (error:any) {
        throw Error(error);
    }
 }

 export const getCongViecChiTiet = async (MaCongViec:number) => {
    try {
        const response = await api.get("/cong-viec/lay-cong-viec-chi-tiet/" + MaCongViec);
        return response.data.content; // list congviecviewmodel
    } catch (error:any) {
        throw Error(error);
    }
 }

 export const getDanhSachCongViecTheoTen = async (TenCongViec:string) => {
    try {
        const response = await api.get("/cong-viec/lay-danh-sach-cong-viec-theo-ten/" + TenCongViec);
        return response.data.content; // list congviecviewmodel
    } catch (error:any) {
        throw Error(error);
    }
 }