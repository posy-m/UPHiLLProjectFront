import { userInfo } from "@/app/(jotai)/atom"
import { useAtom } from "jotai"
import customAxios from "./customAxios";

const getUserInfo = async (): Promise<void> => {
    try {
        if (user.email !== '') return;
        const response = await customAxios.post("/user/userinfo");
        if (response.status === 201) {
            const { data } = response;
            return data;
        }
    } catch (error) {
        console.error(error);
    }
}

export default getUserInfo