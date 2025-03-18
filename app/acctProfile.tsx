import variables from "@/constants/variables";
import { router, Stack } from "expo-router";
import { View, Text, ScrollView, RefreshControl, StyleSheet, Pressable, TouchableOpacity, Platform, ActivityIndicator, SafeAreaView, Alert } from "react-native";
import NoItem from "@/components/layouts/NoItem";
import SubHeader from "@/components/layouts/SubHeader";
import { typography } from "@/constants/typography";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import BoxSpinner from "@/components/elements/BoxSpinner";
import ProfilePost from "@/components/layouts/ProfilePost";
import BackButton from "@/components/elements/BackButton";
import { useAuth } from "@/context/AuthContext";
import { countNum } from "@/utils/helper";
import { CreatorProfileType } from "@/types/type";
import CreateButton from "@/components/elements/CreateButton";

const API_URL = `https://api-tajify.koyeb.app/api`;

type PostState = Record<string, any[]>;
type PostLoaderState = Record<string, boolean>;

export default function AcctProfile() {
	const { headers } = useAuth();
	const [tab, setTab] = useState("shorts");
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const [profile, setProfile] = useState<CreatorProfileType | unknown | any>();
	const [postLoader, setPostLoader] = useState<PostLoaderState>({
		shorts: true,
		tube_max: true,
		audio: true,
		podcasts: true,
		images: true,
		blogs: true,
		books: true,
	});

	const [posts, setPosts] = useState<PostState>({
		shorts: [],
		tube_max: [],
		audio: [],
		podcasts: [],
		images: [],
		blogs: [],
		books: [],
	});


	const handleRefreshing = function () {
		setLoading(true);
		setRefreshing(true);
		handleFetchProfile()
		setRefreshing(false);
	};


	// fetch the profile
	async function handleFetchProfile() {
		try {
			const res = await fetch(`${API_URL}/profiles/my/profile`, { method: "GET", headers, });
			// if (!res.ok) throw new Error("Cannot request, Server Connection Issues");
			const data = await res.json();
			console.log(res, data)
			if (data?.status !== "success") {
				throw new Error(data.message || data?.error);
			}

			setProfile(data?.data?.profile)
		} catch(err) {
			Alert.alert("Error", (err as any)?.message);
		} finally {
			setLoading(false);
		}
	}

	async function handleFetchPosts() {
		try {
			setPostLoader({ ...postLoader, [tab]: true });

			const route = tab == "shorts" || "tube_max" ? "tubes" : tab == "audio" ? "music" : tab == "images" ? "pics" : tab;

			const res = await fetch(`${API_URL}/channels/${route}/my-${tab == "images" ? tab : route}`, {
				method: "GET",
				headers
			});

			const data = await res.json();
			console.log(data)
			if (data?.status !== 200 || data?.status !== "success") {
				throw new Error(data.message || data?.error);
			}

			// setPosts({ ...posts, [tab]: [] })
		} catch(err) {
			return err;
		} finally {
			setTimeout(() => {
				setPostLoader({ ...postLoader, [tab]: false });
			}, 1000);
		}
	}

	
	useEffect(function() {
		handleFetchProfile()
	}, []);


	useEffect(function() {
		console.log(tab)
		if(profile?._id) {
			handleFetchPosts();
		}
	}, [tab, profile])


	if(loading) {
		return (
			<View style={{ justifyContent: "center", alignItems: "center", flex: 1, marginTop: -50, backgroundColor: variables.colors.background }}>
				<ActivityIndicator size={"large"} color={variables.colors.text} />
			</View>
		)
	}

	return (
		<React.Fragment>
			{/* <Stack.Screen options={{ header: () => <SubHeader />, headerShown: true }} /> */}

			<ScrollView style={styles.container} refreshControl={<RefreshControl onRefresh={handleRefreshing} refreshing={refreshing} />}>
				<View style={styles.profileTop}>
					<Image style={styles.coverImage} source={{ uri: profile?.coverPhoto?.url ? profile?.coverPhoto?.url : "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1738927546/31284806_cs2c23.jpg" }} />
					<LinearGradient colors={["rgba(0,0,0,0.35)", "rgba(0,0,0,0.35)"]} style={styles.linearGradient}>

						<TouchableOpacity style={styles.backBtnContainer}>
							<BackButton showText />
						</TouchableOpacity>

						<View style={styles.profileImage}>
							<Image style={{ width: "100%", height: "100%" }} source={{ uri: profile?.profileImage?.url ? profile?.profileImage?.url : "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1737549092/pngegg_yirbea.png" }} />
						</View>
					</LinearGradient>
				</View>

				<View style={styles.details}>
					<View style={styles.profileNames}>
						<Text style={[typography.h2, { color: variables.colors.text }]}>{profile?.profileName}</Text>
						<Text style={[typography.paragraph, { color: variables.colors.bgLight }]}>@{profile?.username}</Text>
					</View>

					<View style={styles.profileDetails}>
						<View style={styles.detailsSub}>
							<View style={styles.detailsInfo}>
								<Text style={[typography.h4, { color: variables.colors.text }]}>{countNum(profile?.followers?.length || 0)}</Text>
								<Text style={[typography.paragraph, { color: variables.colors.bgLight }]}>Followers</Text>
							</View>
							<View style={styles.detailsInfo}>
								<Text style={[typography.h4, { color: variables.colors.text }]}>{countNum(profile?.following?.length || 0)}</Text>
								<Text style={[typography.paragraphSm, { color: variables.colors.bgLight }]}>Followings</Text>
							</View>
						</View>

						<View style={styles.detailsSub}>
							<Pressable onPress={() => {}}>
								<AntDesign name="edit" color={variables.colors.text} size={24} />
							</Pressable>
						</View>
					</View>
				</View>

				<View style={styles.contentBox}>
					<ScrollView horizontal style={styles.tabs}>
						<Pressable style={styles.tabItem} onPress={() => setTab("shorts")}>
							<Text style={[typography.paragraphBg, tab === "shorts" ? { color: variables.colors.primary } : {}]}>Tube Shorts</Text>
						</Pressable>
						<Pressable style={styles.tabItem} onPress={() => setTab("tube_max")}>
							<Text style={[typography.paragraphBg, tab === "tube_max" ? { color: variables.colors.primary } : {}]}>Tube Max</Text>
						</Pressable>
						<Pressable style={styles.tabItem} onPress={() => setTab("audio")}>
							<Text style={[typography.paragraphBg, tab == "audio" ? { color: variables.colors.primary } : {}]}>Music</Text>
						</Pressable>
						<Pressable style={styles.tabItem} onPress={() => setTab("podcasts")}>
							<Text style={[typography.paragraphBg, tab == "podcasts" ? { color: variables.colors.primary } : {}]}>Podcasts</Text>
						</Pressable>
						<Pressable style={styles.tabItem} onPress={() => setTab("images")}>
							<Text style={[typography.paragraphBg, tab == "images" ? { color: variables.colors.primary } : {}]}>Images</Text>
						</Pressable>
						<Pressable style={styles.tabItem} onPress={() => setTab("blogs")}>
							<Text style={[typography.paragraphBg, tab == "blogs" ? { color: variables.colors.primary } : {}]}>Blogs</Text>
						</Pressable>
						<Pressable style={styles.tabItem} onPress={() => setTab("books")}>
							<Text style={[typography.paragraphBg, tab == "books" ? { color: variables.colors.primary } : {}]}>Books</Text>
						</Pressable>
					</ScrollView>

					<View>
						{/* NO DATA, BUT LOADER */}
						{(postLoader[tab] && posts[tab].length < 1) && <BoxSpinner />}

						{/* NO DATA, AND NO LOADER */}
						{(!postLoader[tab] && posts[tab].length < 1) && <NoItem title={tab} />}

						{/* DATA, BUT NO LOADER */}
						{(!postLoader[tab] && posts[tab].length > 1) && (
							posts[tab].map((post: any) => (
								<ProfilePost post={post} />
							))
						)}
					</View>
				</View>
			</ScrollView>

			<CreateButton tab={tab} />
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		backgroundColor: variables.colors.background,
		flex: 1,
		paddingTop: Platform.OS === "ios" ? 60 : 40,
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
    backBtnContainer: {
		position: "absolute",
        top: 10,
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
		backgroundColor: variables.colors.bgDark,
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
