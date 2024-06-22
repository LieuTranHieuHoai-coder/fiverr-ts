import { create } from "zustand";
import { CongViecThue } from "../models/CongViecViewModel";

type CongViecThueStore = {
  danhSachThue: CongViecThue[];
  addRanges: (lst: CongViecThue[]) => void;
  update: () => void;
  remove: (id:number) => void;
  add: (item: CongViecThue) => void;
};
export const useDanhSachThueStore = create<CongViecThueStore>((set) => ({
  danhSachThue: [], // Initialize user as an empty array
  addRanges: (lst) =>
    set((state) => ({
      danhSachThue: [...lst],
    })),
  update: () => set((state) => ({})),
  remove: (id) => set((state) => ({
    danhSachThue: state.danhSachThue.filter((item) => item.id !== id),
  })),
  add: (item) => set((state) => ({
    danhSachThue: [...state.danhSachThue, item],
  })),
}));
