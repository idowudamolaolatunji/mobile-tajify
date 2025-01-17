import React, { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, useFonts } from '@expo-google-fonts/inter';
import variables from "@/constants/variables";
import { FetchedProvider } from "@/context/FetchedContext";
import { AuthProvider } from "@/context/AuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
        'Inter-Regular': Inter_400Regular,
        'Inter-Medium': Inter_500Medium,
        'Inter-SemiBold': Inter_600SemiBold,
        'Inter-Bold': Inter_700Bold,
        'Inter-ExtraBold': Inter_800ExtraBold,
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
        <AuthProvider>
			<FetchedProvider>
				<Stack screenOptions={{ statusBarBackgroundColor: variables.colors.background }}>
					<Stack.Screen name="(auth)" options={{ headerTransparent: true, headerShown: false }}/>
					<Stack.Screen name="(tabs)" options={{ headerTransparent: true, headerTitle: "", }}/>
					<Stack.Screen name="(modal)" options={{ headerShown: false, presentation: "modal" }}/>
				</Stack>
				<StatusBar style="dark" />
			</FetchedProvider>
        </AuthProvider>
	);
}
