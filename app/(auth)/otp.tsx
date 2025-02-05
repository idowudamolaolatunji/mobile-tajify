import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform, ScrollView, Pressable, Alert, ActivityIndicator } from "react-native";
import { router, Stack } from "expo-router";
import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import { OtpInput } from "react-native-otp-entry";
import { countdownTimer } from "@/utils/helper";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "@/context/AuthContext";

const API_URL = `https://api-tajify-production.up.railway.app/api/auth`;

function Otp() {
	const { headers } = useAuth();
	const [timeLeft, setTimeLeft] = useState("00:00");
	const [formData, setFormData] = useState({ email: "", otp: "" });
	const [mainLoader, setMainLoader] = useState(false);
	const [resendLoader, setResendLoader] = useState(false);


	useEffect(function () {
		const countdown = async function () {
			const otpEmail = await SecureStore.getItemAsync("opt_user");
			if (otpEmail) {
				countdownTimer(setTimeLeft);
				setFormData({ ...formData, email: otpEmail?.replaceAll(`"`, "") });
			}
		};

		countdown();
	}, []);

	async function handleSubmit() {
		if(!formData.otp || formData.otp.length < 5) {
			return Alert.alert("Error", "OPT must be exactly 5 digits")
		}
		setMainLoader(true);
		
		try {
			const res = await fetch(`${API_URL}/verify-otp`, {
				method: "PATCH",
				headers,
				body: JSON.stringify({ email: formData.email, otp: Number(formData.otp) }),
			});

			if (!res.ok) throw new Error("Cannot Verify, Server Connection Issues");
			const data = await res.json();
			console.log(data);
			if (data?.status !== 200 || data?.status !== "success") {
				throw new Error(data.message || data?.error);
			}
			Alert.alert("Sucess", data?.message);
			setTimeout(() => router.push("/(root)/(tabs)"), 1000);
		} catch (err) {
			Alert.alert("Error", (err as any)?.message);
		} finally {
			setMainLoader(false);
			setFormData({ ...formData, otp: "" });
		}
	}


	async function handleResend() {
		setResendLoader(true);

		try {
			const res = await fetch(`${API_URL}/request-otp`, {
				method: "PATCH", headers,
				body: JSON.stringify({ email: formData.email }),
			});

			if (!res.ok) throw new Error("Cannot request, Server Connection Issues");
			const data = await res.json();
			if (data?.status !== "success") {
				throw new Error(data.message || data?.error);
			}

			Alert.alert("Sucess", data?.message);
			countdownTimer(setTimeLeft)
		} catch (err) {
			Alert.alert("Error", (err as any)?.message);
		} finally {
			setResendLoader(false)
		}
	}


	return (
		<ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
			<Stack.Screen options={{ headerShown: false }} />

			<View style={styles.textBox}>
				<Text style={styles.title}>OTP verification 📩</Text>
				<Text style={styles.subtitle}>Enter the 5 digit OTP verification code sent to {formData.email}</Text>
			</View>

			<OtpInput
				numberOfDigits={5}
				onTextChange={(code) => setFormData({ ...formData, otp: code })}
				autoFocus
				theme={{
					containerStyle: { marginBottom: 28 },
					pinCodeContainerStyle: {
						backgroundColor: "#FFFFFF33",
						borderWidth: 1,
						borderColor: variables.colors.border,
						width: 58,
					},
					pinCodeTextStyle: {
						color: variables.colors.text,
						fontSize: 40,
						fontWeight: "600",
					},
					focusedPinCodeContainerStyle: { borderColor: "#999" },
				}}
			/>

			<TouchableOpacity style={[styles.button]} onPress={handleSubmit} disabled={mainLoader}>
				{mainLoader ? (
					<ActivityIndicator color="#fff" size={28} />
				) : (
					<Text style={{ color: "#fff", fontSize: 20 }}>Verify Email Address</Text>
				)}
			</TouchableOpacity>

			<View style={styles.infoBox}>
				<Text style={styles.checkText}>Didn't recieve code?</Text>

				<Pressable style={styles.resend} disabled={timeLeft !== "00:00"} onPress={handleResend}>
					{resendLoader ? (
						<ActivityIndicator color="#007AFF" size={20} />
					) : (
						<React.Fragment>
							<Text style={styles.resendBtn}>Resend</Text>
							<Text style={styles.resendTime}> in {timeLeft} min</Text>
						</React.Fragment>
					)}
				</Pressable>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: variables.colors.background,
		flexGrow: 1,
		paddingTop: Platform.OS === "ios" ? 120 : 100,
		padding: 20,
	},
	textBox: {
		marginTop: 5,
		marginBottom: 35,
	},
	title: {
		...typography.h2,
		color: variables.colors.text,
		marginBottom: 5,
		textAlign: "center",
	},
	subtitle: {
		color: "#666",
		fontSize: 15,
		textAlign: "center",
	},
	button: {
		height: 45,
		borderRadius: 5,
		flexDirection: "row",
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 16,
		gap: 10,
		backgroundColor: variables.colors.primary,
	},
	infoBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	checkText: {
		color: variables.colors.textSecondary,
		fontSize: 16,
	},
	resend: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2.6,
	},
	resendTime: {
		color: variables.colors.tintedWhite,
	},
	resendBtn: {
		...typography.button,
		color: variables.colors.primary,
	},
});

export default Otp;
