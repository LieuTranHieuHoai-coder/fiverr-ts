import { create } from "zustand";
import { ThongTinNguoiDung } from "./../models/ThongTinNguoiDung";

type NguoiDungStore = {
    user: ThongTinNguoiDung;
    add: () => void;
    update: () => void;
    remove: () => void;
}

export const useNguoiDungStore = create<NguoiDungStore>(set => ({
    user: {
        id: ""
    },
    add: () => set({}),
    update: () => set({}),
    remove: () => set({}),
}));

