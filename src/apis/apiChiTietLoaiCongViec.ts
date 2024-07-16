import { ChiTietLoaiCongViecViewModel, NhomChiTietLoai } from "../models/ChiTietLoaiCongViecViewModel";
import api from "./apiUtil";

export const getChiTietLoaiCongViec = async() => {
    try {
        const response = await api.get("/chi-tiet-loai-cong-viec");
        return response.data.content; // list chiTietLoaiCongViecViewModel
    } catch (error:any) {
        throw Error(error);
    }
}

export const postChiTietLoaiCongViec = async() => {
    try {
        const response = await api.post("/chi-tiet-loai-cong-viec");
        return response.data.content; // chua co code administrator
    } catch (error:any) {
        throw Error(error);
    }
}

export const getChiTietLoaiCongViec_phantrang = async(pageIndex: number, pageSize:number,keyword:string) => {
    try {
        const response = await api.get(`chi-tiet-loai-cong-viec/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`);
        return response.data.content.data; // list chiTietLoaiCongViecViewModel
    } catch (error:any) {
        throw Error(error);
    }
}

export const getChiTietLoaiCongViecId = async(id: string | undefined) => {
    try {
        const response = await api.get("/chi-tiet-loai-cong-viec/" + id);
        return response.data.content; // chiTietLoaiCongViecViewModel
    } catch (error:any) {
        throw Error(error);
    }
}

export const putChiTietLoaiCongViecId = async(id: number, chiTietLoaiCongViecViewModel: any) => {
    try {
        const response = await api.put("/chi-tiet-loai-cong-viec/" + id, chiTietLoaiCongViecViewModel);
        return response.data.content; // chiTietLoaiCongViecViewModel
    } catch (error:any) {
        throw Error(error);
    }
}

export const deleteChiTietLoaiCongViecId = async(id: number) => {
    try {
        const response = await api.delete("/chi-tiet-loai-cong-viec/" + id);
        return response.data.content; // chiTietLoaiCongViecViewModel
    } catch (error:any) {
        throw Error(error);
    }
}

export const addNhomLoaiCongViec = async (payload:any) => {
    try {
        const response = await api.post("/chi-tiet-loai-cong-viec/them-nhom-chi-tiet-loai", payload);
        return response.data.content; // chiTietLoaiCongViecViewModel
    } catch (error:any) {
        throw Error(error);
    }
}

export const uploadHinhNhomLoaiCongViec = async (MaNhomLoaiCongViec: number,payload:any) => {
    try {
        const response = await api.post(`/chi-tiet-loai-cong-viec/upload-hinh-nhom-loai-cong-viec?MaNhomLoaiCongViec=${MaNhomLoaiCongViec }`, payload);
        return response.data.content; // chiTietLoaiCongViecViewModel
    } catch (error:any) {
        throw Error(error);
    }
}

export const putSuaNhomChiTietLoai = async (id?:number, payload?:NhomChiTietLoai) => {
    try {
        const response = await api.put(`/chi-tiet-loai-cong-viec/sua-nhom-chi-tiet-loai/${id}`, payload);
        return response.data.content; // chiTietLoaiCongViecViewModel
    } catch (error:any) {
        throw Error(error);
    }
}