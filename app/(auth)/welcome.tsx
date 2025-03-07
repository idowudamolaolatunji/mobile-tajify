import Slide from "@/components/layouts/Slide";
import variables from "@/constants/variables";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

const slides = [
	{
		id: 1,
		title: "Express yourself",
		description: "Share your creativity through stories, music, photos, and videos",
		image: require("@/assets/images/welcome_slide/slide-1.png"),
	},
	{
		id: 2,
		title: "Connect with people",
		description: "Discover new talent and connections to engage in the chain",
		image: require("@/assets/images/welcome_slide/slide-2.png"),
	},
	{
		id: 3,
		title: "Earn rewards",
		description: "Articipate in challenges, play games, and unluck exciting rewards",
		image: require("@/assets/images/welcome_slide/slide-3.png"),
	},
	{
		id: 4,
		title: "Explore market place",
		description: "Buy, sell, and trade products and services",
		image: require("@/assets/images/welcome_slide/slide-4.png"),
	},
];


export default function Welcome() {
	const router = useRouter();
	const { height } = useWindowDimensions();
	const [currentSlide, setCurrentSlide] = useState(0);


	const onViewableItemsChanged = function({ _, viewableItems } : any) {
		if(viewableItems[0].isViewable) {
			setCurrentSlide(viewableItems[0]?.index);
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen options={{ headerShown: false }} />

			<View style={styles.mainBox}>
				<View style={styles.header}>
					<Image source={require("@/assets/images/pngs/logo.png")} style={styles.headerImage} resizeMode="contain" />
				</View>

				<FlatList 
					data={slides}
					renderItem={({item}) => <Slide slideItem={item} />}
					contentContainerStyle={{ height: height * 0.40 }}
					showsHorizontalScrollIndicator={false}
					onViewableItemsChanged={onViewableItemsChanged}
					horizontal
					pagingEnabled
				/>

				<View style={[styles.footer, { height: height * 0.34 }]}>
					<View style={styles.indicatorContainer}>
						{slides?.map((slide, i) => (
							<View key={slide?.id} style={[styles.indicator, i == currentSlide ? { backgroundColor: variables.colors.white, width: 25 } : {}]} />
						))}
					</View>

					<View style={styles.buttonContainer}>
						<TouchableOpacity style={[styles.button, styles.buttonLeft]} onPress={() => router.push("/login")}>
							<Text style={styles.buttonText}>Login</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.button, styles.buttonRight]} onPress={() => router.push("/get-started")}>
							<Text style={styles.buttonText}>Register</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: variables.colors.background,
		paddingTop: Platform.OS === "ios" ? 60 : 40,
		paddingHorizontal: 20,
		minHeight: "100%",
	},
	mainBox: {},
	header: {
		justifyContent: "center",
		alignItems: "center",
	},
	headerImage: {
		width: 130,
		height: 130,
	},
	footer: {
		justifyContent: "space-between",
		marginHorizontal: 20,
	},
	indicatorContainer: {
		marginVertical: 15,
		flexDirection: "row",
		justifyContent: "center",
		gap: 6,
	},
	indicator: {
		backgroundColor: variables.colors.textSecondary,
		width: 8,
		height: 8,
		paddingHorizontal: 3,
		borderRadius: 20,
	},
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	button: {
		height: 45,
		width: "35%",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonLeft: {
		backgroundColor: variables.colors.primaryTint2,
	},
	buttonRight: {
		backgroundColor: variables.colors.primary,
	},
	buttonText: {
		color: "#fff",
		fontSize: 20,
		fontFamily: "Inter-Bold",
	},
});
