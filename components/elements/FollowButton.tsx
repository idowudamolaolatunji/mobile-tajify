import { typography } from '@/constants/typography'
import variables from '@/constants/variables'
import { useAuth } from '@/context/AuthContext';
import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity } from 'react-native'

interface Props {
    name?: string;
    customStyle?: TextStyle | any;
    id: string;
    isFollowingCreator: boolean;
    isFollowedByCreator?: boolean;

    handleFollowerAmountChange?: (action: string) => void;
}

const API_URL = `https://api-tajify.koyeb.app/api/profiles`;

export default function FollowButton({ name, customStyle, id, isFollowingCreator, isFollowedByCreator, handleFollowerAmountChange } : Props) {
    const { headers } = useAuth();
    const [loading, setLoading] = useState(false);
    const [hasFollowedCreator, setHasFollowedCreator] = useState<boolean>(isFollowingCreator);
    
    async function handleFollow() {
        setLoading(true);
        await fetch(`${API_URL}/${isFollowedByCreator ? "follow-creator/back" : "follow-creator"}/${id}`, {
            headers,
            method: "PATCH"
        });

        setHasFollowedCreator(true);
        handleFollowerAmountChange && handleFollowerAmountChange("follow")
        setLoading(false);
    }


    async function handleUnFollow() {
        setLoading(true);
        await fetch(`${API_URL}/unfollow-creator/${id}`, {
            headers,
            method: "PATCH"
        });

        setHasFollowedCreator(false);
        handleFollowerAmountChange && handleFollowerAmountChange("unfollow")
        setLoading(false);
    }

    return (
        <React.Fragment>
            {(hasFollowedCreator) ? (
                <TouchableOpacity style={[styles.followBtn, { backgroundColor: variables.colors.primaryTint2 }]} onPress={handleUnFollow} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color={variables.colors.text} size="small" />
                    ) : (
                        <Text style={[typography.button, { color: variables.colors.text }]}>Followed</Text>
                    )}
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={[styles.followBtn, customStyle]} onPress={handleFollow} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color={variables.colors.text} size="small" />
                    ) : (
                        <Text style={typography.paragraph}>Follow{isFollowedByCreator ? " back" : ""}{name ? " " + name : ""}</Text>
                    )}
                </TouchableOpacity>
            )}
        </React.Fragment>
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