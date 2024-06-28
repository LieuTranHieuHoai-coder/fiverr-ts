import axios from "axios";
import api from "./apiUtil";
import { BinhLuanViewModel } from "../models/BinhLuanViewModel";

export const getBinhLuan = async () => {
    try {
        const response = await api.get("/binh-luan");
        return response.data.content; // list binhluanviewmodel
    } catch (error: any) {
        throw Error(error);
    }
}
export const postBinhLuan = async (payload: BinhLuanViewModel) => {
    try {
        const response = await api.post("/binh-luan", payload);
        return response.data.content; // binhluanviewmodel
    } catch (error: any) {
        throw Error(error);
    }
}

export const putBinhLuan = async (id: number, payload: BinhLuanViewModel) => {
    try {
        const response = await api.put("/binh-luan/" + id, payload);
        return response.data.content; // binhluanviewmodel
    } catch (error: any) {
        throw Error(error);
    }
}
export const deleteBinhLuan = async (id: number) => {
    try {
        const response = await api.delete("/binh-luan/" + id);
        return response.data.content; // binhluanviewmodel
    } catch (error: any) {
        throw Error(error);
    }
}

export const getBinhLuanTheoCongViec = async (macongviec?:string) => {
    try {
        const response = await api.get("/binh-luan/lay-binh-luan-theo-cong-viec/" + macongviec);
        return response.data.content; // list binhluanviewmodel
    } catch (error: any) {
        throw Error(error);
    }
}