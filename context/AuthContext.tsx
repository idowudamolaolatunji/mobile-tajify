import { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

interface Auth {
	token: string | null;
	avatar: string | null;
	isAuthenticated: boolean | null;
}

interface AuthContextProps {
	onLogout?: () => Promise<any>;
	onRegister?: (formData: any) => Promise<any>;
	onLogin?: (identifier: string, password: string) => Promise<any>;
	handleAuthChange?: (token: string | null, isAuthenticated: boolean | null) => void;
}

const TOKEN_KEY = "userToken";
const AUTH_KEY = "authenticated";
const AVATAR_KEY = "avatar";
const API_URL = `https://api-tajify.koyeb.app/api/auth`;

const AuthContext = createContext<AuthContextProps | any>({});
export default AuthContext;

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = function ({ children }: AuthProviderProps | any) {
	const storedToken = SecureStore.getItem(TOKEN_KEY);
	const storedAuthenticated = SecureStore.getItem(AUTH_KEY);
	const storedAvatar = SecureStore.getItem(AVATAR_KEY);

	const [authState, setAuthState] = useState<Auth>({
		token: storedToken ? storedToken : null,
		isAuthenticated: storedAuthenticated ? JSON.parse(storedAuthenticated) : false,
		avatar: storedAvatar ? storedAvatar : "",
	});
	const [authLoading, setAuthLoading] = useState(false);

	const headers = {
		"Content-Type": "application/json",
		...(authState.token && {
			Authorization: `Bearer ${authState.token}`,
		}),
	};

    const formdataHeader = {
		'Accept': 'application/json',
		"Content-Type": "multipart/form-data",
		Authorization: `Bearer ${authState.token}`
	}


	const handleAuthChange = function (token: string, isAuthenticated: boolean, avatar: string) {
		setAuthState({ token, isAuthenticated, avatar });
	};

	useEffect(function () {
        async function storeAuth() {
			await SecureStore.setItemAsync(TOKEN_KEY, authState?.token || "");
			await SecureStore.setItemAsync(AVATAR_KEY, authState.avatar || "");
			await SecureStore.setItemAsync(AUTH_KEY, JSON.stringify(authState?.isAuthenticated));
        }

        storeAuth();
    }, [authState]);

	async function handleRegister(formData: any) {
		setAuthLoading(true);

		try {
			const res = await fetch(`${API_URL}/signup`, {
				method: "POST",
				headers,
				body: JSON.stringify(formData),
			});

			if (!res.ok) throw new Error("Cannot Signup, Server Connection Issues");
			const data = await res.json();
			if (res.status !== 201 || data?.status != "success") {
				throw new Error(data?.message || data?.error);
			}

			await SecureStore.setItemAsync("opt_user", JSON.stringify(data?.data?.newUser?.email));
			setTimeout(() => router.push("/(auth)/otp"), 1000);
			return { success: true, message: data?.message };

		} catch (err) {
			return { error: true, message: (err as any)?.message };
		} finally {
			setAuthLoading(false);
		}
	}

	async function handleLogin(identifier: string, password: string) {
		setAuthLoading(true);

		try {
			const res = await fetch(`${API_URL}/login`, {
				method: "POST",
				headers,
				body: JSON.stringify({ identifier, password }),
			});

			if (!res.ok) throw new Error("Cannot Login, Server Connection Issues");
			const data = await res.json();
			if (res.status !== 200 || data?.status != "success") {
				throw new Error(data?.message || data?.error);
			}

			handleAuthChange(data?.token, true, data.data?.avatar);

			return { success: true, message: data?.message };
		} catch (err) {
			return { error: true, message: (err as any)?.message };
		} finally {
			setAuthLoading(false);
		}
	}

	async function handleLogout() {
		setAuthLoading(true);
		await fetch(`${API_URL}/logout`, { method: "POST", headers });
		setAuthState({ token: null, isAuthenticated: false, avatar: null });
		setAuthLoading(false);
	}

	const value = {
		headers,
		formdataHeader,
		authState,
		handleAuthChange,
		loading: authLoading,
		onLogin: handleLogin,
		onLogout: handleLogout,
		onRegister: handleRegister,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = function () {
	return useContext(AuthContext);
};
