import api from "./apiUtil";
type LoaiCongViecItem = {
    tenLoaiCongViec?: string;
}
export const getLoaiCogViec = async () =>{
    try {
        const response = await api.get(`/loai-cong-viec`);
        return response.data.content;
    } catch (error:any) {
        throw Error(error);
    }
}

export const postLoaiCongViec = async (item: LoaiCongViecItem) => {
    try {
        const response = await api.post(`/loai-cong-viec`, item);
        return response.data.content;
    } catch (error:any) {
        throw Error(error);
    }
}

export const getLoaiCongViec_PhanTrang = async (pageIndex: number, pageSize: number, keywords: string) => {
    try {
        const response = await api.get(`/loai-cong-viec/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keywords=${keywords}`);
        return response.data.content;
    } catch (error:any) {
        throw Error(error);
    }
}

export const getLoaiCogViecTheoId = async (id?:string) => {
    try {
        const response = await api.get(`/loai-cong-viec/${id}`);
        return response.data.content;
    } catch (error:any) {
        throw Error(error);
    }
}

export const putLoaiCongViec = async (id:number, payload: LoaiCongViecItem) => {
    try {
        const response = await api.put(`/loai-cong-viec/${id}`, payload);
        return response.data.content;
    } catch (error:any) {
        throw Error(error);
    }
}


export const deleteLoaiCongViec = async (id?:number) => {
    try {
        const response = await api.delete(`/loai-cong-viec/${id}`);
        return response.data.content;
    } catch (error:any) {
        throw Error(error);
    }
}