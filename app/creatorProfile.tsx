import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useDataContext } from "@/context/DataContext";
import variables from "@/constants/variables";
import { View, ScrollView, RefreshControl, StyleSheet, Platform, ActivityIndicator, Alert } from "react-native";
import Profile from "@/components/layouts/Profile";
import { useRouter } from "expo-router";
import { CreatorProfileType } from "@/types/type";

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
		audio: false,
		podcasts: false,
		images: false,
		blog: false,
		book: false,
	});

	const [posts, setPosts] = useState<PostState>({
		shorts: [],
		tube_max: [],
		audio: [],
		podcasts: [],
		images: [],
		blog: [],
		book: [],
	});


	useEffect(function() {
		if(selectedProfileId) {
			handleFetchProfile()
		}
	}, [selectedProfileId])

	useEffect(function() {
		if(profile?._id) {
			// handleFetchPosts()
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
			console.log("Creator:", data?.data?.Profile)
			if (data?.status !== "success") {
				throw new Error(data.message || data?.error);
			}

			setProfile(data?.data?.Profile)
		} catch(err) {
			Alert.alert("Error", (err as any)?.message);
		} finally {
			setLoading(false);
		}
	}

	async function handleFetchPosts() {
		try {
			setPostLoader({ ...postLoader, [tab]: true });
			console.log(tab);

			const res = await fetch(`${API_URL}/channels/my-${tab}`, { method: "GET", headers, });
			// if (!res.ok) throw new Error("Cannot request, Server Connection Issues");
			const data = await res.json();
			console.log(res, data)
			if (data?.status !== "success") {
				throw new Error(data.message || data?.error);
			}

			// setPosts({ ...posts, ["my"+tab]: data?.data?. })
		} catch(err) {
			return err;
		} finally {
			setTimeout(() => {
				setPostLoader({ ...postLoader, [tab]: false });
			}, 1000);
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
					profileType="others"
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
