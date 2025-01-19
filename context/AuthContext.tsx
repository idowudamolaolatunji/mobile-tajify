import { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";

interface Auth {
	token: string | null;
	isAuthenticated: boolean | null;
}

interface AuthContextProps {
	// onRegister?: (formData: any) => Promise<any>;
	onLogout?: () => Promise<any>;
	onLogin?: (identifier: string, password: string) => Promise<any>;
	handleAuthChange?: (token: string | null, isAuthenticated: boolean | null) => void;
}

const TOKEN_KEY = "userToken";
const AUTH_KEY = "authenticated";
const API_URL = `https://api-tajify-production.up.railway.app/api/auth`;

const AuthContext = createContext<AuthContextProps | any>({});
export default AuthContext;

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = function ({ children }: AuthProviderProps | any) {
	const storedToken = SecureStore.getItem(TOKEN_KEY);
	const storedAuthenticated = SecureStore.getItem(AUTH_KEY);

	const [authState, setAuthState] = useState<Auth>({
		token: storedToken ? storedToken : null,
		isAuthenticated: storedAuthenticated ? JSON.parse(storedAuthenticated) : false,
	});
	const [authLoading, setAuthLoading] = useState(false);

	const headers = {
		"Content-Type": "application/json",
		...(authState.token && {
			Authorization: `Bearer ${authState.token}`,
		}),
	};

	const handleAuthChange = function (token: string, isAuthenticated: boolean) {
		setAuthState({
			token,
			isAuthenticated,
		});
	};

	useEffect(function () {
        async function storeAuth() {
            if (authState.token && authState.isAuthenticated) {
                await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(authState?.token));
                await SecureStore.setItemAsync(AUTH_KEY, JSON.stringify(authState?.isAuthenticated));
            }
        }

        storeAuth();
    }, [authState]);

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

			handleAuthChange(data?.token, true);

			return { success: true };
		} catch (err) {
			return { error: true, message: (err as any)?.message };
		} finally {
			setAuthLoading(false);
		}
	}

	async function handleLogout() {
		setAuthLoading(true);
		await fetch(`${API_URL}/logout`, { method: "POST", headers });
		await SecureStore.deleteItemAsync(TOKEN_KEY);
		setAuthState({ token: null, isAuthenticated: false });
		setAuthLoading(false);
	}

	const value = {
		headers,
		authState,
		handleAuthChange,
		onLogin: handleLogin,
		onLogout: handleLogout,
		loading: authLoading,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = function () {
	return useContext(AuthContext);
};
