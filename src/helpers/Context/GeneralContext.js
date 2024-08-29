import { useState } from "react"
import { GeneralContext } from "."
import Toaster from "../../components/Toaster"

export default function GeneralProvider({ children }) {
    const [showToaster, setShowToaster] = useState({})
    const [currentJob, setCurrentJob] = useState({})
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <GeneralContext.Provider value={{ showToaster, setShowToaster, currentJob, setCurrentJob, isSidebarOpen, setIsSidebarOpen }}>
            {children}
            <Toaster message={showToaster} setMessage={setShowToaster} />
        </GeneralContext.Provider>
    )
}