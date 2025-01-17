import React from "react";
import { Redirect, Tabs } from "expo-router";
import variables from "@/constants/variables";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { useAuth } from "@/context/AuthContext";


export default function TabLayout() {
	const { authenticated } = useAuth();
	
	// if(!authenticated) return <Redirect href={"/otp"} />

	return (
		<Tabs screenOptions={{
			headerShown: false,
			tabBarActiveTintColor: variables.colors.tabActive,
			tabBarInactiveTintColor: variables.colors.tabInactive,
			tabBarLabelStyle: {
				fontFamily: "Inter-Medium",
				fontSize: 10,
				marginTop: 3
			},
			tabBarStyle: {
				borderTopWidth: 0,
				backgroundColor: variables.colors.background,
				paddingTop: 5,
				height: 55
			}
		}}>
			<Tabs.Screen name="index" options={{ tabBarLabel: "Channels", tabBarIcon: ({ color }) => (
				<MaterialIcons name="live-tv" size={26} color={color} />
			)}} />

			<Tabs.Screen name="connect" options={{ tabBarLabel: "Connect", tabBarIcon: ({ color }) => (
				<MaterialCommunityIcons name="message-text" size={26} color={color} />
			)}} />

			<Tabs.Screen name="contest" options={{ tabBarLabel: "Contest", tabBarIcon: ({ color }) => (
				<Entypo name="price-ribbon" size={26} color={color} />
			) }} />

			<Tabs.Screen name="earning" options={{ tabBarLabel: "Earnings", tabBarIcon: ({ color }) => (
				<MaterialCommunityIcons name="gold" size={26} color={color} />
			) }} />

			<Tabs.Screen name="more" options={{ tabBarLabel: "More", tabBarIcon: ({ color }) => (
				<Ionicons name="bag-handle" size={26} color={color} />
			) }} />
		</Tabs>
	);
}
