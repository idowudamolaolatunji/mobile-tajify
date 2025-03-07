import { typography } from '@/constants/typography'
import variables from '@/constants/variables'
import React from 'react'
import { StyleSheet, Text, TextStyle, TouchableOpacity } from 'react-native'

interface Props {
    name?: string;
    customStyle?: TextStyle | any;
}

export default function FollowButton({ name, customStyle } : Props) {
    return (
        <TouchableOpacity style={[styles.followBtn, customStyle]}>
            <Text style={typography.paragraph}>Follow {name ?? ""}</Text>
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