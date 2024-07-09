import { create } from "zustand";
import { ChiTietLoaiCongViecViewModel } from "../models/ChiTietLoaiCongViecViewModel";


type ChiTietLoaiCongViecStore = {
    danhSachChiTiet: ChiTietLoaiCongViecViewModel[];
    addRanges: (lst: ChiTietLoaiCongViecViewModel[]) => void;
    update: (item: ChiTietLoaiCongViecViewModel) => void;
    remove: (id: number) => void;
    add: (item: ChiTietLoaiCongViecViewModel) => void;
};

export const usedanhSachChiTietStore = create<ChiTietLoaiCongViecStore>((set) => ({
    danhSachChiTiet: [], // Initialize user as an empty array
    addRanges: (lst) =>
        set((state) => ({
            danhSachChiTiet: [...lst],
        })),
    update: (item) => set((state) => ({
        danhSachChiTiet: state.danhSachChiTiet.map(x => x.id === item.id? item : x)
    })),
    remove: (id) => set((state) => ({
        danhSachChiTiet: state.danhSachChiTiet.filter(x => x.id!== id)
    })),
    add: (item) => set((state) => ({
        danhSachChiTiet: [...state.danhSachChiTiet, item]
    })),
}));