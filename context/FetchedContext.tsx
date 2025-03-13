import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { TubeType } from "@/types/type";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
interface FetchedContextType {
    loader: boolean;
    tubeMax: Array<unknown> | TubeType | any;
    tubeShorts: Array<unknown> | TubeType | any;
    handleFetchTubes: (type: string, limit: number, page: number) => void;
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
    const [tubeShorts, setTubeShorts] = useState<TubeType[] | any>([]);
    const [tubeMax, setTubeMax] = useState<TubeType[] | any>([]);
    const [loader, setLoader] = useState(true)
    const { headers } = useAuth()
    const API_BASE_URL = "https://api-tajify.koyeb.app";


    async function handleFetchTubes(type:string="tube-short", limit:number=10, page:number=1) {
        try {
            setLoader(true)
            const res = await fetch(`${API_BASE_URL}/api/channels/tubes?type=${type}&limit=${limit}&page=${page}`, {
                headers, method: "GET",
            });

            const data = await res.json();
            const tubes = data?.data?.tubes
            console.log(tubes)

            if(type == "tube-short") setTubeShorts(tubes);
            if(type == "tube-max") setTubeMax(tubes)
        } catch (err: any) {
            console.error(err?.message);
        } finally {
            setLoader(false)
        }
    }

    // CREATE CONTEXT DATA
    let contextData: FetchedContextType = {
        loader,
        tubeMax,
        tubeShorts,
        handleFetchTubes,
    }

    return <FetchedContext.Provider value={contextData}>{children}</FetchedContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useFetchedContext = () => useContext(FetchedContext);