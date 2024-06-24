import { create } from "zustand";
import { ThongTinNguoiDung } from "./../models/ThongTinNguoiDung";
import { SkillModel } from "../models/SkillModel";

type NguoiDungStore = {
    user: ThongTinNguoiDung;
    skills: SkillModel[];
    add: () => void;
    update: () => void;
    remove: () => void;
    addSkills: (lst: SkillModel[]) => void;
}

export const useNguoiDungStore = create<NguoiDungStore>(set => ({
    user: {
        id: ""
    },
    skills:[],
    add: () => set({}),
    update: () => set({}),
    remove: () => set({}),
    addSkills: (lst) => set({
        skills: [...lst]
    }),
}));

