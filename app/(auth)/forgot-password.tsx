import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform, ScrollView, Pressable, TextInput} from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import BackButton from "@/components/elements/BackButton";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");

	return (
		<ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
			<Stack.Screen options={{ headerShown: false }} />

			<BackButton />

			<View style={styles.formContainer}>
                <Text style={styles.formTitle}>Forgot Password 🤔</Text>
                <Text style={styles.subtitle}>No worries, we will send you reset instructions.</Text>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Email address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor={variables.colors.tintedWhite} cursorColor="#fff" />
                    <Ionicons name="mail-outline" size={20} color={variables.colors.tintedWhite} />
                </View>
            </View>

            <TouchableOpacity style={[styles.button]} onPress={() => {}}>
                <Text style={{ color: "#fff", fontSize: 20 }}>Send Email</Text>
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

export default ForgotPassword;
