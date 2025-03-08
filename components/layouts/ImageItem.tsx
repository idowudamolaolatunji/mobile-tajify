import { unknownBookImageUri } from '@/constants/images'
import variables from '@/constants/variables'
import { useDataContext } from '@/context/DataContext'
import { router } from 'expo-router'
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'


export default function ImageItem() {
    const { imageView } = useDataContext();

    return (
        <Pressable onPress={() => router.navigate("/imageViewer")} 
            style={[styles.imageItem, imageView == "single" ? { width: "100%", height: 350 } : { width: "48%", height: 225 }]}
        >
            <Image style={styles.image} source={{ uri: unknownBookImageUri }} />
        </Pressable>
    )
}


const styles = StyleSheet.create({
    imageItem: {
        borderRadius: 6,
        overflow: "hidden",
        backgroundColor: variables.colors.card,
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "fill",
    },
})