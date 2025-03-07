import React from "react";
import { View, StyleSheet } from "react-native";
import { Video } from "expo-av";

interface VideoPlayerProps {
    videoUrl: string;
    thumbnail?: string;
}

export default function VideoPlayer({ videoUrl, thumbnail } : VideoPlayerProps) {
    console.log(videoUrl)

  return (
    <View style={styles.container}>
        <Video source={{ uri: videoUrl }} style={styles.video}
            posterSource={{
                uri: thumbnail,
            }}
            posterStyle={{
                resizeMode: "cover",
            }}
            usePoster={false}
            useNativeControls
            // @ts-ignore
            resizeMode="contain"
        />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    video: {
        width: "100%",
        aspectRatio: 16 / 9,
        borderRadius: 4,
    }
})