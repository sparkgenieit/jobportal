import { createSlice } from '@reduxjs/toolkit'

export const mailCountSlice = createSlice({
    name: 'mailCountSlice',
    initialState: {
        AdminUnreadCount: 0,
        EmployerUnreadCount: 0
    },
    reducers: {
        setAdminUnreadCount: (state, action) => {
            state.AdminUnreadCount = action.payload
        },
        setEmployerUnreadCount: (state, action) => {
            state.EmployerUnreadCount = action.payload
        },
        decrementAdminUnreadCount: (state) => {
            state.AdminUnreadCount = state.AdminUnreadCount - 1
        },
        decrementEmployerUnreadCount: (state) => {
            state.EmployerUnreadCount = state.EmployerUnreadCount - 1
        },
    },
})

export const { setAdminUnreadCount, setEmployerUnreadCount, decrementAdminUnreadCount, decrementEmployerUnreadCount } = mailCountSlice.actions

export default mailCountSlice.reducer