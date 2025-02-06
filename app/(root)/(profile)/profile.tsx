import variables from "@/constants/variables";
import { router, Stack } from "expo-router";
import { View, Text, ScrollView, RefreshControl, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import NoItem from "@/components/layouts/NoItem";
import SubHeader from "@/components/layouts/SubHeader";
import { typography } from "@/constants/typography";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Image } from "react-native";
import Header from "@/components/layouts/Header";


function Profile() {
	const [tab, setTab] = useState("shorts");
	const [refreshing, setRefreshing] = useState(false);

	const handleRefreshing = function () {
		setRefreshing(true);
		setRefreshing(false);
	};

	return (
		<React.Fragment>
			<Stack.Screen options={{ header: () => <Header />, headerShown: true }} />

			<ScrollView style={styles.container} refreshControl={<RefreshControl onRefresh={handleRefreshing} refreshing={refreshing} />}>
				<View style={styles.profileTop}>
					<Image style={styles.coverImage} source={{ uri: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1738250329/book-coverimage-1738250325179.jpg" }} />
					<LinearGradient colors={["rgba(0,0,0,0.35)", "rgba(0,0,0,0.35)"]} style={styles.linearGradient}>
						<TouchableOpacity style={styles.backIcon} onPress={() => router.push("/more")}>
							<AntDesign name="arrowleft" size={28} color="#fff" />
						</TouchableOpacity>

						<TouchableOpacity style={styles.menuIcon}>
							<SimpleLineIcons name="menu" size={24} color="#fff" />
						</TouchableOpacity>

						<View style={styles.profileImage}>
							<Image style={{ width: "100%", height: "100%" }} source={{ uri: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1737406822/audio-coverimage-1737406820552.jpg" }} />
						</View>
					</LinearGradient>
				</View>

				<View style={styles.details}>
					<View style={styles.profileNames}>
						<Text style={[typography.h2, { color: variables.colors.text }]}>Super Graphics</Text>
						<Text style={[typography.paragraph, { color: variables.colors.bgLight }]}>@supergraphics_1</Text>
					</View>

					<View style={styles.profileDetails}>
						<View style={styles.detailsSub}>
							<View style={styles.detailsInfo}>
								<Text style={[typography.h4, { color: variables.colors.text }]}>120</Text>
								<Text style={[typography.paragraph, { color: variables.colors.bgLight }]}>Followers</Text>
							</View>
							<View style={styles.detailsInfo}>
								<Text style={[typography.h4, { color: variables.colors.text }]}>150.2k</Text>
								<Text style={[typography.paragraphSm, { color: variables.colors.bgLight }]}>Followings</Text>
							</View>
						</View>

						<View style={styles.detailsSub}>
							<TouchableOpacity style={styles.followBtn}>
								<Text style={[typography.button, { color: variables.colors.text }]}>Follow</Text>
							</TouchableOpacity>

							<Pressable onPress={() => {}}>
								<AntDesign name="edit" color={variables.colors.text} size={24} />
							</Pressable>
						</View>
					</View>
				</View>

				<View style={styles.contentBox}>
					<ScrollView horizontal style={styles.tabs}>
						<Pressable style={styles.tabItem} onPress={() => setTab("shorts")}>
							<Text style={[typography.paragraphBg, tab === "shorts" ? { color: variables.colors.primary } : {}]}>Shorts</Text>
						</Pressable>
						<Pressable style={styles.tabItem} onPress={() => setTab("tube max")}>
							<Text style={[typography.paragraphBg, tab === "tube max" ? { color: variables.colors.primary } : {}]}>Tube Max</Text>
						</Pressable>
						<Pressable style={styles.tabItem} onPress={() => setTab("audio")}>
							<Text style={[typography.paragraphBg, tab == "audio" ? { color: variables.colors.primary } : {}]}>Audio</Text>
						</Pressable>
						<Pressable style={styles.tabItem} onPress={() => setTab("podcasts")}>
							<Text style={[typography.paragraphBg, tab == "podcasts" ? { color: variables.colors.primary } : {}]}>Podcasts</Text>
						</Pressable>
						<Pressable style={styles.tabItem} onPress={() => setTab("images")}>
							<Text style={[typography.paragraphBg, tab == "images" ? { color: variables.colors.primary } : {}]}>Images</Text>
						</Pressable>
						<Pressable style={styles.tabItem} onPress={() => setTab("blog and article")}>
							<Text style={[typography.paragraphBg, tab == "blog and article" ? { color: variables.colors.primary } : {}]}>Blog and Article</Text>
						</Pressable>
						<Pressable style={styles.tabItem} onPress={() => setTab("book")}>
							<Text style={[typography.paragraphBg, tab == "book" ? { color: variables.colors.primary } : {}]}>Book</Text>
						</Pressable>
					</ScrollView>

					<View>
						<NoItem title={tab} />
					</View>
				</View>
			</ScrollView>
		</React.Fragment>
	);
}

export default Profile;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		backgroundColor: variables.colors.background,
		flex: 1,
	},
	profileTop: {
		width: "100%",
		height: 175,
	},
	coverImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	linearGradient: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
	},
    backIcon: {
		position: "absolute",
        // top: 10,
        top: 20,
		left: 20,
    },
	menuIcon: {
		position: "absolute",
		top: 10,
		right: 20,
	},
	profileImage: {
		position: "absolute",
		width: 110,
		height: 110,
		borderRadius: 100,
		borderColor: "#ccc",
		borderWidth: 3,
		overflow: "hidden",
		bottom: -30,
		left: 15,
	},
	details: {
		padding: 20,
		marginTop: 20,
	},
	profileNames: {
		gap: 4,
	},
	profileDetails: {
		marginTop: 25,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	detailsSub: {
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
	},
	detailsInfo: {
		gap: 2.5,
		alignItems: "center",
	},
	followBtn: {
		paddingVertical: 4,
		paddingHorizontal: 8,
		backgroundColor: variables.colors.primary,
		borderRadius: 10,
	},
	contentBox: {
		paddingVertical: 30,
		paddingHorizontal: 20,
	},
	tabs: {
		flexDirection: "row",
		gap: 15,
		borderBottomWidth: 1,
		borderBottomColor: variables.colors.border,
		paddingBottom: 5,
	},
	tabItem: {
		width: 125,
		alignItems: "center",
	},
});
