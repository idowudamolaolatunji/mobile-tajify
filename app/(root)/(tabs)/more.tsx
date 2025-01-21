import React from "react";
import { ActivityIndicatorBase, Image, Pressable, StyleSheet, Text, View } from "react-native";
import variables from "@/constants/variables";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { typography } from "@/constants/typography";
import { useAuth } from "@/context/AuthContext";

export default function more() {
	const { onLogout, loading } = useAuth();


	return (
		<SafeAreaView style={styles.container}>
			<Text style={[typography.paragraphBg, { marginBottom: 30 }]}>More</Text>

			<Pressable>
				<View style={styles.actionBox}>
					<Image source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} style={styles.profileAvatar} />
					<Text style={styles.actionText}>Profile</Text>
				</View>
			</Pressable>
			<Pressable onPress={onLogout}>
				<View style={styles.actionBox}>
					<MaterialIcons name="logout" color="red" size={28} />
					{loading ? <ActivityIndicatorBase color="#fff" /> : <Text style={styles.actionText}>Logout</Text>}
				</View>
			</Pressable>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: variables.colors.background,
		flex: 1,
		display: "flex",
		padding: 20
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
