import { typography } from '@/constants/typography'
import variables from '@/constants/variables'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import FollowButton from '../elements/FollowButton'
import { useRouter } from 'expo-router'
import { useDataContext } from '@/context/DataContext'
import { CreatorProfileType } from '@/types/type'

export default function FollowCard({ profile } : { profile: CreatorProfileType }) {
    // console.log(profile)
    const router = useRouter();
    const { setSelectedProfile, setSelectedProfileId } = useDataContext();

    const handlePress = function() {
        setSelectedProfile(profile);
        setSelectedProfileId(null);
        router.navigate("/creatorProfile");
    }

  return (
    <Pressable style={styles.container} onPress={handlePress}>
        <Image source={{ uri: profile?.profileImage?.url ? profile?.profileImage?.url : "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1737549092/pngegg_yirbea.png" }} style={styles.image} />
        <View style={styles.details}>
            <Text style={typography.paragraphBg}>{profile?.profileName} </Text>
            <Text style={[typography.paragraph, { fontSize: 13 }]}>@{profile?.username}</Text>
        </View>
        
        <FollowButton id={profile._id} isFollowingCreator={profile.isFollowingCreator || false} />
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