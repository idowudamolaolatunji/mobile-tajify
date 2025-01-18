import React, { createContext, useState, useEffect, useContext } from "react";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
interface FetchedContextType {
    loader: boolean;
    tubeShorts: [] | any;
    handleFetchTubes: (limit: number, page: number) => void;
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
    const [tubeShorts, setTubeShorts] = useState([])
    const [loader, setLoader] = useState(false)
    const API_BASE_URL = process.env.API_BASE_URL;


    async function handleFetchTubes(limit= 10, page= 1) {
        try {
            setLoader(true)
            const res = await fetch(`${API_BASE_URL}/api/channels/tubes?type=tube-short&limit=${limit}&page=${page}`);
            const data = await res.json();

            setTubeShorts(data.data?.tubes);
        } catch (err: any) {
            console.error(err?.message);
        } finally {
            setLoader(false)
        }
    }



    // CREATE CONTEXT DATA
    let contextData: FetchedContextType = {
        loader,
        tubeShorts,
        handleFetchTubes,
    }


    return <FetchedContext.Provider value={contextData}>{children}</FetchedContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useFetchedContext = () => useContext(FetchedContext);