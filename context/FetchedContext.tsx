import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { BlogType, BookType, MusicType, PicsImageType, PodcastType, TubeType } from "@/types/type";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
interface FetchedContextType {
    loader: boolean;
    tubeMax: Array<unknown> | TubeType | any;
    tubeShorts: Array<unknown> | TubeType | any;
    musics: Array<unknown> | MusicType | any;
    podcasts: Array<unknown> | PodcastType | any;
    picsImages: Array<unknown> | PicsImageType | any;
    blogs: Array<unknown> | BlogType | any;
    books: Array<unknown> | BookType | any;
    handleFetchTubes: (type: string, limit: number, page: number) => void;
    handleFetchMusics: () => void;
    handleFetchPodcasts: () => void;
    handleFetchPicsImages: () => void;
}

const FetchedContext = createContext<FetchedContextType | any>(null);
export default FetchedContext;


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////
interface FetchedProviderProps {
    children: React.ReactNode;
}

  
export const FetchedProvider: React.FC<FetchedProviderProps> = ({ children }) => {
    const { headers } = useAuth()
    const API_URL = "https://api-tajify.koyeb.app/api";
    const [loader, setLoader] = useState(true);

    const [tubeShorts, setTubeShorts] = useState<TubeType[] | any>([]);
    const [tubeMax, setTubeMax] = useState<TubeType[] | any>([]);
    const [musics, setMusics] = useState<MusicType[] | any>([])
    const [podcasts, setPodcasts] = useState<PodcastType[] | any>([]);
    const [picsImages, setPicsImages] = useState<PicsImageType[] | any>([]);
    const [blogs, setBlogs] = useState<BlogType[] | any>([]);
    const [books, setBooks] = useState<BookType[] | any>([]);


    async function handleFetchTubes(type:string="tube-short", limit:number=10, page:number=1) {
        try {
            setLoader(true)
            const res = await fetch(`${API_URL}/channels/tubes?type=${type}&limit=${limit}&page=${page}`, {
                headers, method: "GET",
            });

            const data = await res.json();
            const tubes = data?.data?.tubes

            if(type == "tube-short") setTubeShorts(tubes);
            if(type == "tube-max") setTubeMax(tubes)
        } catch (err: any) {
            console.error(err?.message);
        } finally {
            setLoader(false)
        }
    }


    async function handleFetchMusics() {
        try {
            setLoader(true);

            const res = await fetch(`${API_URL}/channels/music`, { method: "GET", headers });
            const data = await res.json();
            
            console.log(data);
            if (res?.status !== 200 || data?.status !== "success") {
                throw new Error(data.message || data?.error);
            }

            setMusics(data.data.musics);
        } catch(err) {
            ////////////////
        } finally {
            setLoader(false);
        }
    }

    async function handleFetchPodcasts() {
        try {
            setLoader(true);

            const res = await fetch(`${API_URL}/channels/podcasts`, { method: "GET", headers });
			const data = await res.json();
            
            if (res?.status !== 200 || data?.status !== "success") {
                throw new Error(data.message || data?.error);
            }

            setPodcasts(data?.data?.podcasts);
        } catch(err) {
            ////////////////
        } finally {
            setLoader(false);
        }
    }


    async function handleFetchPicsImages() {
        try {
            setLoader(true);

            const res = await fetch(`${API_URL}/channels/pics`, { method: "GET", headers });
			const data = await res.json();
            
            if (res?.status !== 200 || data?.status !== "success") {
                throw new Error(data.message || data?.error);
            }

            setPicsImages(data?.data?.pics);
        } catch(err) {
            ////////////////
        } finally {
            setLoader(false);
        }
    }

    // CREATE CONTEXT DATA
    let contextData: FetchedContextType = {
        loader,
        tubeMax,
        tubeShorts,
        handleFetchTubes,

        musics,
        handleFetchMusics,
        podcasts,
        handleFetchPodcasts,

        picsImages,
        handleFetchPicsImages,

        blogs,
        books,
    }

    return <FetchedContext.Provider value={contextData}>{children}</FetchedContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useFetchedContext = () => useContext(FetchedContext);