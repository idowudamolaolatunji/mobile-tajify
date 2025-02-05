import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, Dimensions, ScrollView, ActivityIndicator, SafeAreaView, Alert, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import BackButton from "@/components/elements/BackButton";
import { useAuth } from "@/context/AuthContext";


const { width } = Dimensions.get("window");

function Signup () {
	const router = useRouter();
	const { loading, onRegister, authState } = useAuth();

	const [checked, setChecked] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("user@example.com");
	const [fullname, setFullname] = useState("Idowu Olatunji");
	const [username, setUsername] = useState("test1111");
	const [phoneNumber, setPhoneNumber] = useState("09057643470");
	const [referralCode, setReferralCode] = useState("");
	const [password, setPassword] = useState("test1234");
	const [passwordConfirm, setPasswordConfirm] = useState("test1234");

console.log(authState)
	const handleRegister = async () => {
		if(!email || !fullname || !username || !phoneNumber || !password || !passwordConfirm) {
			return Alert.alert("Error", "Fill up required fields!");
		}
		if(password !== passwordConfirm) {
			return Alert.alert("Error", "Passwords are not the same!");
		}
		if(!checked) return Alert.alert("Error", "Agree to terms & conditions")

		const result = await onRegister({
			email, password, fullname, username, phoneNumber, passwordConfirm, referralCode
		});

		// if(result.success) {
		// 	// Alert.alert("Success", result.message)
		// 	setTimeout(() => 
		// 		router.push("/otp");
		// 	}, 1000);
		// };

		if(result.error) Alert.alert("Error", result.message);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />

			<BackButton showText />

			<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
				<View style={styles.formContainer}>
					<Text style={styles.formTitle}>Welcome to Tajify 🎉</Text>
					<Text style={styles.subtitle}>If this is your first time here, Register an Account</Text>

					<View style={styles.inputContainer}>
						<TextInput style={styles.input} placeholder="Full Name" value={fullname} onChangeText={setFullname} keyboardType="default" placeholderTextColor={variables.colors.tintedWhite} cursorColor="#fff" />
						<Ionicons name="person-outline" size={20} color={variables.colors.tintedWhite} />
					</View>
					<View style={styles.inputContainer}>
						<TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} keyboardType="default" autoCapitalize="none" placeholderTextColor={variables.colors.tintedWhite} cursorColor="#fff" />
						<Ionicons name="at" size={20} color={variables.colors.tintedWhite} />
					</View>
					<View style={styles.inputContainer}>
						<TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor={variables.colors.tintedWhite} cursorColor="#fff" />
						<Ionicons name="mail-outline" size={20} color={variables.colors.tintedWhite} />
					</View>
					<View style={styles.inputContainer}>
						<TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" autoCapitalize="none" placeholderTextColor={variables.colors.tintedWhite} cursorColor="#fff" />
						<Ionicons name="keypad-outline" size={20} color={variables.colors.tintedWhite} />
					</View>
					<View style={styles.inputContainer}>
						<TextInput style={styles.input} placeholder="Referal Code (optional)" value={referralCode} onChangeText={setReferralCode} keyboardType="default" autoCapitalize="none" placeholderTextColor={variables.colors.tintedWhite} cursorColor="#fff" />
						<Ionicons name="gift-outline" size={20} color={variables.colors.tintedWhite} />
					</View>

					<View style={styles.inputContainer}>
						<TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} autoCapitalize="none" placeholderTextColor={variables.colors.tintedWhite} cursorColor="#fff" />
						<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
							<Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={21} color={variables.colors.tintedWhite} />
						</TouchableOpacity>
					</View>
					<View style={styles.inputContainer}>
						<TextInput style={styles.input} placeholder="Password Confirmation" value={passwordConfirm} onChangeText={setPasswordConfirm} secureTextEntry={!showPassword} autoCapitalize="none" placeholderTextColor={variables.colors.tintedWhite} cursorColor="#fff" />
						<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
							<Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={21} color={variables.colors.tintedWhite} />
						</TouchableOpacity>
					</View>

					<Pressable style={styles.checkContainer} onPress={() => setChecked(!checked)}>
						<View style={[styles.checkBox, checked ? styles.checkBoxActive : ""]}>
							<Ionicons name="checkmark-sharp" color={checked ? "#fff" : "#000"} size={10} />
						</View>
						<Text style={styles.checkBoxText}>By creating an account, you agree to our terms and conditions</Text>
					</Pressable>
				</View>

				<View style={styles.formFooter}>
					<TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
						{loading ? (
							<ActivityIndicator color="#fff" size={28} />
						) : (
							<Text style={styles.buttonText}>Register</Text>
						)}
					</TouchableOpacity>

					<View style={styles.footerInfo}>
						<Text style={styles.footerInfoText}>I'm not new here? </Text>
						<TouchableOpacity onPress={() => router.push("/login")}>
							<Text style={styles.linkText}>Login</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};


export default Signup;


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
		width: 180,
		height: 180,
	},
	formContainer: {
		flex: 1,
		paddingTop: 10,
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
	checkContainer: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "flex-start",
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
        marginTop: -2
	},
	button: {
		backgroundColor: variables.colors.primary,
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