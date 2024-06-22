import { create } from "zustand";
import { CongViecThue } from "../models/CongViecViewModel";

type CongViecThueStore = {
  danhSachThue: CongViecThue[];
  addRanges: (lst: CongViecThue[]) => void;
  update: () => void;
  remove: () => void;
  add: () => void;
};
export const useDanhSachThueStore = create<CongViecThueStore>((set) => ({
  danhSachThue: [], // Initialize user as an empty array
  addRanges: (lst) =>
    set((state) => ({
      danhSachThue: [...state.danhSachThue, ...lst],
    })),
  update: () => set((state) => ({})),
  remove: () => set((state) => ({})),
  add: () => set((state) => ({})),
}));
