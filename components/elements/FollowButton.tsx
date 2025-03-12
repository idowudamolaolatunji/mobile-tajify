import { typography } from '@/constants/typography'
import variables from '@/constants/variables'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextStyle, TouchableOpacity } from 'react-native'

interface Props {
    name?: string;
    customStyle?: TextStyle | any;
    id: string;
    isFollowingCreator: boolean;
    isFollowedByCreator?: boolean;
}

export default function FollowButton({ name, customStyle, id, isFollowingCreator } : Props) {
    const [hasFollowedCreator, setHasFollowedCreator] = useState(false);
    
    async function handleFollow() {
        console.log(id);
    }

    return (
        <TouchableOpacity>
            {(isFollowingCreator || hasFollowedCreator) ? (
                <Pressable style={[styles.followBtn, { backgroundColor: variables.colors.primaryTint2 }]}>
                    <Text style={[typography.button, { color: variables.colors.text }]}>Followed</Text>
                </Pressable>
            ) : (
                <Pressable style={[styles.followBtn, customStyle]} onPress={handleFollow}>
                    <Text style={typography.paragraph}>Follow {name ?? ""}</Text>
                </Pressable>
            )}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    followBtn: {
        backgroundColor: variables.colors.primary,
        marginLeft: "auto",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 4
    }
})