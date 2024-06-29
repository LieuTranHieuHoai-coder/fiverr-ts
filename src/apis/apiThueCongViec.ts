import { ThueCongViecViewModel } from "../models/ThueCongViecModel";
import api from "./apiUtil";

export const getThueCongViec = async () => {
    try {
        const response = await api.get("/thue-cong-viec");
        return response.data.content;
    } catch (error: any) {
        throw Error(error);
    }
};

export const postThueCongViec = async (payload?: ThueCongViecViewModel) => {
    try {
        const response = await api.post("/thue-cong-viec", payload,);
        return response.data.content;
    } catch (error: any) {
        throw Error(error);
    }
}

export const putThueCongViec = async (id: number, payload: ThueCongViecViewModel) => {
    try {
        const response = await api.put("/thue-cong-viec/" + id, payload);
        return response.data.content;
    } catch (error: any) {
        throw Error(error);
    }
}

export const deleteThueCongViec = async (id?: number) => {
    try {
        const response = await api.delete("/thue-cong-viec/" + id);
        return response.data.content;
    } catch (error: any) {
        throw Error(error);
    }
}

export const getThueCongViecId = async (id: number) => {
    try {
        const response = await api.get("/thue-cong-viec/" + id);
        return response.data.content;
    } catch (error: any) {
        throw Error(error);
    }
}

export const getThueCongViecPhanTrang = async (pageIndex: number, pageSize: number, keyword: string) => {
    try {
        const response = await api.get("/thue-cong-viec/phan-trang-tim-kiem?pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&keyword=" + keyword);
        return response.data.content;
    } catch (error: any) {
        throw Error(error);
    }
}

export const getDanhSachDaThue = async() => {
    try {
        const response = await api.get("/thue-cong-viec/lay-danh-sach-da-thue");
        return response.data.content;
    } catch (error: any) {
        throw Error(error);
    }
}

export const postHoanThanhCongViec = async (MaThuCongViec?: number) => {
    try {
        const response = await api.post("/thue-cong-viec/hoan-thanh-cong-viec/" + MaThuCongViec);
        return response.data.content;
    } catch (error: any) {
        throw Error(error);
    }
};