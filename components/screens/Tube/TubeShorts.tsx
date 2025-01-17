// import { typography } from "@/constants/typography";
// import variables from "@/constants/variables";
// import { countNum, truncateString } from "@/utils/helper";
// import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
// import { useRef, useState, useEffect } from "react";
// import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, useWindowDimensions } from "react-native";
// import { FontAwesome5, AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useFetchedContext } from "@/context/FetchedContext";


// const data = [
// 	{
// 		creator: { _id: "232", profileName: "The Creator hub", profileImage: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735905932/1735905927238.jpg" },
// 		title: "A good way to make money",
// 		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam omnis, pariatur nobis numquam quidem quo?",
// 		videoUrl: "https://res.cloudinary.com/dy3bwvkeb/video/upload/v1735849999/A%20good%20way%20to%20make%20money.mp4",
// 		thumbnailUrl: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735849346/grbxt58knxbcpsayjnrs.jpg",
// 		views: 0,
// 		likes: 0,
// 		shares: 0,
// 		saves: 0,
// 		comments: 0,
// 		type: "tube-short",
// 		hashTags: ["#makemoney2024", "#moneyisgood"],
// 		_id: "344",
// 		createdAt: "2024-12-21T22:19:17.436Z",
// 		updatedAt: "2024-12-21T22:19:17.436Z",
// 		lastModified: null,
// 		slug: "a-good-way-to-make-money",
// 		__v: 0,
// 	},
// 	{
// 		creator: { _id: "76", profileName: "The Creator hub", profileImage: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735905932/1735905927238.jpg" },
// 		title: "A good way to make money",
// 		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam omnis, pariatur nobis numquam quidem quo?",
// 		videoUrl: "https://res.cloudinary.com/dy3bwvkeb/video/upload/v1735849999/A%20good%20way%20to%20make%20money.mp4",
// 		thumbnailUrl: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735849346/grbxt58knxbcpsayjnrs.jpg",
// 		views: 0,
// 		likes: 0,
// 		shares: 0,
// 		saves: 0,
// 		comments: 0,
// 		type: "tube-short",
// 		hashTags: ["#makemoney2024", "#moneyisgood"],
// 		_id: "23",
// 		createdAt: "2024-12-21T22:19:17.436Z",
// 		updatedAt: "2024-12-21T22:19:17.436Z",
// 		lastModified: null,
// 		slug: "a-good-way-to-make-money",
// 		__v: 0,
// 	},
	
// ];

// function TubeShorts() {
//     const { height } = useWindowDimensions()
//     const { handleFetchTubes, tubeShorts, loader } = useFetchedContext();
//     const videoRef = useRef<Video>(null);

//     const [showMore, setShowMore] = useState(false);
//     const [status, setStatus] = useState<AVPlaybackStatus>();
//     const [activeId, setActiveId] = useState(data[0]._id)

//     const isPlaying = status?.isLoaded && status.isPlaying;

//     const handlePressed = function() {
//         if(!videoRef.current) {
//             return;
//         }

//         if(isPlaying) {
//             videoRef.current.pauseAsync()
//             console.log("Pressed and Paused!");
//         } else {
//             videoRef.current.playAsync();
//             console.log("Pressed and Played!");
//         }
//     }

//     useEffect(function() {
//         // handleFetchTubes();
//     }, []);

//     useEffect(function() {
        
//     }, [activeId])


// 	return (
//         <FlatList data={data} renderItem={({item}) => (
//             <View style={[styles.container, { height: height - 219 }]}>
//                 <Video
//                     ref={videoRef}
//                     style={[StyleSheet.absoluteFill, styles.video]}
//                     source={{ uri: item.videoUrl }}
//                     useNativeControls={false}
//                     isLooping
//                     resizeMode={ResizeMode.COVER}
//                     onPlaybackStatusUpdate={setStatus}
//                 />

//                 <Pressable onPress={handlePressed} style={styles.content}>
//                     {!isPlaying && (
//                         <Ionicons name="play" style={{
//                             position: "absolute", top: "35%", /* top: "45%", */ alignSelf: "center"
//                         }} size={70} color={variables.colors.white} />
//                     )}

