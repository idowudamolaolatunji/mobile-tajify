import Spinner from '@/components/elements/Spinner';
import FollowCard from '@/components/layouts/FollowCard';
import InfoBox from '@/components/layouts/InfoBox';
import variables from '@/constants/variables';
import { useAuth } from '@/context/AuthContext';
import { CreatorProfileType } from '@/types/type';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, RefreshControl, ScrollView, StyleSheet, View } from 'react-native'

const API_URL = `https://api-tajify.koyeb.app/api/profiles/creators/profiles`;


export default function Profile() {
    const { headers } = useAuth()
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [profiles, setProfiles] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    
    const handleRefreshing = function() {
        setLoading(true)
        setRefreshing(true);
        handleFetchCreators();
        setRefreshing(false);
    }

    async function handleFetchCreators() {
        try {
            const res = await fetch(`${API_URL}?limit=${limit}&page=${page}`, { 
                method: "GET", headers
            });

            const data = await res.json();
            console.log(data.data)
            if (data?.status !== "success") {
                throw new Error(data.message || data?.error);
            }

            setProfiles(data?.data?.creators)
        } catch(err) {
            Alert.alert("Error", (err as any)?.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(function() {
        handleFetchCreators()
    }, []);


	if(loading) {
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
        {profiles?.length > 0 ? (
            profiles.map((profile: CreatorProfileType) => (
                <FollowCard profile={profile} key={profile?._id} />
            ))            
        ) : (
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1, marginTop: 225 }}>
                <InfoBox text='No creators yet!' />
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
