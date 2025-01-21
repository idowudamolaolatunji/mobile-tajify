import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot, Stack } from "expo-router";
import React from "react";

export default function AppLayout() {
	const { authState } = useAuth();

	// handleAuthChange(null, false)

	if (!authState.isAuthenticated) return <Redirect href={"/welcome"} />;

	// if (loading) {
	// 	return (
	// 		<SafeAreaView>
	// 			<ActivityIndicator size="large" />
	// 		</SafeAreaView>
	// 	);
	// }

	return (
		<>
			<Stack.Screen options={{ headerShown: false }} />

			<Slot />
		</>
	);
}
