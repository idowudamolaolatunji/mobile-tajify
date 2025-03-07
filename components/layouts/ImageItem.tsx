import { unknownBookImageUri } from '@/constants/images'
import variables from '@/constants/variables'
import { useDataContext } from '@/context/DataContext'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'


export default function ImageItem() {
    const { imageView } = useDataContext();

    return (
        <View style={[styles.imageItem, imageView == "single" ? { width: "100%", height: 350 } : { width: "48%", height: 225 }]}>
            <Image style={styles.image} source={{ uri: unknownBookImageUri }} />
            <View></View>
        </View>
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
        height: "80%",
        objectFit: "fill",
    },
})