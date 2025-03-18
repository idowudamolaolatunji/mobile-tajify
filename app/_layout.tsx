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
							<Stack.Screen name="(auth)" options={{ headerTransparent: true, headerShown: false }} />
							<Stack.Screen name="(tabs)" options={{ headerTransparent: true, headerShown: false }}/>
							<Stack.Screen name="(create)" options={{ headerTransparent: true, headerShown: false }}/>
							
							<Stack.Screen name="videoViewer" options={{
								presentation: 'card',
								gestureDirection: 'vertical',
								headerShown: false,
							}} />

							<Stack.Screen name="podcastEpisodes" options={{
								presentation: 'card',
								gestureDirection: 'vertical',
								headerShown: false,
							}} />
							
							<Stack.Screen name="imageViewer" options={{
								presentation: 'card',
								gestureDirection: 'vertical',
								headerShown: false,
							}} />

							<Stack.Screen name="notification" options={{
								presentation: 'card',
								gestureDirection: 'vertical',
								headerShown: false,
							}} />

							<Stack.Screen name="articleViewer" options={{
								presentation: 'card',
								gestureDirection: 'vertical',
								headerShown: false,
							}} />

							<Stack.Screen name="bookViewer" options={{
								presentation: 'card',
								gestureDirection: 'vertical',
								headerShown: false,
							}} />

							<Stack.Screen name="acctProfile" options={{
								presentation: 'card',
								gestureDirection: 'vertical',
								headerShown: false,
							}} />

							<Stack.Screen name="creatorProfile" options={{
								presentation: 'card',
								gestureDirection: 'vertical',
								headerShown: false,
							}} />

							<Stack.Screen name="imageForm" options={{
								presentation: 'card',
								gestureDirection: 'vertical',
								headerShown: false,
							}} />
							<Stack.Screen name="tubeForm" options={{
								presentation: 'card',
								gestureDirection: 'vertical',
								headerShown: false,
							}} />
							<Stack.Screen name="musicForm" options={{
								presentation: 'card',
								gestureDirection: 'vertical',
								headerShown: false,
							}} />
							<Stack.Screen name="podcastForm" options={{
								presentation: 'card',
								gestureDirection: 'vertical',
								headerShown: false,
							}} />
							<Stack.Screen name="bookForm" options={{
								presentation: 'card',
								gestureDirection: 'vertical',
								headerShown: false,
							}} />
							<Stack.Screen name="blogForm" options={{
								presentation: 'card',
								gestureDirection: 'vertical',
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
