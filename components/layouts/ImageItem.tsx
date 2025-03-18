import React from 'react'
import { router } from 'expo-router'
import variables from '@/constants/variables'
import { useDataContext } from '@/context/DataContext'
import { Pressable, StyleSheet } from 'react-native'
import { Image } from 'expo-image';
import { PicsImageType } from '@/types/type'
import { getImageSize } from '@/utils/helper'


export default function ImageItem({ data } : { data: PicsImageType | any }) {
    const { imagesView, setSelectedData } = useDataContext();

    const getHeight = function() {
        let { height, width } = data;
        return {height: getImageSize(height, width)}
    }

    const handlePress = function() {
        setSelectedData(data);
        router.navigate("/imageViewer")
    }

    return (
        <Pressable onPress={handlePress}
            style={[styles.imageItem, imagesView == "single" ? { width: "100%", height: 350, marginRight: 0, marginBottom: 15 } : getHeight()]}
            key={data._id}
        >
            <Image
                style={[styles.image]}
                source={data?.preview?.url}
                placeholder={{ title: data.title }}
                contentFit="cover"
                transition={1000}
            />
        </Pressable>
    )
}


const styles = StyleSheet.create({
    imageItem: {
        borderRadius: 5,
        overflow: "hidden",
        backgroundColor: variables.colors.card,
        marginBottom: 10,
        marginRight: 10
    },
    image: {
        width: "100%",
        height: "100%",
    },
})