//                     <SafeAreaView style={{ flex: 1 }}>
//                         <LinearGradient
//                             colors={["rgba(0, 0, 0, .15)", "transparent" ]}
//                             style={[StyleSheet.absoluteFillObject, styles.overlay]}
//                         />
//                         <View style={styles.contentContainer}>

//                             <View style={styles.elementContainer}>
//                                 <TouchableOpacity style={styles.element}>
//                                     <AntDesign name="heart" size={28} color={variables.colors.text} />
//                                     <Text style={styles.elementText}>{countNum(item.likes)}</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={styles.element}>
//                                     <FontAwesome name="commenting" size={28} color={variables.colors.text} />
//                                     <Text style={styles.elementText}>{countNum(item.comments)}</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity style={styles.element}>
//                                     <FontAwesome5 name="share" size={28} color={variables.colors.text} />
//                                     <Text style={styles.elementText}>{countNum(item.shares)}</Text>
//                                 </TouchableOpacity>
//                             </View>


//                             <View style={styles.contentTop}>
//                                 <View style={styles.contentWriter}>
//                                     <Image source={{ uri: item.creator.profileImage }} style={styles.profileImage} />
//                                     <Text style={[typography.paragraphBg, styles.profileName]}>{item.creator?.profileName}</Text>
//                                 </View>

//                                 <TouchableOpacity style={styles.followBtn}>
//                                     <Text style={[typography.button, { color: variables.colors.text }]}>Follow</Text>
//                                 </TouchableOpacity>
//                             </View>


//                             <View style={styles.captionBox}>
//                                 <Text style={styles.caption}>
//                                     {truncateString(item.description, showMore ? 1000000 : 50)}
                                    
//                                     <TouchableOpacity onPress={() => setShowMore(!showMore)}>
//                                         <Text
//                                             style={[{ color: "#fff", marginLeft: 5 }, showMore ? { color: variables.colors.primary } : {}]}
//                                         >
//                                             {showMore ? "Hide" : "Show more"}
//                                         </Text>
//                                     </TouchableOpacity>
//                                 </Text>


//                                 <View style={styles.hashtags}>
//                                     {item.hashTags.length > 0 && item.hashTags.map((hashtag: string, i: any) => (
//                                         <Text key={i} style={{ color: "#aaa", marginRight: 3 }}>{hashtag}</Text>
//                                     ))}
//                                 </View>

//                                 <Text style={styles.dateText}>3 days ago</Text>
//                             </View>
//                         </View>
//                     </SafeAreaView>
//                 </Pressable>
//             </View>
//         )} pagingEnabled />
//     );
// }

// export default TubeShorts;


// const styles = StyleSheet.create({
//     container: {},
//     video: {
//         flex: 1,
//         height: "100%"
//     },
//     content: {
//         flex: 1,
//     },
//     overlay: {
//         top: "50%",
//     },
//     contentContainer: {
//         marginTop: "auto",
//         paddingHorizontal: 16,
//         paddingVertical: 5
//     },
//     contentTop: {
//         display: "flex",
//         alignItems: "center",
//         flexDirection: "row",
//         justifyContent: "space-between"
//     },
//     contentWriter: {
//         display: "flex",
//         alignItems: "center",
//         flexDirection: "row",
//         gap: 15,
//         marginBottom: 10
//     },
//     profileImage: {
//         width: 36,
//         height: 36,
//         borderColor: "#ddd",
//         borderWidth: 2,
//         borderRadius: 50
//     },
//     profileName: {
//         fontSize: 16,
//     },
//     followBtn: {
//         paddingVertical: 4,
//         paddingHorizontal: 8,

//         backgroundColor: variables.colors.primary,
//         borderRadius: 4
//     },
//     captionBox: {},
//     caption: {
//         fontSize: 14,
//         color: variables.colors.text,
//         lineHeight: 19
//     },
//     hashtags: {
//         display: "flex",
//         alignItems: "center",
//         flexDirection: "row",
//         flexWrap: "wrap",
//         borderWidth: 1,
//         borderColor: "transparent"
//     },
//     dateText: {
//         color: variables.colors.text,
//         fontSize: 12
//     },
//     elementContainer: {
//         marginLeft: "auto",
//         width: "10%",
//     },
//     element: {
//         marginBottom: 10,
//     },
//     elementText: {
//         color: variables.colors.text,
//         marginTop: 5,
//         marginBottom: 3,
//         textAlign: "center"
//     },
// })



