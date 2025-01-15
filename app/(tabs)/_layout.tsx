import React from "react";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		// <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}>
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen name="index" />
			<Tabs.Screen name="connect" />
			<Tabs.Screen name="contest" />
			<Tabs.Screen name="earning" />
			<Tabs.Screen name="more" />
		</Tabs>
	);
}
