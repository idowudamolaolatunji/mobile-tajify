import React, { createContext, useState, useEffect, useContext } from "react";


//////////////////////////////////////////////
//// CREATING CONTEXT ////
//////////////////////////////////////////////
interface DataContextType {
    imageView: string;
    handleChangeImageView: (view: string) => void;
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
    const [imageView, setImageView] = useState("double") // single | double

    const handleChangeImageView = function(view: string) {
        setImageView(view)
    }

   
    // CREATE CONTEXT DATA
    let contextData: DataContextType = {
        imageView,
        handleChangeImageView
    }

    return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
}


//////////////////////////////////////////////
//// CREATING HOOK AND EXPORTING ////
//////////////////////////////////////////////
export const useDataContext = () => useContext(DataContext);