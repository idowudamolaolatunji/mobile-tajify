import React from "react";
import { Tabs } from "expo-router";
import variables from "@/constants/variables";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';


export default function TabLayout() {
	
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
			)}} />

			<Tabs.Screen name="wallet" options={{ tabBarLabel: "Wallet", tabBarIcon: ({ color }) => (
				<MaterialIcons name="wallet" size={26} color={color} />
			// <MaterialCommunityIcons name="gold" size={26} color={color} />
			)}} />

			<Tabs.Screen name="more" options={{ tabBarLabel: "More", tabBarIcon: ({ color }) => (
				<Ionicons name="bag-handle" size={26} color={color} />
			)}} />
		</Tabs>
	);
}
