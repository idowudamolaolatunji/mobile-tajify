import React, { useEffect } from "react";
import { Stack, Navigator, Redirect, Slot, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, useFonts } from '@expo-google-fonts/inter';
import variables from "@/constants/variables";
import { FetchedProvider } from "@/context/FetchedContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import { AudioProvider } from "@/context/AudioContext";

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
				<DataProvider>
					<AudioProvider>
						<Stack screenOptions={{ statusBarBackgroundColor: variables.colors.background }}>
							<Stack.Screen name="(auth)" options={{ headerTransparent: true }} />
							<Stack.Screen name="(tabs)" options={{ headerTransparent: true, headerTitle: "" }}/>
							<Stack.Screen name="(modal)" options={{ headerShown: false, presentation: "modal" }}/>
							
							<Stack.Screen name="videoItem" options={{
								presentation: 'card',
								gestureEnabled: true,
								gestureDirection: 'vertical',
								animationDuration: 400,
								headerShown: false,
							}} />

							<Stack.Screen name="podcastEpisodes" options={{
								presentation: 'card',
								gestureEnabled: true,
								gestureDirection: 'vertical',
								animationDuration: 400,
								headerShown: false,
							}} />

							<Stack.Screen name="profile" options={{
								presentation: 'card',
								gestureEnabled: true,
								gestureDirection: 'vertical',
								animationDuration: 400,
								headerShown: false,
							}} />

						</Stack>
						<StatusBar style="dark" />
					</AudioProvider>
				</DataProvider>
			</FetchedProvider>
        </AuthProvider>
	);
}
