import ImageItem from '@/components/layouts/ImageItem';
import { unknownBookImageUri } from '@/constants/images';
import { typography } from '@/constants/typography'
import variables from '@/constants/variables';
import { useDataContext } from '@/context/DataContext';
import { Entypo, Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image } from 'react-native';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

export default function ImageAndArts() {
    const { imageView, handleChangeImageView } = useDataContext();

    const [searchQuery, setSearchQuery] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const handleRefreshing = function() {}


    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} nestedScrollEnabled={true} refreshControl={
            <RefreshControl onRefresh={handleRefreshing} refreshing={refreshing} />
        }>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={[ typography.h4, { color: variables.colors.text, marginTop: 15, marginBottom: 10 } ]}>Images</Text>

                <View style={styles.tabContainer}>
                    <Pressable style={[styles.tab, { backgroundColor: imageView == "single" ? variables.colors.primary : variables.colors.bgLight }]} onPress={() => handleChangeImageView("single")}>
                        <Foundation name="list" size={30} color={variables.colors.text} />
                    </Pressable>
                    <Pressable style={[styles.tab, { backgroundColor: imageView == "double" ? variables.colors.primary : variables.colors.bgLight }]} onPress={() => handleChangeImageView("double")}>
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

            <View style={[styles.container, { flexDirection: imageView == "single" ? "column" : "row", }]}>
               <ImageItem />
               <ImageItem />
               <ImageItem />
               <ImageItem />
               <ImageItem />
            </View>

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
    container: {
        marginTop: 10,
        rowGap: 20,
        columnGap: 10,
        flexWrap: "wrap"
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
