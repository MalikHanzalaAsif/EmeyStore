import { toast } from "react-toastify";
import axios from "axios";
import { formDataInterface } from "../utils/types";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const verifyPayment = async (orderId: any, formData: formDataInterface) => {

    const pendingToastId = toast.loading("Verifying payment...");

    try {
        const response = await axios.post(
            `${serverUrl}/verify-payment`,
            { orderId, formData },
            { withCredentials: true }
        );

        console.log("Payment verification response from backend: ", response.data);

        toast.update(pendingToastId, {
            render: "Payment verified successfully!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            closeButton: true,
            closeOnClick: true,
        });
    } catch (error) {
        console.error("Error verifying payment: ", error);

        toast.update(pendingToastId, {
            render: "Payment verification failed!",
            type: "error",
            isLoading: false,
            autoClose: 3000,
            closeButton: true,
            closeOnClick: true,
        });
    }
};


export const getOrdersApi = async () => {
    try {
        const response = await axios.get(`${serverUrl}/orders`, { withCredentials: true });
        if (!response.data.orders || typeof response.data === "string") {
            return [];
        };
        console.log(response.data)
        return response.data.orders;
    } catch (err) {
        console.error("failed to get orders!", err);
        return [];
    }
}