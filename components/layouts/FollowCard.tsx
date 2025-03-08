import { typography } from '@/constants/typography'
import variables from '@/constants/variables'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import FollowButton from '../elements/FollowButton'
import { useRouter } from 'expo-router'

export default function FollowCard() {
    const router = useRouter();

    const handlePress = function() {
        router.navigate("/profile")
    }

  return (
    <Pressable style={styles.container} onPress={handlePress}>
        <Image source={{ uri: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1737549092/pngegg_yirbea.png" }} style={styles.image} />
        <View style={styles.details}>
            <Text style={typography.paragraphBg}>mojez prime </Text>
            <Text style={[typography.paragraph, { fontSize: 13 }]}>Nigeria</Text>
        </View>
        
        <FollowButton id="r848rh4848rh84r84r84" />
    </Pressable>
  )
}


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
})