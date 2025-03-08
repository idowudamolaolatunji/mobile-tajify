import variables from "@/constants/variables";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, Pressable, FlatList, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "@/constants/typography";
import { podcasts } from "@/utils/data";
import NoItem from "@/components/layouts/NoItem";
import { PodcastType } from "@/types/type";
import PodcastItem from "@/components/layouts/PodcastItem";


export default function Podcast() {
	const [searchQuery, setSearchQuery] = useState("");
	const [podcastData, setPodcastData] = useState<PodcastType[] | any>(podcasts);
    const [refreshing, setRefreshing] = useState(false);

	const searchedResult = podcastData.filter((item: PodcastType) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

	const data = searchQuery ? searchedResult : podcastData;

    const handleRefreshing = function() {}


	return (
		<ScrollView style={{ marginBottom: 80 }} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" nestedScrollEnabled={true} refreshControl={
            <RefreshControl onRefresh={handleRefreshing} refreshing={refreshing} />
        }>
			<Text style={[typography.h4, { color: variables.colors.text, marginBottom: 10 }]}>Podcast</Text>

			<View style={styles.topBar}>
				<View style={styles.inpupBox}>
					<Ionicons name="search" size={20} color="#ccc" />
					<TextInput style={{ color: "#fff", fontSize: 16, fontWeight: "500", width: searchQuery.length > 0 ? "75%" : "100%" }} placeholder="Search for Podcasts!" keyboardType="default" value={searchQuery} onChangeText={setSearchQuery} placeholderTextColor={variables.colors.bgLight} />
				</View>

				{searchQuery.length > 0 && (
					<Pressable onPress={() => setSearchQuery("")}>
						<Text style={{ fontSize: 18, color: "#b70f0f", fontWeight: 600 }}>Cancel</Text>
					</Pressable>
				)}
			</View>

            {(data.length > 0) ? (
                <FlatList 
                    data={podcasts}
                    renderItem={({item: data}) => <PodcastItem data={data} />}
                    contentContainerStyle={{}}
                />
            ) : (
                <NoItem title={`podcast for with the title "${searchQuery}" was`} />
            )}
		</ScrollView>
	);
}


const styles = StyleSheet.create({
    topBar: {
        marginBottom: 15, 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    inpupBox: {
        backgroundColor: "rgba(40, 40, 40, 0.5)",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 6
    },
});
