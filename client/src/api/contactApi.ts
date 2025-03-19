import axios from "axios";
import toastEmitter from "../components/ui/toast.tsx"

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    message: string;
}

export default async (formData: FormData) => {
    try{
        const response = await axios.post('http://localhost:3000/contact', formData);
        console.log(response.data.message);
        toastEmitter({type: "success", title: response.data.message, navigate: "none"})
    } catch (err) {
        console.log(err);
    }
};