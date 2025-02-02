import { typography } from '@/constants/typography'
import variables from '@/constants/variables'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function FollowCard() {
  return (
    <View style={styles.container}>
        <Image source={{ uri: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1737549092/pngegg_yirbea.png" }} style={styles.image} />
        <View style={styles.details}>
            <Text style={typography.paragraphBg}>mojez prime </Text>
            <Text style={[typography.paragraph, { fontSize: 13 }]}>Nigeria</Text>
        </View>
        <TouchableOpacity style={styles.followBtn}>
            <Text style={typography.paragraph}>Follow</Text>
        </TouchableOpacity>
    </View>
  )
}

export default FollowCard


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 15,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: variables.colors.bgDark
    },
    details: {
       gap: 4
    },
    followBtn: {
        backgroundColor: variables.colors.primary,
        marginLeft: "auto",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 4
    }
})