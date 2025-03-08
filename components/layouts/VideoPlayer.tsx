import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Image, ActivityIndicator } from "react-native";
// import { Video } from "expo-av";
import { useVideoPlayer, VideoView } from "expo-video"
import variables from "@/constants/variables";
import ModalLoader from "../loaders/ModalLoader";

interface VideoPlayerProps {
    videoUrl: string;
    thumbnail?: string;
}

export default function VideoPlayer({ videoUrl } : VideoPlayerProps) {
    const [loader, setLoader] = useState(true)

    const player = useVideoPlayer(videoUrl, function(player) {
        // player.play();
        player.loop = false;
        player.staysActiveInBackground = true;
    });

    useEffect(function() {
        setTimeout(() => {
            setLoader(false)
        }, 5000);
        // if(player.status == "readyToPlay") {}
    }, []);

    
  return (
    <View style={styles.container}>
        <VideoView player={player} style={styles.video} allowsFullscreen />
        
        {loader && <ModalLoader />}
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        backgroundColor: variables.colors.bgLight,
        height: Dimensions.get("window").width * (9 / 16),
        borderRadius: 4,
    },
    video: {
        // aspectRatio: 16 / 9,
        width: "100%",
        height: "100%",
        borderRadius: 4,
    }
})