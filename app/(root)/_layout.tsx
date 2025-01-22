import Spinner from "@/components/elements/Spinner";
import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function AppLayout() {
	const { authState } = useAuth();

	// handleAuthChange(null, false)

	if (!authState.isAuthenticated) return <Redirect href={"/welcome"} />;

	return (
		<View style={{ position: "relative", flex: 1 }}>
			<Stack.Screen options={{ headerShown: false }} />

			<Slot />
		</View>
	);
}
