import { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";


interface AuthContextProps {
    authState?: { user: any | null; token: string | null; authenticated: boolean | null };
    onRegister?: (formData: any) => Promise<any>;
    onLogin?: (identifier: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "userToken";
const USER_OBJ_KEY = "userObk"
export const API_URL = "https://api-tajify-production.up.railway.app";
const headers = {
    "Content-Type": "application/json",
}

const AuthContext = createContext<AuthContextProps | any>({});
export default AuthContext;

export const AuthProvider = function({ children } : any) {
    const [authState, setAuthState] = useState<{
        user: any | null; 
        token: string | null;
        authenticated: boolean | null;
    }>({
        user: null,
        token: null,
        authenticated: null
    });


    useEffect(function() {
        async function loadAuthentication() {
            const user = await SecureStore.getItemAsync(USER_OBJ_KEY);
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if(user && token) {
                console.log("user: ", user, "token: ", token);

                setAuthState({
                    user: JSON.parse(user),
                    token: token,
                    authenticated: true,
                })
            }
        }

        loadAuthentication();
    }, []);


    async function handleRegister(formData: any) {
        try {
            const res = await fetch(`${API_URL}/register`, {
                method: 'POST', headers,
                body: JSON.stringify(formData),
            });
    
            const data = await res.json();
            if (res.status !== 201 || data?.status != "success") {
                throw new Error(data?.message || data?.error);
            }
            return data
        } catch(err) {
            return { error: true, message: (err as any)?.message }
        }
    }


    async function handleLogin(identifier: string, password: string) {
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST', headers,
                body: JSON.stringify({ identifier, password }),
            });
    
            const data = await res.json();
            if (res.status !== 200 || data?.status != "success") {
                throw new Error(data?.message || data?.error);
            }

            setAuthState({
                user: data?.data?.user,
                token: data?.token,
                authenticated: true
            });

            await SecureStore.setItemAsync(USER_OBJ_KEY, JSON.stringify(data?.data?.user))
            await SecureStore.setItemAsync(TOKEN_KEY, data?.token)

            return data;
        } catch(err) {
            return { error: true, message: (err as any)?.message }
        }
    }

    async function handleLogout() {
        await fetch(`${API_URL}/logout`, { method: "POST", headers });
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setAuthState({ user: null, token: null, authenticated: false })
    }

    const value = {
        authState,
        onRegister: handleRegister,
        onLogin: handleLogin,
        onLogout: handleLogout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export const useAuth = function() {
    return useContext(AuthContext)
}