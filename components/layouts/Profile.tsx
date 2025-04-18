import variables from '@/constants/variables'
import React, { useState } from 'react'
import { View, Text, ScrollView, RefreshControl, StyleSheet, Pressable, TouchableOpacity, Platform, ActivityIndicator, SafeAreaView, Alert } from "react-native";
import NoItem from "@/components/layouts/NoItem";
import { typography } from "@/constants/typography";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import BoxSpinner from "@/components/elements/BoxSpinner";
import ProfilePost from "@/components/layouts/ProfilePost";
import BackButton from "@/components/elements/BackButton";
import { countNum, truncateString } from "@/utils/helper";
import { AntDesign } from '@expo/vector-icons';
import { CreatorProfileType } from '@/types/type';
import FollowButton from '../elements/FollowButton';


interface Props {
    profile: CreatorProfileType;
    posts: any;
    postLoader: any;

    tab: string;
    setTab: (tab: string) => void;
}

export default function Profile({ profile, posts, postLoader, tab, setTab } : Props) {
	const [followersLength, setFollowersLength] = useState(profile?.followers?.length || 0);

	const handleSetFollowers = function(action: string) {
		if(action == "follow") {
			setFollowersLength(followersLength + 1)
		} else {
			setFollowersLength(followersLength - 1)
		}
	}

  return (
        <React.Fragment>
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
								<Text style={[typography.h4, { color: variables.colors.text }]}>{countNum(followersLength)}</Text>
								<Text style={[typography.paragraph, { color: variables.colors.bgLight }]}>Followers</Text>
							</View>
							<View style={styles.detailsInfo}>
								<Text style={[typography.h4, { color: variables.colors.text }]}>{countNum(profile?.following?.length || 0)}</Text>
								<Text style={[typography.paragraphSm, { color: variables.colors.bgLight }]}>Followings</Text>
							</View>
						</View>

						<View style={styles.detailsSub}>
                            
							<FollowButton
								id={profile?._id}
								name={truncateString(profile.profileName, 4)}
								isFollowingCreator={profile?.isFollowingCreator || false}
								handleFollowerAmountChange={handleSetFollowers}
							/>
                            
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
						<Pressable style={styles.tabItem} onPress={() => setTab("music")}>
							<Text style={[typography.paragraphBg, tab == "music" ? { color: variables.colors.primary } : {}]}>Music</Text>
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
						{(!postLoader[tab] && posts[tab].length > 0) && (
							<ProfilePost posts={posts[tab]} tab={tab} defaultProfile={false} />
						)}
					</View>
				</View>
        </React.Fragment>
  )
}



const styles = StyleSheet.create({
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
})