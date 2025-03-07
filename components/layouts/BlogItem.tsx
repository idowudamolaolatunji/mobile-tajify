import React, { useState } from 'react'
import { typography } from '@/constants/typography';
import variables from '@/constants/variables';
import { formatDateAgo, truncateString } from '@/utils/helper';
import {  Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { BlogType } from '@/types/type';
import { useRouter } from 'expo-router';


export default function BlogItem({ data } : BlogType | any) {
	const router = useRouter()

    const handlePress = function() {
		// router.navigate('')
	}

    return (
        <TouchableHighlight onPress={handlePress}>
            <View style={styles.itemContainer}>
                <View>
                    <Image
                        source={{ uri: data?.coverImage.url }}
                        style={{...styles.blogImage }}
                    />
                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View style={{ width: "100%" }}>
                        <Text style={[styles.blogTitle, { color: variables.colors.text } ]}>{truncateString(data?.name, 30)}</Text>
                        <Text numberOfLines={2} style={styles.description}>
                            {truncateString(data.description, 150)}
                        </Text>
                    </View>

                </View>
            </View>
        </TouchableHighlight>
    );
}


const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        backgroundColor: variables.colors.card,
        alignItems: "flex-start",
        padding: 7,
        borderRadius: 8,
        marginBottom: 15,
        gap: 10,
    },
    blogImage: {
        width: 95,
        height: 100,
        borderRadius: 8
    },
    blogTitle: {
        ...typography.paragraphBg,
        color: variables.colors.text,
        maxWidth: "90%"
    },
    description: {
        marginTop: 4,
        color: variables.colors.bgLight,
        lineHeight: 17,
        marginBottom: 10
    },

})
