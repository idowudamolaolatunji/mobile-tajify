import Header from "@/components/layouts/Header";
import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import { Stack } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function earning() {
	

	return (
		<React.Fragment>
			<Stack.Screen options={{ header: () => <Header />, headerShown: true }} />

			<ScrollView style={styles.container}>
				<Text style={[typography.h3, { color: variables.colors.text }]}>Bilal Ikudoro's Earning</Text>

				<View style={styles.walletBox}>
					<Image style={styles.imgElement} source={require("../../../assets/images/pngs/favicon.png")} />

					<View>
						<Text>Naira</Text>
						<Text>0</Text>
					</View>
					<View>
						<Text>Naira</Text>
						<Text>0</Text>
					</View>
					<View>
						<Text>Naira</Text>
						<Text>0</Text>
					</View> 
				</View>


				<View>
					<Text style={[typography.h4, { color: variables.colors.text }]}>Transactions</Text>
				</View>
			</ScrollView>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		backgroundColor: variables.colors.background,
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 20
	},
	walletBox: {
		marginTop: 10,
		height: 180,
		backgroundColor: variables.colors.primary,
		borderRadius: 4
	},
	imgElement: {
		width: 160,
		height: 160,
		position: "absolute",
		bottom: 10,
		right: 10,
		opacity: 0.36
	},
});