import Spinner from "@/components/elements/Spinner";
import ShortLayout from "@/components/layouts/ShortLayout";
import { useFetchedContext } from "@/context/FetchedContext";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useAudioContext } from '@/context/AudioContext';

function TubeShorts() {
	const { handleFetchTubes, tubeShorts, loader } = useFetchedContext();
	const [activeId, setActiveId] = useState(tubeShorts?.at(0)?._id);
	const [refreshing, setRefreshing] = useState(false);
	const { isPlaying, handlePlayPause } = useAudioContext();

	const onViewableItemsChanged = function ({ changed, viewableItems }: any) {
		// console.log("changed:", changed, "viewableItems:", viewableItems)
		if (viewableItems.length > 0 && viewableItems[0]?.isViewable) {
			setActiveId(viewableItems[0].item._id);
		}
	};

	const handleRefreshing = function () {
		setRefreshing(true);
		handleFetchTubes("tube-short", 10, 1);
		setRefreshing(false);
	};

	useEffect(function () {
		if(isPlaying) handlePlayPause()

		if(tubeShorts?.length < 1) {
			handleFetchTubes("tube-short", 10, 1);
		}
	}, []);

	if (loader) return <Spinner />;

	return (
		<View>
			<FlatList
				data={tubeShorts}
				renderItem={({ item }) => <ShortLayout short={item} activeId={activeId} key={item._id} />}
				pagingEnabled
				viewabilityConfig={{
					viewAreaCoveragePercentThreshold: 50,
				}}
				onViewableItemsChanged={onViewableItemsChanged}
				refreshing={refreshing}
				onRefresh={handleRefreshing}
			/>
		</View>
	);
}

export default TubeShorts;
