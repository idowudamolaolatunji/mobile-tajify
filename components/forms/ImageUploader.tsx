import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import variables from '@/constants/variables';
import { typography } from '@/constants/typography';
import * as ImagePicker from 'expo-image-picker';


interface Props {
    label?: string;
    image: string;
    setImage: (file: string) => void;
    customHeight: number;
}

export default function ImageUploader({ label, image, setImage, customHeight } : Props) {
    const handleOpenLib = async function() {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    }

    
    const onRemoveImage = function() {
        setImage("");
    }


  return (
    <React.Fragment>
        <Text style={styles.label}>{label} (Required)</Text>
        <TouchableOpacity style={[styles.container, { height: customHeight }]}>
            {image ? (
                <React.Fragment>
                    <Image
                        source={{ uri: image }}
                        style={styles.images}
                    />

                    <TouchableOpacity onPress={onRemoveImage} style={styles.remove}>
                        <AntDesign name="delete" size={24} color={variables.colors.text} />
                    </TouchableOpacity>
                </React.Fragment>
            ) : (
                <TouchableOpacity style={styles.addContainer} onPress={handleOpenLib}>
                    <MaterialCommunityIcons name="cloud-upload" size={40} color={variables.colors.primary} />
                    <Text style={{ color: variables.colors.background, fontSize: 17 }}>Select image for {label?.replace("Image", "")}</Text>
                </TouchableOpacity>
            )}

        </TouchableOpacity>
    </React.Fragment>
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