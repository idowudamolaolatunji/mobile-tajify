import Spinner from '@/components/elements/Spinner';
import TubeLayout from '@/components/layouts/TubeLayout'
import { useFetchedContext } from '@/context/FetchedContext';
import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'


function TubeMax() {
    const { tubeMax, handleFetchTubes, loader } = useFetchedContext();
    const [refreshing, setRefreshing] = useState(false);

    
    const handleRefreshing = function() {
        setRefreshing(true);
        handleFetchTubes("tube-max", 10, 1);
        setRefreshing(false);
    }

    useEffect(function() {
        handleFetchTubes("tube-max");
    }, []);

	if(loader) return <Spinner />
    
    return (
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
            <RefreshControl onRefresh={handleRefreshing} refreshing={refreshing} />
        }>
            <View style={{ flex: 1 }}>
                {tubeMax.length > 0 && tubeMax.map((tube: Array<unknown>) => (
                    <TubeLayout tube={tube} />
                ))}
            </View>
        </ScrollView>
    )
}

export default TubeMax
