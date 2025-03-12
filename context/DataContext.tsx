import { CreatorProfileType } from "@/types/type";
import React, { createContext, useState, useEffect, useContext } from "react";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
interface DataContextType {
    imagesView: string;
    handleChangeImagesView: (view: string) => void;

    selectedData: unknown;
    setSelectedData: (data: unknown) => void;
    selectedProfile: CreatorProfileType | any;
    setSelectedProfile: (profile: CreatorProfileType) => void;
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
    const [selectedData, setSelectedData] = useState<unknown>(null);
    const [selectedProfile, setSelectedProfile] = useState<unknown>(null);
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
        selectedProfile,
        setSelectedProfile,
        selectedProfileId,
        setSelectedProfileId
    }

    return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useDataContext = () => useContext(DataContext);