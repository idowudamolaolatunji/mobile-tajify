import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import { OtpInput } from "react-native-otp-entry";


const Login = () => {

	return (
		<ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
			<Stack.Screen options={{ headerShown: false }} />

			<View style={styles.textBox}>
				<Text style={styles.title}>OTP verification 📩</Text>
				<Text style={styles.subtitle}>Enter the 6 digit OTP verification code sent to test@gmail.com</Text>
			</View>

      <OtpInput
        numberOfDigits={4}
        onTextChange={(text) => console.log(text)}
        autoFocus
        theme={{
          containerStyle: {
            marginBottom: 28,
          },
          pinCodeContainerStyle: {
            backgroundColor: "#FFFFFF33",
            borderWidth: 1,
            borderColor: "transparent",
            width: 65,
          },
          pinCodeTextStyle: {
            color: variables.colors.text,
            fontSize: 40,
            fontWeight: "600"
          },
          focusedPinCodeContainerStyle: {
            borderColor: "#999"
          }
        }}
      />

      <TouchableOpacity style={[styles.button]} onPress={() => {}}>
        <Text style={{ color: "#fff", fontSize: 20 }}>Verify Email Address</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.checkText}>Didn't recieve code?</Text>

      <TouchableOpacity style={styles.resend}>
        <Text style={styles.resendBtn}>Resend</Text>
        <Text style={styles.resendTime}> in 04:00 min</Text>
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
    gap: 2.6
  },
  resendTime: {
    color: variables.colors.tintedWhite
  },
	resendBtn: {
		...typography.button,
		color: variables.colors.primary,
	},
});

export default Login;
