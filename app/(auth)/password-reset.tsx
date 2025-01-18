import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform, ScrollView, TextInput} from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import BackButton from "@/components/elements/BackButton";


const PasswordReset = () => {
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState({ pass: false, passConfirm: false });


	return (
		<ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
			<Stack.Screen options={{ headerShown: false }} />

			<BackButton />

			<View style={styles.formContainer}>
                <Text style={styles.formTitle}>Reset Password 🔑</Text>
                <Text style={styles.subtitle}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</Text>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword.pass} autoCapitalize="none" placeholderTextColor={variables.colors.tintedWhite} />
                    <TouchableOpacity onPress={() => setShowPassword({ ...showPassword, pass: !showPassword.pass })}>
                        <Ionicons name={showPassword.pass ? "eye-outline" : "eye-off-outline"} size={20} color={variables.colors.tintedWhite} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Password Confirmation" value={passwordConfirm} onChangeText={setPasswordConfirm} secureTextEntry={!showPassword.passConfirm} autoCapitalize="none" placeholderTextColor={variables.colors.tintedWhite} />
                    <TouchableOpacity onPress={() => setShowPassword({ ...showPassword, passConfirm: !showPassword.passConfirm })}>
                        <Ionicons name={showPassword.passConfirm ? "eye-outline" : "eye-off-outline"} size={20} color={variables.colors.tintedWhite} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={[styles.button]} onPress={() => {}}>
                <Text style={{ color: "#fff", fontSize: 20 }}>Reset Password</Text>
            </TouchableOpacity>
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

	formContainer: {
		paddingTop: 20,
        marginBottom: 10
	},
	formTitle: {
		...typography.h1,
		color: variables.colors.text,
		textAlign: "center",
		marginBottom: 5,
	},
	subtitle: {
        fontSize: 15,
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
});

export default PasswordReset;
