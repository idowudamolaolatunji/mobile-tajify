import React from 'react'
import BackButton from '@/components/elements/BackButton'
import { typography } from '@/constants/typography';
import variables from '@/constants/variables';
import { useDataContext } from '@/context/DataContext';
import { PicsImageType } from '@/types/type';
import { AntDesign, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import moment from 'moment';


export default function ImageViewer() {
    const { selectedData } : { selectedData: PicsImageType } = useDataContext()

    const handleDownload = async function() {
        let date = moment().format('YYYYMMDDhhmmss')
        let fileUri = FileSystem.documentDirectory + `${date}.jpg`;
        try {
            // @ts-ignore
            const res = await FileSystem.downloadAsync(selectedData?.preview.url, fileUri)
            saveFile(res.uri)
        } catch (err) {
            console.log("FS Err: ", err)
        }
    }
    
    const saveFile = async function(fileUri: string) {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (status === "granted") {
            try {
                const asset = await MediaLibrary.createAssetAsync(fileUri);
                const album = await MediaLibrary.getAlbumAsync('Download');
                if (album == null) {
                    await MediaLibrary.createAlbumAsync('Download', asset, false);
                } else {
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                }
            } catch (err) {
                console.log("Save err: ", err)
            }
        } else if (status === "denied") {
            alert("please allow permissions to download")
        }
    }

  return (
    <View style={styles.pageContainer}>
        <BackButton showText />
      
        <View>
            <Image source={{ uri: selectedData.preview.url }} style={styles.image} />

            <View>
                <Text style={[typography.h3, { color: variables.colors.text }]}>{selectedData.title}</Text>

                <View style={styles.infoBox}>
                    <View style={styles.infoEl}>
                        <MaterialCommunityIcons name="eye" size={20} color={variables.colors.text} />
                        <Text style={styles.infoText}>{selectedData.views} Views</Text>
                    </View>
                    <View style={styles.infoEl}>
                        <MaterialCommunityIcons name="image-size-select-large" size={20} color={variables.colors.text} />
                        <Text style={styles.infoText}>{selectedData.size} Size</Text>
                    </View>
                    <View style={styles.infoEl}>
                        <AntDesign name="heart" size={20} color={variables.colors.text} />
                        <Text style={styles.infoText}>{selectedData.likes} Likes</Text>
                    </View>
                    <View style={styles.infoEl}>
                        <Octicons name="download" size={20} color={variables.colors.text} />
                        <Text style={styles.infoText}>{selectedData.downloads} Downloads</Text>
                    </View>
                </View>
            </View>


            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.button, { backgroundColor: variables.colors.primary }]}>
                    <AntDesign name="heart" size={24} color={variables.colors.text} />
                    <Text style={[{ color: variables.colors.text }, typography.paragraphBg]}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: variables.colors.primaryTint2 }]} onPress={handleDownload}>
                    <Octicons name="download" size={24} color={variables.colors.text} />
                    <Text style={[{ color: variables.colors.text }, typography.paragraphBg]}>Download</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: variables.colors.background,
        paddingHorizontal: 16,
	},
    image: {
        width: "100%",
        height: 450,
        borderRadius: 7,
        marginBottom: 20
    },
    infoBox: {
        marginTop: 20,
        flexDirection: "row",
        gap: 20,
    },
    infoEl: {
        alignItems: "center"
    },
    infoText: {
        color: variables.colors.text,
        fontSize: 13
    },
    buttons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        marginTop: 24
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderRadius: 2
    },
});