import ShortLayout from '@/components/layouts/ShortLayout'
import { useFetchedContext } from '@/context/FetchedContext';
import React, { useEffect, useState } from 'react'
import { FlatList, View, FlatListProps } from 'react-native'

const data = [
	{
		creator: { _id: "232", profileName: "The Creator hub", profileImage: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735905932/1735905927238.jpg" },
		title: "A good way to make money",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam omnis, pariatur nobis numquam quidem quo?",
		videoUrl: "https://res.cloudinary.com/dy3bwvkeb/video/upload/v1735849999/A%20good%20way%20to%20make%20money.mp4",
		thumbnailUrl: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735849346/grbxt58knxbcpsayjnrs.jpg",
		views: 0,
		likes: 0,
		shares: 0,
		saves: 0,
		comments: 0,
		type: "tube-short",
		hashTags: ["#makemoney2024", "#moneyisgood"],
		_id: "344",
		createdAt: "2024-12-21T22:19:17.436Z",
		updatedAt: "2024-12-21T22:19:17.436Z",
		lastModified: null,
		slug: "a-good-way-to-make-money",
		__v: 0,
	},
	{
		creator: { _id: "76", profileName: "The Creator hub", profileImage: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735905932/1735905927238.jpg" },
		title: "A good way to make money",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam omnis, pariatur nobis numquam quidem quo?",
		videoUrl: "https://res.cloudinary.com/dy3bwvkeb/video/upload/v1735849999/A%20good%20way%20to%20make%20money.mp4",
		thumbnailUrl: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735849346/grbxt58knxbcpsayjnrs.jpg",
		views: 0,
		likes: 0,
		shares: 0,
		saves: 0,
		comments: 0,
		type: "tube-short",
		hashTags: ["#makemoney2024", "#moneyisgood"],
		_id: "23",
		createdAt: "2024-12-21T22:19:17.436Z",
		updatedAt: "2024-12-21T22:19:17.436Z",
		lastModified: null,
		slug: "a-good-way-to-make-money",
		__v: 0,
	},
	{
		creator: { _id: "176", profileName: "The Creator hub", profileImage: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735905932/1735905927238.jpg" },
		title: "A good way to make money",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam omnis, pariatur nobis numquam quidem quo?",
		videoUrl: "https://res.cloudinary.com/dy3bwvkeb/video/upload/v1735849999/A%20good%20way%20to%20make%20money.mp4",
		thumbnailUrl: "https://res.cloudinary.com/dy3bwvkeb/image/upload/v1735849346/grbxt58knxbcpsayjnrs.jpg",
		views: 0,
		likes: 0,
		shares: 0,
		saves: 0,
		comments: 0,
		type: "tube-short",
		hashTags: ["#makemoney2024", "#moneyisgood"],
		_id: "123",
		createdAt: "2024-12-21T22:19:17.436Z",
		updatedAt: "2024-12-21T22:19:17.436Z",
		lastModified: null,
		slug: "a-good-way-to-make-money",
		__v: 0,
	},
	
];

function TubeShorts() {
    const { handleFetchTubes, tubeShorts, loader } = useFetchedContext();
    const [activeId, setActiveId] = useState(data[0]._id);

    const onViewableItemsChanged = function({ changed, viewableItems } : any) {
        console.log(changed)
        console.log("//////////////")
        console.log(viewableItems)

        if(viewableItems.length > 0 && viewableItems[0].isViewable) {
            setActiveId(viewableItems[0].item._id)
        }
    }

    useEffect(function() {
        // handleFetchTubes();
    }, []);
    

  return (
    <View>
        <FlatList
            data={data}
            renderItem={({item}) => <ShortLayout post={item} activeId={activeId} />}
            pagingEnabled
            viewabilityConfig={{
                // itemVisiblePercentThreshold: 50
                viewAreaCoveragePercentThreshold: 50
            }}
            onViewableItemsChanged={onViewableItemsChanged}
        />
    </View>
  )
}

export default TubeShorts
