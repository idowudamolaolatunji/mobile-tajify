import React, { createContext, useState, useContext } from "react";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
interface DataContextType {
    imagesView: string;
    handleChangeImagesView: (view: string) => void;
    pickedShortVideo: any;
    setPickedShortVideo: ({ url, file } : { url: string, file: any }) => void;

    selectedData: unknown;
    setSelectedData: (data: unknown) => void;
    selectedProfileId: string | any;
    setSelectedProfileId: (profile: string) => void;
}

const DataContext = createContext<DataContextType | any>(null);
export default DataContext;


//////////////////////////////////////////////
//// CREATING PROVIDER ////
//////////////////////////////////////////////
interface DataProviderProps {
    children: React.ReactNode;
}

  
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [imagesView, setImagesView] = useState<string>("double") // single | double
    const [pickedShortVideo, setPickedShortVideo] = useState<unknown>({ url: "", file: null }) // single | double
    const [selectedData, setSelectedData] = useState<unknown>(null);
    const [selectedProfileId, setSelectedProfileId] = useState<unknown>(null);

    const handleChangeImagesView = function(view: string) {
        setImagesView(view)
    }

   
    // CREATE CONTEXT DATA
    let contextData: DataContextType = {
        imagesView,
        handleChangeImagesView,
        selectedData,
        setSelectedData,
        selectedProfileId,
        setSelectedProfileId,

        pickedShortVideo,
        setPickedShortVideo,
    }

    return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useDataContext = () => useContext(DataContext);