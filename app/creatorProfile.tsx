import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useDataContext } from "@/context/DataContext";
import variables from "@/constants/variables";
import { View, ScrollView, RefreshControl, StyleSheet, Platform, ActivityIndicator, Alert, Pressable } from "react-native";
import Profile from "@/components/layouts/Profile";
import { useRouter } from "expo-router";
import { CreatorProfileType, TubeType } from "@/types/type";

const API_URL = `https://api-tajify.koyeb.app/api`;

type PostState = Record<string, any[]>;
type PostLoaderState = Record<string, boolean>;

export default function CreatorProfile() {
	const router = useRouter()
	const { headers } = useAuth();
	const { selectedProfileId } = useDataContext();
	const [tab, setTab] = useState("shorts");
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const [profile, setProfile] = useState<CreatorProfileType | any | null>(null);
	const [postLoader, setPostLoader] = useState<PostLoaderState>({
		shorts: false,
		tube_max: false,
		music: false,
		podcasts: false,
		images: false,
		blogs: false,
		books: false,
	});

	const [posts, setPosts] = useState<PostState>({
		shorts: [],
		tube_max: [],
		music: [],
		podcasts: [],
		images: [],
		blogs: [],
		books: [],
	});

	useEffect(function() {
		if(selectedProfileId) {
			handleFetchProfile()
		}
	}, [selectedProfileId])

	useEffect(function() {
		const id = profile?._id;
		if(id && posts[tab].length < 1) {
			handleFetchPosts(id)
		}
	}, [tab, profile]);

	const handleRefreshing = function () {
		setRefreshing(true);
		handleFetchProfile()
		setRefreshing(false);
	};

	async function handleFetchProfile() {
		const id = selectedProfileId;
		setLoading(true)
		try {
			const res = await fetch(`${API_URL}/profiles/${id}`, { 
				method: "GET", 
				headers
			});

			const data = await res.json();
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

	async function handleFetchPosts(id?: string) {
		try {
			setPostLoader({ ...postLoader, [tab]: true });
			const route = 
				tab == "shorts" ? "tubes" 
					:
				tab == "tube_max" ? "tubes" 
					: 
				tab == "images" ? "pics" 
					:
				tab
			;
			const res = await fetch(`${API_URL}/channels/${route}/creator/${id}`);
			const data = await res.json();
			setPosts({
				...posts, [tab]: 
				tab == "shorts" ? ((data?.data?.tubes)?.filter((tube: TubeType) => tube.type == "tube-short") || [])
					: 
				tab == "tube_max" ? ((data?.data?.tubes)?.filter((tube: TubeType) => tube.type == "tube-max") || [])
					: 
				tab == "music" ? (data?.data?.musics || [])
					: 
				tab == "podcasts" ? (data?.data?.podcasts || [])
					:
				tab == "images" ? (data?.data?.pics || [])
					:
				tab == "books" ? (data?.data?.books || [])
					:
				tab == "blogs" ? (data?.data?.blogs || [])
					:
				[]
			});
		} catch(err) {
			return err;
		} finally {
			setPostLoader({ ...postLoader, [tab]: false });
		}
	}

	if(loading) {
		return (
			<View style={{ justifyContent: "center", alignItems: "center", flex: 1, marginTop: -50, backgroundColor: variables.colors.background }}>
				<ActivityIndicator size={"large"} color={variables.colors.text} />
			</View>
		)
	}

	return (
		<React.Fragment>
			<ScrollView style={styles.container} refreshControl={<RefreshControl onRefresh={handleRefreshing} refreshing={refreshing} />}>
				<Profile
					tab={tab}
					setTab={setTab}
					profile={profile}
					posts={posts}
					postLoader={postLoader}
				/>
			</ScrollView>
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
});
