import React, { useState } from "react";
import { ActivityIndicatorBase, Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import variables from "@/constants/variables";
import { MaterialIcons } from "@expo/vector-icons";
import { typography } from "@/constants/typography";
import { useAuth } from "@/context/AuthContext";
import { router, Stack } from "expo-router";
import SubHeader from "@/components/layouts/SubHeader";

export default function more() {
	const { handleAuthChange, authState } = useAuth();
	

	return (
		<>
			<Stack.Screen options={{ header: () => <SubHeader />, headerShown: true  }} />
			
			<SafeAreaView style={styles.container}>
				<Text style={[typography.paragraphBg, { marginBottom: 30 }]}>More</Text>

				<TouchableOpacity onPress={() => router.navigate("/acctProfile")}>
					<View style={styles.actionBox}>
						<Image source={{ uri: authState?.avatar ? authState.avatar : "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1737549092/pngegg_yirbea.png" }} style={styles.profileAvatar} />
						<Text style={styles.actionText}>Profile</Text>
					</View>
				</TouchableOpacity>
				
				{/* <Pressable onPress={() => {}}>
					<View style={styles.actionBox}>
						<MaterialIcons name="settings" color="#fff" size={28} />
						<Text style={styles.actionText}>Settings</Text>
					</View>
				</Pressable> */}
				<Pressable onPress={() => handleAuthChange(null, false)}>
					<View style={styles.actionBox}>
						<MaterialIcons name="logout" color="red" size={28} />
						<Text style={styles.actionText}>Logout</Text>
					</View>
				</Pressable>
			</SafeAreaView>
		</>
	);
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: variables.colors.background,
		flex: 1,
		display: "flex",
		paddingHorizontal: 20
	},
	actionBox: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		marginBottom: 20,
		borderRadius: 4,
		backgroundColor: variables.colors.primaryTint,
		paddingVertical: 10,
		paddingHorizontal: 16
	},
	actionText: {
		color: variables.colors.text,
		fontSize: 18
	},
	profileAvatar: {
		width: 34,
		height: 34,
		borderRadius: 50,
	},
});