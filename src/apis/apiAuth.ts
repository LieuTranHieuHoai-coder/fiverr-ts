import api from "./apiUtil";

export const authSignUp = async (payload: FormData) =>{
    try {
        const response = await api.post("/auth/signup",payload);
        return response.data.content; // thongtinnguoidung.ts + bookingjob
    } catch (error: any) {
        throw Error(error); 
    }
}

export const authSignIn = async (payload: {email:string, password:string}) => {
    try {
        const response = await api.post("/auth/signin",payload);
        return response.data.content; // thongtinnguoidung.ts + bookingjob
    } catch (error: any) {
        throw Error(error); 
    }
}