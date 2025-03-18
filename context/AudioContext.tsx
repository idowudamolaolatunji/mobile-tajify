import { EpisodeType, MusicType, PodcastType } from "@/types/type";
import { Audio, AVPlaybackStatus } from "expo-av";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useFetchedContext } from "./FetchedContext";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
interface AudioContextType {
    currentAudio: MusicType | EpisodeType | any;
    currentAudioId?: string;
    currentAudioType: string;
    setCurrentAudioType: string | any;
    playSound: Function;
    handlePlayPause: Function;
    handleNext: Function;
    handlePrev: Function;
    isPlaying: boolean;
    currentEpsParent: PodcastType | any;
    setParent?: any;
}

const AudioContext = createContext<AudioContextType | any>(null);
export default AudioContext;


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////
interface AudioProviderProps {
    children: React.ReactNode;
}

  
export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
    const { musics, podcasts } = useFetchedContext()
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentAudioId, setCurrentAudioId] = useState<string | any>("");
    const [currentAudioType, setCurrentAudioType] = useState<string>("music");
    const [currentEpsParent, setParent] = useState(null);

    //////////////////////////////////////////////////////////////

    const audioList = currentAudioType == "music" ? musics : podcasts
    const currentAudio: MusicType | EpisodeType = audioList.find((data: MusicType | EpisodeType) => data._id == currentAudioId);


    // HANDLE PLAY SONG
    const playSound = async function(data: MusicType | EpisodeType) {
        if (sound) await sound.unloadAsync();
        const currId = data?._id
    
        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: data.audio.url },
            { shouldPlay: true }
        );
    
        newSound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
            if (status.isLoaded && status.didJustFinish) {
                handleNext();
            }
        });
    
        setSound(newSound);
        if (currentAudioId !== currId) {
            setCurrentAudioId(currId);
        }
        setIsPlaying(true);
    };
    

    const handlePlayPause = async function() {
        if (!sound) return;
        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
    };
    

    const handleNext = function() {
        const currIndex =  audioList.findIndex((data: MusicType | EpisodeType) => data._id == currentAudioId);
        const nextIndex = (currIndex + 1) % audioList.length;
        const nextAudio = audioList[nextIndex]
        playSound(nextAudio);
    };


    const handlePrev = function() {
        const currIndex =  audioList.findIndex((data: MusicType | EpisodeType) => data._id == currentAudioId);
        const prevIndex = currIndex - 1 < 0 ? audioList.length - 1 : currIndex - 1;
        const prevAudio = audioList[prevIndex]
        playSound(prevAudio);
    };
   

    // CREATE CONTEXT DATA
    let contextData: AudioContextType = {
        currentAudioType,
        currentAudioId,
        setCurrentAudioType,
        isPlaying,
        playSound,
        currentAudio,
        handlePlayPause,
        handleNext,
        handlePrev,
        currentEpsParent,
        setParent,
    }

    return <AudioContext.Provider value={contextData}>{children}</AudioContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useAudioContext = () => useContext(AudioContext);