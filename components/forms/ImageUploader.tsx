import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import variables from '@/constants/variables';
import { typography } from '@/constants/typography';
import * as ImagePicker from 'expo-image-picker';


interface Props {
    imageTitle?: string;
    label?: string;
    image: string;
    setImage: ({ file, preview} : { file: any; preview: string }) => void;
    customHeight: number;
    aspect?: [number, number];
    allowCrop?: boolean;
}

export default function ImageUploader({ imageTitle, label, image, setImage, customHeight, aspect, allowCrop=true } : Props) {

    const handleOpenLib = async function() {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: allowCrop,
          aspect: aspect || [4, 4],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage({ preview: result.assets[0].uri, file: result.assets[0]});
        }
    }

    
    const onRemoveImage = function() {
        setImage({ preview: "", file: null });
    }


  return (
    <View>
        <Text style={styles.label}>{label}</Text>
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
                    {/* <MaterialCommunityIcons name="cloud-upload" size={40} color={variables.colors.primary} /> */}
                    <FontAwesome name="picture-o" size={40} color={variables.colors.primary} />
                    <Text style={{ color: variables.colors.background, fontSize: 17 }}>{imageTitle}</Text>
                </TouchableOpacity>
            )}

        </TouchableOpacity>
    </View>
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