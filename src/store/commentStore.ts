import { create } from "zustand";
import { BinhLuanViewModel } from "../models/BinhLuanViewModel";

type BinhLuanStore = {
  daSachBL: BinhLuanViewModel[];
  addRanges: (lst: BinhLuanViewModel[]) => void;
  update: (id:number) => void;
  remove: (id:number) => void;
  add: (item: BinhLuanViewModel) => void;
};
export const usedanhSachBLStore = create<BinhLuanStore>((set) => ({

  daSachBL: [], // Initialize user as an empty array
  addRanges: (lst) =>
    set((state) => ({
      daSachBL: [...lst],
    })),
  update: () => set((state) => ({
  })),
  remove: (id) => set((state) => ({
    daSachBL: state.daSachBL.filter((item) => item.id !== id),
  })),
  add: (item) => set((state) => ({
    daSachBL: [...state.daSachBL, item],
  })),
}));
