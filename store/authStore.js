/* eslint-disable no-undef */
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,

    register: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                header: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
            })

            const data = await response.json();
            if(!response.ok) throw new Error(data.message || "Something went wrong from authStore");

            await AsyncStorage.setItem("User", JSON.stringfy(data.user));
            await AsyncStorage.setItem("token", data.token);
            set({token:data.token, user:data.user, isLoading: false});

            return { success: true };
        } catch (err){
            set({isLoading: false});
            return {success: false, error: err.message};
        }

    }
}));