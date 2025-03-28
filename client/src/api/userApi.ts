import axios from "axios";
import toastEmitter from "../components/ui/toast.tsx"
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { userInterface } from "../utils/types.ts";

interface signupData {
    fullName: string;
    email: string;
    password: string;
}

interface loginData {
    email: string;
    password: string;
}

export const signupApi = async (formData: signupData) => {
    try{
        const response = await axios.post(`${serverUrl}/signup`, formData, {
            withCredentials: true,
        });
        toastEmitter({
            title: response.data?.message,
            type: response.data?.type,
        });
        return response.data;
    } catch (error: any) {
        console.log(error)
        toastEmitter({
            title: error?.message,
            type: "error",
        });
    };
};

export const loginApi = async (formData: loginData) => { 
    try{
        const response = await axios.post(`${serverUrl}/login`, formData, {
            withCredentials: true,
        });
        if(response.data.type == "success"){
            toastEmitter({
                title: `Welcome back! ${response.data.user.name}.`,
                type: response.data?.type,
            });
        } else{
            toastEmitter({
                title: response.data.message,
                type: response.data?.type,
            });
        }
        return response.data;
    } catch (error: any) { 
        console.log(error)
        toastEmitter({
            title: error?.message,
            type: "error",
        });
    };
};

export const logoutApi = async () => {
    try{
        const response = await axios.post(`${serverUrl}/logout`, {}, {
            withCredentials: true,
        });
        toastEmitter({
            title: response.data?.message,
            type: response.data?.type,
        }); 
    } catch (err: any) {
        console.log(err)
        if(err){
            toastEmitter({
                title: err?.message,
                type: "error",
            });
        }
    };
};

export const getUserApi = async () => { 
    try { 
        const response = await axios.get(`${serverUrl}/user`, {
            withCredentials: true,
        });
        return response.data;
     } catch (err) {
        return;
     };
};