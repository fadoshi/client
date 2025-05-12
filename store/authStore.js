import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,

    register: async (username, email, password) => {
        set({ isLoading: true });
        try {
            const response = await fetch("https://littlelit.onrender.com/api/auth/register", {
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
            if(!response.ok) throw new Error(data.message || "Something went wrong from authStore-register");

            await AsyncStorage.setItem("User", JSON.stringfy(data.user));
            await AsyncStorage.setItem("token", data.token);
            set({token:data.token, user:data.user, isLoading: false});

            return { success: true };
        } catch (err){
            set({isLoading: false});
            return {success: false, error: err.message};
        }

    },

    login: async (email, password) => {
        set({isLoading: true});
        try {
            const response = await fetch("https://littlelit.onrender.com/api/auth/login", {
                method: "POST",
                header: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await response.json();
            if(!response.ok) throw new Error(data.message || "Something went wrong from authStore-login");

            await AsyncStorage.setItem("User", JSON.stringfy(data.user));
            await AsyncStorage.setItem("token", data.token);

            set({token:data.token, user:data.user, isLoading: false});
            return { success: true };
            
        } catch (err) {
            set({isLoading: false});
            return {success: false, error: err.message};
        }
    },

    checkAuth: async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const userJson = await AsyncStorage.getItem("user");
            const user = userJson ? JSON.parse(userJson) : null;

            set({token, user});

        } catch (err) {
            console.log("Auth check failed", err)
        }
    },

    logout: async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        set({token: null, user: null });
    }
}));