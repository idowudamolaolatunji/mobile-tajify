import React, { useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import variables from '@/constants/variables';
import { typography } from '@/constants/typography';

interface Props {
    label?: string;
    image: { file: any, preview: string }
    setImage: ({ file, preview } : { file: any, preview: string }) => void;
    customHeight: number;
}

export default function ImageUploader({ label, image, setImage, customHeight } : Props) {

    const handleImage = async function() {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if(!result.canceled) {
                console.log(result.assets[0].uri)
                setImage({ file: null, preview: result.assets[0].uri })
            }
        } catch(err) {
            Alert.alert("Error", "Error Uploading image")
        }
    }
    const onRemoveImage = function() {
        setImage({
            file: null,
            preview: ""
        });
    }


  return (
    <>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity style={[styles.container, { height: customHeight }]}>
            {image.preview ? (
                <>
                    <Image
                        source={{ uri: image.preview }}
                        style={styles.images}
                    />

                    <TouchableOpacity onPress={onRemoveImage} style={styles.remove}>
                        <AntDesign name="delete" size={24} color={variables.colors.text} />
                    </TouchableOpacity>
                </>
            ) : (
                <TouchableOpacity style={styles.addContainer} onPress={handleImage}>
                    <MaterialCommunityIcons name="cloud-upload" size={40} color={variables.colors.primary} />
                    <Text style={{ color: variables.colors.background, fontSize: 17 }}>Click to upload or take a photo</Text>
                </TouchableOpacity>
            )}

        </TouchableOpacity>
    </>
  )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 150,
        borderRadius: 6,
        backgroundColor: variables.colors.tintedWhite,
        position: "relative"
    },
    label: {
        ...typography.paragraphBg,
        color: variables.colors.text,
        marginBottom: 10,
    },
    images: {
        width: "100%",
        height: "100%"
    },
    addContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    remove: {
        width: 40,
        height: 40,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#950606",
        position: "absolute",
        bottom: 10,
        right: 5,
    }
})