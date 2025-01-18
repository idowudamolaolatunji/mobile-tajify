import variables from "@/constants/variables";
import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot, Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";

export default function AppLayout() {
	const { authState, loading } = useAuth();

	// if (!authState.isAuthenticated) return <Redirect href={"/welcome"} />;

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
