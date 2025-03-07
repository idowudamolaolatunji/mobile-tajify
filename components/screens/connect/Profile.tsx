import Spinner from '@/components/elements/Spinner';
import FollowCard from '@/components/layouts/FollowCard';
import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet } from 'react-native'

function Profile() {
    const [loader, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    
    const handleRefreshing = function() {
        setLoader(true)
        setRefreshing(true);
        // fetch
        setTimeout(() => {
            setRefreshing(false);
        setLoader(false);
        }, 1000);
    }

    useEffect(function() {
        // fetch
    }, []);

	if(loader) return <Spinner />


  return (
    <ScrollView style={styles.container}showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl onRefresh={handleRefreshing} refreshing={refreshing} />
    }>
        <FollowCard />
        <FollowCard />
        <FollowCard />
    </ScrollView>
  )
}

export default Profile;


const styles = StyleSheet.create({
    container: {
		paddingHorizontal: 16,
		paddingVertical: 20,
        flex: 1,
    }
})
