import { create } from "zustand";
import { BinhLuanViewModel } from "../models/BinhLuanViewModel";

type BinhLuanStore = {
  daSachBL: BinhLuanViewModel[];
  addRanges: (lst: BinhLuanViewModel[]) => void;
  update: (item: BinhLuanViewModel) => void;
  remove: (id: number) => void;
  add: (item: BinhLuanViewModel) => void;
};
export const usedanhSachBLStore = create<BinhLuanStore>((set) => ({

  daSachBL: [], // Initialize user as an empty array
  addRanges: (lst) =>
    set((state) => ({
      daSachBL: [...lst],
    })),
  update: (item) => set((state) => ({
    daSachBL: state.daSachBL.map((i) =>
      i.id === item.id ? { ...i, noiDung: item.noiDung } : i
    ),
  })),
  remove: (id) => set((state) => ({
    daSachBL: state.daSachBL.filter((item) => item.id !== id),
  })),
  add: (item) => set((state) => ({
    daSachBL: [...state.daSachBL, item],
  })),
}));
