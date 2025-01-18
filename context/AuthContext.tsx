import { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";


interface Auth {
    user: any | null;
    token: string | null;
    isAuthenticated: boolean | null
}

interface AuthContextProps {
    authState?: Auth | any;
    onRegister?: (formData: any) => Promise<any>;
    onLogin?: (identifier: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "userToken";
const USER_OBJ_KEY = "userObk"
const API_URL = `https://api-quicka.up.railway.app/api/auth`;

const AuthContext = createContext<AuthContextProps | any>({});
export default AuthContext;

export const AuthProvider = function({ children } : any) {
    const [authState, setAuthState] = useState<{
        user: any | null; 
        token: string | null;
        isAuthenticated: boolean | null;
    }>({
        user: null,
        token: null,
        isAuthenticated: false
    });
    const [authLoading, setAuthLoading] = useState(false);

    const headers = {
        "Content-Type": "application/json",
        ...( authState.token && {
                Authorization: `Bearer ${authState.token}`
            }
        )
    }


    useEffect(function() {
        async function loadAuthentication() {
            const user = await SecureStore.getItemAsync(USER_OBJ_KEY);
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if(user && token) {
                console.log("user: ", user, "token: ", token);

                setAuthState({
                    user: JSON.parse(user),
                    token: token,
                    isAuthenticated: true,
                })
            }
        }

        loadAuthentication();
    }, []);



    async function handleRegister(formData: any) {
        setAuthLoading(true)
        try {
            const res = await fetch(`${API_URL}/signup`, {
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
        } finally {
            setAuthLoading(false)
        }
    }


    async function handleLogin(identifier: string, password: string) {
        setAuthLoading(true);

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST', headers,
                body: JSON.stringify({ emai: identifier, password }),
            });

            console.log(res);
            if (!res.ok) throw new Error("Cannot Login")
          

            const data = await res.json();
            if (res.status !== 200 || data?.status != "success") {
                throw new Error(data?.message || data?.error);
            }

            setAuthState({
                user: data?.data?.user,
                token: data?.token,
                isAuthenticated: true
            });

            await SecureStore.setItemAsync(USER_OBJ_KEY, JSON.stringify(data?.data?.user))
            await SecureStore.setItemAsync(TOKEN_KEY, data?.token)

            return data;
        } catch(err) {
            return { error: true, message: (err as any)?.message }
        } finally {
            setAuthLoading(false)
        }
    }

    async function handleLogout() {
        await fetch(`${API_URL}/logout`, { method: "POST", headers });
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setAuthState({ user: null, token: null, isAuthenticated: false })
    }

    const value = {
        headers,
        authState,
        onRegister: handleRegister,
        onLogin: handleLogin,
        onLogout: handleLogout,
        loading: authLoading
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export const useAuth = function() {
    return useContext(AuthContext)
}