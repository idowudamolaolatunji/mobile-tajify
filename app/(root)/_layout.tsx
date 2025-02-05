import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function AppLayout() {
	const { authState } = useAuth();
	console.log(authState);

	if (!authState.isAuthenticated) return <Redirect href={"/welcome"} />;

	return (
		<View style={{ position: "relative", flex: 1 }}>
			<Stack.Screen options={{ headerShown: false }} />

			<Slot />
		</View>
	);
}
