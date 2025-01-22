import { typography } from "@/constants/typography";
import variables from "@/constants/variables";
import { countNum, truncateString } from "@/utils/helper";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useEffect, useRef, useState } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { FontAwesome5, AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useIsFocused } from '@react-navigation/native';


function ShortLayout({ short, activeId } : { short: any; activeId: string; }) {
	const pageIsFocused = useIsFocused()
    const { height } = useWindowDimensions()
    
    const videoRef = useRef<Video>(null);
    const [showMore, setShowMore] = useState(false);
    const [status, setStatus] = useState<AVPlaybackStatus>();

    const isPlaying = status?.isLoaded && status.isPlaying;

    // PLAY OR PLAY CURRENTLY PLAYING VIDEO
    const handlePressed = function() {
        if(!videoRef.current) return;

        if(isPlaying) {
            videoRef.current.pauseAsync()
            console.log("Pressed and Paused!", short._id, activeId);
        } else {
            videoRef.current.playAsync();
            console.log("Pressed and Played!", short._id, activeId);
        }
    }

    // PAULSE OR PLAY THE CURRENT PLAYING VIDEO, WHEN YOU SCROLL INTO VIEW OR OUT OF VIEW
    useEffect(function() {
        if(!videoRef.current) return;

        if(activeId !== short._id) {
            videoRef.current?.pauseAsync()
        }
        if(activeId === short._id) {
            videoRef.current?.playAsync()
        }

    }, [activeId, videoRef.current]);


    // WHEN U LEAVE THE PAGE, THE CURRENT PLAYING VIDEO IS PAUSED AND PLAYS WHEN YOU COME BACK
    useEffect(function() {
        if(!videoRef.current) return;
        
        if(!pageIsFocused) {
            videoRef.current?.pauseAsync()
        }
        
        if(isPlaying && pageIsFocused) {
            videoRef.current?.playAsync()
        }

    }, [pageIsFocused, videoRef.current])

    
    return (
        <View style={[styles.container, { height: height - 219 }]}>
            <Video
                ref={videoRef}
                style={[StyleSheet.absoluteFill, styles.video]}
                source={{ uri: short.video.url }}
                useNativeControls={false}
                isLooping
                resizeMode={ResizeMode.COVER}
                onPlaybackStatusUpdate={setStatus}
            />

            {/* THE CONTENT, IT IS POSITION ABSOLUTELY OVER THE VIDEO AND HAS A GRADIENT TOWARD THE BOTTOM OF THE SCREEN   */}
            <Pressable onPress={handlePressed} style={styles.content}>
                {!isPlaying && (
                    <Ionicons name="play" style={{
                        position: "absolute", top: "40%", alignSelf: "center"
                    }} size={70} color={variables.colors.white} />
                )}

                <SafeAreaView style={{ flex: 1 }}>
                    <LinearGradient
                        colors={["transparent", "rgba(0, 0, 0, .68)" ]}
                        style={[StyleSheet.absoluteFillObject, styles.overlay]}
                    />

                    <View style={styles.contentContainer}>
                        <View style={styles.elementContainer}>
                            <TouchableOpacity style={styles.element}>
                                <AntDesign name="heart" size={28} color={variables.colors.text} />
                                <Text style={styles.elementText}>{countNum(short.likes)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.element}>
                                <FontAwesome name="commenting" size={28} color={variables.colors.text} />
                                <Text style={styles.elementText}>{countNum(short.comments)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.element}>
                                <FontAwesome5 name="share" size={28} color={variables.colors.text} />
                                <Text style={styles.elementText}>{countNum(short.shares)}</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.contentTop}>
                            <View style={styles.contentWriter}>
                                <Image source={{ uri: short.creatorProfile?.profileImage?.url || "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1737549092/pngegg_yirbea.png" }} style={styles.userImage} />
                                <Text style={[typography.paragraphBg, styles.profileName]}>{short.creatorProfile.profileName || "Channel Unknown"}</Text>
                            </View>

                            <TouchableOpacity style={styles.followBtn}>
                                <Text style={[typography.button, { color: variables.colors.text }]}>Follow</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.captionBox}>
                            <Text style={styles.caption}>
                                {truncateString(short.description, showMore ? 1000000 : 50)}
                                
                                <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                                    <Text
                                        style={[{ color: "#fff", marginLeft: 5 }, showMore ? { color: variables.colors.primary } : {}]}
                                    >
                                        {showMore ? "Hide" : "Show more"}
                                    </Text>
                                </TouchableOpacity>
                            </Text>


                            <View style={styles.hashtags}>
                                {short.hashTags.length > 0 && short.hashTags.map((hashtag: string, i: any) => (
                                    <Text key={i} style={{ color: "#aaa", marginRight: 3 }}>{hashtag}</Text>
                                ))}
                            </View>

                            <Text style={styles.dateText}>3 days ago</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </Pressable>
        </View>
    )
}

export default ShortLayout



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    video: {
        flex: 1,
        height: "100%"
    },
    content: {
        flex: 1,
    },
    overlay: {
        top: "50%",
    },
    contentContainer: {
        marginTop: "auto",
        paddingHorizontal: 16,
        paddingVertical: 5
    },
    contentTop: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    contentWriter: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 15,
        marginBottom: 10
    },
    userImage: {
        width: 36,
        height: 36,
        borderColor: "#ddd",
        borderWidth: 2,
        borderRadius: 50
    },
    profileName: {
        fontSize: 16,
    },
    followBtn: {
        paddingVertical: 4,
        paddingHorizontal: 8,

        backgroundColor: variables.colors.primary,
        borderRadius: 4
    },
    captionBox: {},
    caption: {
        fontSize: 14,
        color: variables.colors.text,
        lineHeight: 19
    },
    hashtags: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        borderWidth: 1,
        borderColor: "transparent"
    },
    dateText: {
        color: variables.colors.text,
        fontSize: 12
    },
    elementContainer: {
        marginLeft: "auto",
        width: "10%",
    },
    element: {
        marginBottom: 10,
    },
    elementText: {
        color: variables.colors.text,
        marginTop: 5,
        marginBottom: 3,
        textAlign: "center"
    },
})