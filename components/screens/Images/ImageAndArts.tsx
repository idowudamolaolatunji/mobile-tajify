import ImageItem from '@/components/layouts/ImageItem';
import NoItem from '@/components/layouts/NoItem';
import { unknownBookImageUri } from '@/constants/images';
import { typography } from '@/constants/typography'
import variables from '@/constants/variables';
import { useDataContext } from '@/context/DataContext';
import { PicsImageType } from '@/types/type';
import { picsImage } from '@/utils/data';
import { Entypo, Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image } from 'react-native';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { MasonryFlashList } from "@shopify/flash-list";

export default function ImageAndArts() {
    const { imagesView, handleChangeImagesView } = useDataContext();
    const [picsImagesData, setPicsImagesData] = useState<PicsImageType[] | any>(picsImage);
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const searchedResult = picsImagesData.filter((item: PicsImageType) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const data = searchQuery ? searchedResult : picsImagesData;

    const handleRefreshing = function() {}


    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} nestedScrollEnabled={true} refreshControl={
            <RefreshControl onRefresh={handleRefreshing} refreshing={refreshing} />
        }>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={[ typography.h4, { color: variables.colors.text, marginTop: 15, marginBottom: 10 } ]}>Images</Text>

                <View style={styles.tabContainer}>
                    <Pressable style={[styles.tab, { backgroundColor: imagesView == "single" ? variables.colors.primary : variables.colors.bgLight }]} onPress={() => handleChangeImagesView("single")}>
                        <Foundation name="list" size={30} color={variables.colors.text} />
                    </Pressable>
                    <Pressable style={[styles.tab, { backgroundColor: imagesView == "double" ? variables.colors.primary : variables.colors.bgLight }]} onPress={() => handleChangeImagesView("double")}>
                        <Ionicons name="grid" size={24} color={variables.colors.text} />
                    </Pressable>
                </View>

            </View>

            <View style={styles.topBar}>
                <View style={styles.inpupBox}>
                    <Ionicons name="search" size={20} color="#ccc" />
                    <TextInput style={{ color: "#fff", fontSize: 16, fontWeight: "500", width: searchQuery.length > 0 ? "75%" : "100%" }} placeholder="Search For Pics!" keyboardType="default" value={searchQuery} onChangeText={setSearchQuery} placeholderTextColor={variables.colors.bgLight} />
                </View>

                {searchQuery.length > 0 && (
                    <Pressable onPress={() => setSearchQuery("")}>
                    <Text style={{ fontSize: 18, color: "#b70f0f", fontWeight: 600 }}>Cancel</Text>
                </Pressable>
                )}
            </View>


            {data?.length > 0 ? (
                imagesView == "single" ? (
                    <View style={{ marginTop: 10 }}>
                        {data.map((pics: PicsImageType) => (
                            <ImageItem data={pics} key={pics._id} />
                        ))}
                    </View>
                ) : (
                    <MasonryFlashList
                        data={data}
                        numColumns={2}
                        renderItem={({ item }) => <ImageItem data={item} />}
                        estimatedItemSize={500}
                    />
                )
            ) : (
                <NoItem title={`pictures for with the title "${searchQuery}" was`} />
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
    tabContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        backgroundColor: variables.colors.bgLight
    },
    tab: {
        borderRadius: 2,
        width: 40,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        transitionDelay: "0.3s",
        transitionProperty: "backgroundColor"
    },
});
