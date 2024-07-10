import { create } from "zustand";
import { LoaiCongViecViewModel } from "../models/LoaiCongViecModel";

type LoaiCongViecStore = {
    danhSachLoaiCongViec: LoaiCongViecViewModel[];
    addRanges: (lst: LoaiCongViecViewModel[]) => void;
    update: (item: LoaiCongViecViewModel) => void;
    remove: (id: number) => void;
    add: (item: LoaiCongViecViewModel) => void;
};

export const useDanhSachLoaiCongViecStore = create<LoaiCongViecStore>((set) => ({
    danhSachLoaiCongViec: [], // Initialize user as an empty array
    addRanges: (lst) =>
        set((state) => ({
            danhSachLoaiCongViec: [...lst],
        })),
    update: (item) => set((state) => ({
        danhSachLoaiCongViec: state.danhSachLoaiCongViec.map(x => x.id === item.id ? item : x)
    })),
    remove: (id) => set((state) => ({
        danhSachLoaiCongViec: state.danhSachLoaiCongViec.filter(x => x.id!== id)
    })),
    add: (item) => set((state) => ({
        danhSachLoaiCongViec: [...state.danhSachLoaiCongViec, item]
    })),
}));