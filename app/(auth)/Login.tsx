import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Dimensions, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Link, Redirect, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import BackButton from "@/components/elements/BackButton";
import { useAuth } from "@/context/AuthContext";

{
	/* <ActivityIndicator color="#fff" /> */
}

const { width } = Dimensions.get("window");

const Login = () => {
	const router = useRouter();
	const { onLogin, authState, loading } = useAuth();
	const [checked, setChecked] = useState(false);
	const [identifier, setIdentifier] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	async function handleLogin() {
		console.log(identifier, password, "loading...")
		
		if (!identifier || !password) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

        try {

		const result = await onLogin();
		console.log(result, loading)
		if(result.error) {
			Alert.alert("Error", result.message);
			return;
		}
		
		Alert.alert("Success", result.data.message);
		} catch(err) {
			console.log("err")
		}
	};


	useEffect(function() {
		if(authState.isAuthenticated) {
			console.log(authState.isAuthenticated)
			router.push("/")
		}
	}, [authState]);

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />

			<BackButton action={() => router.push("/welcome")} />

			<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<Image source={require("@/assets/images/pngs/favicon.png")} style={styles.headerImage} resizeMode="contain" />
				</View>

				<View style={styles.formContainer}>
					<Text style={styles.formTitle}>Welcome Back 👋🏿!</Text>
					<Text style={styles.subtitle}>Log into your account to connect, create, share, and monetize!</Text>

					<View style={styles.inputContainer}>
						<TextInput style={styles.input} placeholder="Email or phone" value={identifier} onChangeText={setIdentifier} keyboardType="email-address" autoCapitalize="none" placeholderTextColor={variables.colors.tintedWhite} />
						<Ionicons name="person-add-outline" size={20} color={variables.colors.tintedWhite} />
					</View>

					<View style={styles.inputContainer}>
						<TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} autoCapitalize="none" placeholderTextColor={variables.colors.tintedWhite} />
						<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
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

						<Link href="/forgot-password" style={styles.forgotPassword}>
							<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
						</Link>
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
		paddingTop: Platform.OS === "ios" ? 60 : 40,
		paddingHorizontal: 20,
		minHeight: "100%"
	},
	scrollContainer: {
		flexGrow: 1,
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
		paddingHorizontal: 16,
		height: 48,
		borderColor: variables.colors.border,
		borderWidth: 1
	},
	input: {
		flex: 1,
		color: "#fff",
		fontSize: 18,
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
		width: "100%",
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
		paddingVertical: 20,
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
