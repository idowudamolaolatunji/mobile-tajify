import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Dimensions, ScrollView, ActivityIndicator, Alert, Pressable, SafeAreaView } from "react-native";
import { Link, Redirect, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import BackButton from "@/components/elements/BackButton";
import { useAuth } from "@/context/AuthContext";
import * as SecureStore from "expo-secure-store";


const { width } = Dimensions.get("window");
const API_URL = `${process.env.API_BASE_URL}/auth`;


const Login = () => {
	const router = useRouter();
	const { headers, authState, setAuthState } = useAuth();
	const [checked, setChecked] = useState(false);
	const [identifier, setIdentifier] = useState("test@mail.com");
	const [password, setPassword] = useState("test1234");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	async function handleLogin() {
		if(!identifier || !password) return Alert.alert("Error", "Email or phone number and password are required!");

		setLoading(true);

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST', headers,
                body: JSON.stringify({ email: identifier, password }),
            });

            console.log(res);
            if (!res.ok) throw new Error("Cannot Login")
          

            const data = await res.json();
            if (res.status !== 200 || data?.status != "success") {
                throw new Error(data?.message || data?.error);
            }

			Alert.alert("Success", data?.message);
			
            setAuthState({
				user: data?.data?.user,
                token: data?.token,
                isAuthenticated: true
            });
			
            await SecureStore.setItemAsync("userToken", JSON.stringify(data?.data?.user))
            await SecureStore.setItemAsync("userObj", data?.token)
			
        } catch(err) {
			Alert.alert("Error", (err as any).message);
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(function() {
        console.log(authState)
        if(authState.isAuthenticated) {
            router.push("/");
        }
    }, [authState]);


	return (
		<SafeAreaView style={styles.container}>
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
						<Pressable onPress={() => setShowPassword(!showPassword)}>
							<Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={21} color={variables.colors.tintedWhite} />
						</Pressable>
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
						{loading ? (
							<ActivityIndicator color="#fff" size={28} />
						) : (
							<Text style={styles.buttonText}>Login</Text>
						)}
					</TouchableOpacity>

					<View style={styles.footerInfo}>
						<Text style={styles.footerInfoText}>Don't have an account? </Text>
						<TouchableOpacity onPress={() => router.push("/get-started")}>
							<Text style={styles.linkText}>Sign Up</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};


export default Login;


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: variables.colors.background,
		paddingTop: Platform.OS === "ios" ? 60 : 40,
		paddingHorizontal: 20,
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
        marginBottom: 14,
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
	linkText: {
		...typography.button,
		color: variables.colors.primary,
	},
});