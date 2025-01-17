import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Dimensions, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "@/constants/typography";
import variables from "@/constants/variables";

{
	/* <ActivityIndicator color="#fff" /> */
}

const { width } = Dimensions.get("window");

const Login = () => {
	const router = useRouter();
	const [checked, setChecked] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = async () => {
		if (!email || !password) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		try {
			setLoading(true);
			console.log("Login..");
		} catch (error) {
			Alert.alert("Error", (error as any).message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />

			<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<Image source={require("@/assets/images/favicon.png")} style={styles.headerImage} resizeMode="contain" />
				</View>

				<View style={styles.formContainer}>
					<Text style={styles.formTitle}>Welcome Back 👋🏿!</Text>
					<Text style={styles.subtitle}>Log into your account to connect, create, share, and monetize!</Text>

					<View style={styles.inputContainer}>
						<TextInput style={styles.input} placeholder="Email or Username" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor={variables.colors.tintedWhite} />
						<Ionicons name="person-add-outline" size={20} color={variables.colors.tintedWhite} style={styles.inputIcon} />
					</View>

					<View style={styles.inputContainer}>
						<TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} autoCapitalize="none" placeholderTextColor={variables.colors.tintedWhite} />
						<TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
							<Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color={variables.colors.tintedWhite} />
						</TouchableOpacity>
					</View>

					<View style={styles.infoBox}>
						<TouchableOpacity style={styles.checkContainer} onPress={() => setChecked(!checked)}>
							<View style={[styles.checkBox, checked ? styles.checkBoxActive : ""]}>
                                <Ionicons name="checkmark-sharp" color={checked ? "#fff" : "#000"} size={10} />
                            </View>
							<Text style={styles.checkBoxText}>Remeber me</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.forgotPassword}>
							<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.formFooter}>
					<TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>

					<View style={styles.footerInfo}>
						<Text style={styles.footerInfoText}>Don't have an account? </Text>
						<TouchableOpacity onPress={() => router.push("/get-started")}>
							<Text style={styles.signupText}>Sign Up</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: variables.colors.background,
	},
	scrollContainer: {
		flexGrow: 1,
		paddingTop: Platform.OS === "ios" ? 60 : 40,
	},
	header: {
		height: width * 0.6,
		justifyContent: "center",
		alignItems: "center",
	},
	headerImage: {
		width: 200,
		height: 200,
	},
	formContainer: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	formTitle: {
		...typography.h1,
		color: variables.colors.text,
		textAlign: "center",
		marginBottom: 5,
	},
	subtitle: {
		color: "#666",
		textAlign: "center",
		marginBottom: 30,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: variables.colors.primaryTint,
		borderRadius: 5,
		marginBottom: 15,
		paddingHorizontal: 20,
		height: 45,
	},
	inputIcon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		color: "#fff",
		fontSize: 16.5,
	},
	eyeIcon: {
		padding: 10,
	},

	infoBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	checkContainer: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	checkBox: {
		width: 14,
		height: 14,
		borderWidth: 1.4,
		borderColor: variables.colors.textSecondary,
		borderRadius: 2,
	},
	checkBoxActive: {
		width: 14,
		height: 14,
		borderWidth: 1.4,
		borderRadius: 2,
		borderColor: variables.colors.textSecondary,
		backgroundColor: variables.colors.primary,
		alignItems: "center",
		justifyContent: "center",
	},
	checkBoxText: {
		color: variables.colors.textSecondary,
		fontSize: 16,
	},

	forgotPassword: {
		alignSelf: "flex-end",
	},
	forgotPasswordText: {
		...typography.button,
		color: variables.colors.primary,
	},
	button: {
		backgroundColor: variables.colors.primary,
		height: 45,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 20,
		fontFamily: "Inter-Bold",
	},

	formFooter: {
		padding: 20,
	},
	footerInfo: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	footerInfoText: {
		color: "#666",
	},
	signupText: {
		...typography.button,
		color: variables.colors.primary,
	},
});

export default Login;
