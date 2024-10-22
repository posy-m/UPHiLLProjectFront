import { userInfo } from "@/app/(jotai)/atom"
import { useAtom } from "jotai"
import customAxios from "./customAxios";

const getUserInfo = async () => {
    try {
        const [user, setUser] = useAtom(userInfo);
        if (user.email !== '') return;
        const response = await customAxios.post("/user/userinfo");
        if (response.status === 201) {
            const { data } = response;
            setUser(data);
        }
    } catch (error) {
        console.error(error);
    }
}

export default getUserInfo