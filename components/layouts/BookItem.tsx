import { unknownBookImageUri } from '@/constants/images'
import { typography } from '@/constants/typography'
import variables from '@/constants/variables'
import { BookType } from '@/types/type'
import { truncateString } from '@/utils/helper'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image } from 'react-native'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'

export default function BookItem({ data } : BookType | any) {
    const router = useRouter()

    const handlePress = function() {
		// router.navigate('')
	}

  return (
    <TouchableHighlight onPress={handlePress}>
        <View style={styles.itemContainer}>
                <View>
                    <Image
                        source={{ uri: data?.coverImage.url ? data?.coverImage.url : unknownBookImageUri }}
                        style={{...styles.bookImage }}
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
                        <Text style={[styles.bookTitle, { color: variables.colors.text } ]}>{truncateString(data?.title, 30)}</Text>
                        <Text numberOfLines={2} style={styles.description}>
                            {truncateString(data.specification.description, 70)}
                        </Text>
                       
                        <View style={styles.authorBox}>
                            <Text style={{ color: variables.colors.primary, fontSize: 14 }}>Written By</Text>
                            <Text style={styles.author}>
                                {data.specification.author.map((author: string, i: any) => (
                                    <>{author}{i < data.specification.author.length - 1 ? ", " : ""}</>
                                ))}
                            </Text>
                        </View>

                        <View style={styles.genreContainer}>
                            {data.specification.genre.map((author: string) => (
                                <View style={styles.genre}>
                                    <Text style={typography.paragraphSm}>{author}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                </View>
            </View>
    </TouchableHighlight>
  )
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
    bookImage: {
        width: 82,
        height: 105,
        borderRadius: 4
    },
    bookTitle: {
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
    authorBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3.4
    },
    author: {
        fontSize: 16,
        color: variables.colors.text
    },
    genreContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4.8,
        flexWrap: "wrap",
        marginTop: 4
    },
    genre: {
        paddingVertical: 2,
        paddingHorizontal: 4,
        backgroundColor: variables.colors.primaryTint2,
        borderRadius: 2.8
    },
})