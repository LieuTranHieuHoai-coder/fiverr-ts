import { create } from "zustand";
import { ThongTinNguoiDung } from "./../models/ThongTinNguoiDung";
import { SkillModel } from "../models/SkillModel";

type NguoiDungStore = {
    lstUsers: ThongTinNguoiDung[]
    user: ThongTinNguoiDung;
    skills: SkillModel[];
    addRanges: (lst: ThongTinNguoiDung[]) => void;
    update: (item: ThongTinNguoiDung) => void;
    remove: (id: number) => void;
    add: (item: ThongTinNguoiDung) => void;
    addSkills: (lst: SkillModel[]) => void;
}

export const useNguoiDungStore = create<NguoiDungStore>(set => ({
    lstUsers: [],
    user: {
        id: ""
    },
    skills:[],
    addRanges: (lst) =>
        set((state) => ({
            lstUsers: [...lst],
        })),
    update: (item) => set((state) => ({
        lstUsers: state.lstUsers.map(x => x.id === item.id? item : x)
    })),
    remove: (id) => set((state) => ({
        lstUsers: state.lstUsers.filter(x => x.id !== id.toString())
    })),
    add: (item) => set((state) => ({
        lstUsers: [...state.lstUsers, item]
    })),
    addSkills: (lst) => set({
        skills: [...lst]
    }),
}));

