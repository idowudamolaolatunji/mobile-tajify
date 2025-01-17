import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform, ScrollView, Pressable} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "@/constants/typography";
import variables from "@/constants/variables";


const Login = () => {
    const router = useRouter();

	return (
		<ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
			<Stack.Screen options={{ headerShown: false }} />

			<View style={styles.textBox}>
				<Text style={styles.title}>Forget Password?</Text>
				<Text style={styles.subtitle}>No worries, we will send you reset instructions</Text>
			</View>

			<View>
				<TouchableOpacity style={[styles.button, styles.btnNormal]} onPress={() => router.push('/signup')}>
					<Ionicons name="phone-portrait-outline" size={22} color="#fff" />
					<Text style={{ color: "#fff", fontSize: 20 }}>Use Phone or Email</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: variables.colors.background,
		flexGrow: 1,
		paddingTop: Platform.OS === "ios" ? 60 : 40,
		padding: 20,
	},

	textBox: {
		marginBottom: 35,
		textAlign: "left",
	},
	title: {
		...typography.h2,
		color: variables.colors.text,
		marginBottom: 5,
	},
	subtitle: {
		color: "#666",
    fontSize: 15
	},
	options: {},
	button: {
		height: 45,
		borderRadius: 5,
		flexDirection: "row",
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 16,
		gap: 10,
	},
	btnNormal: {
		backgroundColor: variables.colors.primary,
	},
	btnGoogle: {
		backgroundColor: variables.colors.white,
	},
});

export default Login;
