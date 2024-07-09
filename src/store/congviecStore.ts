import { create } from "zustand";
import { CongViecViewModel } from "../models/CongViecViewModel";


type CongViecStore = {
    danhSachCongViec: CongViecViewModel[];
    addRanges: (lst: CongViecViewModel[]) => void;
    update: (item: CongViecViewModel) => void;
    remove: (id: number) => void;
    add: (item: CongViecViewModel) => void;
};

export const usedanhSachCongViecStore = create<CongViecStore>((set) => ({
    danhSachCongViec: [], // Initialize user as an empty array
    addRanges: (lst) =>
        set((state) => ({
            danhSachCongViec: [...lst],
        })),
    update: (item) => set((state) => ({
        danhSachCongViec: state.danhSachCongViec.map(x => x.id === item.id? item : x)
    })),
    remove: (id) => set((state) => ({
        danhSachCongViec: state.danhSachCongViec.filter(x => x.id!== id)
    })),
    add: (item) => set((state) => ({
        danhSachCongViec: [...state.danhSachCongViec, item]
    })),
}));