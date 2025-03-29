import { AppDispatch } from "@/lib/redux/store";
import { signOutUser } from "@/lib/redux/userSlice";
import { Auth, signOut } from "firebase/auth";

export default async function Logout(auth: Auth, dispatch: AppDispatch) {
    try {
        await signOut(auth)
        
        dispatch(signOutUser())
        
        localStorage.removeItem('userData');
        sessionStorage.clear();

        return { success: true }
    } catch (error) {
        console.error("Logout error: ", error);
        throw error;
    }
}