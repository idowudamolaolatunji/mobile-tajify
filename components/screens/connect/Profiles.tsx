import Spinner from '@/components/elements/Spinner';
import FollowCard from '@/components/layouts/FollowCard';
import InfoBox from '@/components/layouts/InfoBox';
import variables from '@/constants/variables';
import { useAuth } from '@/context/AuthContext';
import { useFetchedContext } from '@/context/FetchedContext';
import { CreatorProfileType } from '@/types/type';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'

const API_URL = `https://api-tajify.koyeb.app/api/profiles/creators/profiles`;


export default function Profiles() {
    const { handleFetchCreators, creators, loader } = useFetchedContext()
    // const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    
    const handleRefreshing = function() {
        setRefreshing(true);
        handleFetchCreators(limit, page);
        setRefreshing(false);
    }

    useEffect(function() {
        if(creators.length < 1) {
            handleFetchCreators(limit, page)
        }
    }, [])

	if(loader) {
		return (
			<View style={{ justifyContent: "center", alignItems: "center", flex: 1, marginTop: -50, backgroundColor: variables.colors.background }}>
				<ActivityIndicator size={"large"} color={variables.colors.text} />
			</View>
		)
	}


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl onRefresh={handleRefreshing} refreshing={refreshing} />
    }>
        {creators?.length > 0 ? (
            creators.map((profile: CreatorProfileType) => (
                <FollowCard profile={profile} key={profile?._id} />
            ))            
        ) : (
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1, marginTop: 225 }}>
                <InfoBox text='No more creators to follow!' />
            </View>
        )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
		paddingHorizontal: 16,
		paddingVertical: 20,
        flex: 1,
    }
})
