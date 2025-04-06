import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons'
import variables from '@/constants/variables';
import { typography } from '@/constants/typography';
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";


interface Props {
    label?: string;
    type?: string;
    video: string;
    setVideo: ({ url, file } : { url: string, file: any }) => void;
}

export default function VideoUploader({ label, type, video, setVideo } : Props) {
    const router = useRouter();
    

    const handleActions = async function() {
        if(type == "short") {
            router.navigate("/cameraView");
        } else {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["videos"],
                videoMaxDuration: 100,
            });
    
            if (!result.canceled) {
                setVideo({ url: result.assets[0].uri, file: result.assets[0] });
            }
        }
    }

    const onRemoveImage = function() {
        setVideo({ url: "", file: null });
    }


  return (
    <React.Fragment>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.container]}>
            {video ? (
                <React.Fragment>
                    <Image
                        source={{ uri: video }}
                        style={styles.images}
                    />

                    <TouchableOpacity onPress={onRemoveImage} style={styles.remove}>
                        <AntDesign name="closecircle" size={24} color={variables.colors.text} />
                    </TouchableOpacity>
                </React.Fragment>
            ) : (
                <TouchableOpacity style={styles.addContainer} onPress={handleActions}>
                    <Feather name="video" size={40} color={variables.colors.primary} />
                    <Text style={{ color: variables.colors.background, fontSize: 17 }}>Choose Video</Text>
                </TouchableOpacity>
            )}
        </View>
    </React.Fragment>
  )
}


const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 100,
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
        top: 0,
        right: 5,
    }
})