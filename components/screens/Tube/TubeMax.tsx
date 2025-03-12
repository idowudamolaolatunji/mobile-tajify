import Spinner from '@/components/elements/Spinner';
import TubeLayout from '@/components/layouts/TubeLayout'
import { typography } from '@/constants/typography';
import variables from '@/constants/variables';
import { useFetchedContext } from '@/context/FetchedContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { tubeMax } from '@/utils/data';
import { TubeType } from '@/types/type';
import { useAudioContext } from '@/context/AudioContext';


function TubeMax() {
    const { tubeMax, handleFetchTubes, loader } = useFetchedContext();
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    // const [loader, setLoader] = useState(false);
    // const [tubeMaxData, setTubeMaxData] = useState<TubeType[] | any>(null);
    
    const handleRefreshing = function() {
        setRefreshing(true);
        handleFetchTubes("tube-max", 10, 1);
        setRefreshing(false);
    }

    useEffect(function() {
        if(tubeMax?.length < 1) {
            handleFetchTubes("tube-max");
        }
    }, []);


	if(loader) return <Spinner />
    
    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl onRefresh={handleRefreshing} refreshing={refreshing} />
        }>
            <Text style={[ typography.h4, { color: variables.colors.text, marginBottom: 10 } ]}>Tube Max</Text>

            <View style={styles.topBar}>
                <View style={styles.inpupBox}>
                    <Ionicons name="search" size={20} color="#ccc" />
                    <TextInput style={{ color: "#fff", fontSize: 16, fontWeight: "500", width: searchQuery.length > 0 ? "75%" : "100%" }} placeholder="Search For videos!" keyboardType="default" value={searchQuery} onChangeText={setSearchQuery} placeholderTextColor={variables.colors.bgLight} />
                </View>

                {searchQuery.length > 0 && (
                    <Pressable onPress={() => setSearchQuery("")}>
                        <Text style={{ fontSize: 18, color: "#b70f0f", fontWeight: 600 }}>Cancel</Text>
                    </Pressable>
                )}
            </View>


            {loader ? (
                <Spinner />
            ) : (
                <View style={{ flex: 1 }}>
                    {tubeMax.length > 0 && tubeMax.map((tube: TubeType) => (
                        <TubeLayout tube={tube} />
                    ))}
                </View>
            )}
        </ScrollView>
    )
}

export default TubeMax


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
})
