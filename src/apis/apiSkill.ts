import api from "./apiUtil";

export const getSkills = async () => {
    try {
        const response = await api.get("/skill");
        return response.data.content;
    } catch (error: any) {
        throw Error(error);
    }
};