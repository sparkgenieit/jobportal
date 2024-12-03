import { createSlice } from '@reduxjs/toolkit'

export const generalSlice = createSlice({
    name: 'general',
    initialState: {
        toaster: {},
        currentJob: {},
        isSidebarOpen: false,
        info: {},
        location: {}
    },
    reducers: {
        setToaster: (state, action) => {
            state.toaster = action.payload
        },
        setLocation: (state, action) => {
            state.location = action.payload
        },
        setInfo: (state, action) => {
            state.info = action.payload
        },
        setCurrentJob: (state, action) => {
            state.currentJob = action.payload
        },
        setIsSidebarOpen: (state, action) => {
            if (action.payload) {
                state.isSidebarOpen = action.payload
                return
            }
            state.isSidebarOpen = !state.isSidebarOpen
        },
    },
})


export const { setToaster, setCurrentJob, setIsSidebarOpen, setInfo, setLocation } = generalSlice.actions

export default generalSlice.reducer