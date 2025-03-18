import BlogItem from '@/components/layouts/BlogItem';
import { typography } from '@/constants/typography';
import variables from '@/constants/variables';
import { BlogType } from '@/types/type';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { Pressable, ScrollView, Text, TextInput, View, StyleSheet, RefreshControl, FlatList } from 'react-native';
import { useFetchedContext } from '@/context/FetchedContext';
import NoItem from '@/components/layouts/NoItem';
import Spinner from '@/components/elements/Spinner';


export default function Blog() {
    const { blogs, loader } = useFetchedContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshing, setRefreshing] = useState(false);

	const searchedResult = blogs.filter((item: BlogType | any) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
	const data = searchQuery ? searchedResult : blogs;

    const handleRefreshing = function() {}

    if(loader) return <Spinner />;

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} nestedScrollEnabled={true} refreshControl={
            <RefreshControl onRefresh={handleRefreshing} refreshing={refreshing} />
        }>
            <Text style={[ typography.h4, { color: variables.colors.text, marginTop: 15, marginBottom: 10 } ]}>Blogs and Articles</Text>

            <View style={styles.topBar}>
                <View style={styles.inpupBox}>
                    <Ionicons name="search" size={20} color="#ccc" />
                    <TextInput style={{ color: "#fff", fontSize: 16, fontWeight: "500", width: searchQuery.length > 0 ? "75%" : "100%" }} placeholder="Search For post!" keyboardType="default" value={searchQuery} onChangeText={setSearchQuery} placeholderTextColor={variables.colors.bgLight} />
                </View>

                {searchQuery.length > 0 && (
                    <Pressable onPress={() => setSearchQuery("")}>
                        <Text style={{ fontSize: 18, color: "#b70f0f", fontWeight: 600 }}>Cancel</Text>
                    </Pressable>
                )}
            </View>

            {(data.length > 0) ? (
                data.map((data: BlogType) => (
                    <BlogItem data={data} key={data._id} />
                ))
            ) : (
                <NoItem title={searchQuery ? `blogs for with the title "${searchQuery}" was` : "blogs"} />
            )}
        </ScrollView>
    )
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