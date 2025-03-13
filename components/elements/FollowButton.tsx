import { typography } from '@/constants/typography'
import variables from '@/constants/variables'
import { useAuth } from '@/context/AuthContext';
import React, { useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, TextStyle, TouchableOpacity } from 'react-native'

interface Props {
    name?: string;
    customStyle?: TextStyle | any;
    id: string;
    isFollowingCreator: boolean;
    isFollowedByCreator?: boolean;
}

const API_URL = `https://api-tajify.koyeb.app/api/profiles`;

export default function FollowButton({ name, customStyle, id, isFollowingCreator, isFollowedByCreator } : Props) {
    const { headers } = useAuth();
    const [loading, setLoading] = useState(false);
    const [hasFollowedCreator, setHasFollowedCreator] = useState(false);
    
    async function handleFollow() {
        console.log(id);
			setLoading(true);

        try {
			const res = await fetch(`${API_URL}/${isFollowedByCreator ? "follow-creator/back" : "follow-creator"}/${id}`, {
                headers,
                method: "PATCH"
            });
			const data = await res.json();
			console.log(res, data)
			if (data?.status !== "success") {
				throw new Error(data.message || data?.error);
			}

			setHasFollowedCreator(true)
		} catch(err) {
			Alert.alert("Error", (err as any)?.message);
		} finally {
			setLoading(false);
		}
    }


    async function handleUnFollow() {
        console.log(id);
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/unfollow-creator/${id}`, {
                headers,
                method: "PATCH"
            });
			const data = await res.json();
			console.log(res, data)
			if (data?.status !== "success") {
				throw new Error(data.message || data?.error);
			}

			setHasFollowedCreator(false)
		} catch(err) {
			Alert.alert("Error", (err as any)?.message);
		} finally {
			setLoading(false);
		}
    }

    return (
        <React.Fragment>
            {(isFollowingCreator || hasFollowedCreator) ? (
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
                        <Text style={typography.paragraph}>Follow {isFollowedByCreator ? "baack" : ""} {name ?? ""}</Text>
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