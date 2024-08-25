import { createContext, useState } from "react";
import Toaster from "../components/Toaster";

export const JobsContext = createContext();


export const CurrentJobContext = createContext();


export const ToasterContext = createContext()


export function ToasterProvider({ children }) {
    const [showToaster, setShowToaster] = useState({})

    return (
        <ToasterContext.Provider value={{ showToaster, setShowToaster }}>
            {children}
            <Toaster message={showToaster} setMessage={setShowToaster} />
        </ToasterContext.Provider>
    )

}