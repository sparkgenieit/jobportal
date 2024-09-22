import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from '../http'

export const mailCountSlice = createSlice({
    name: 'mail',
    initialState: {
        AdminUnreadCount: 0,
        EmployerUnreadCount: 0
    },
    reducers: {
        setAdminUnreadCount: (state, action) => {
            state.AdminUnreadCount = action.payload
        },
        decrementAdminUnreadCount: (state) => {
            if (state.AdminUnreadCount > 0) state.AdminUnreadCount = state.AdminUnreadCount - 1
        },
        decrementEmployerUnreadCount: (state) => {
            if (state.EmployerUnreadCount > 0) state.EmployerUnreadCount = state.EmployerUnreadCount - 1

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployerUnreadCount.fulfilled, (state, action) => {
                state.EmployerUnreadCount = action.payload
            }).addCase(fetchEmployerUnreadCount.rejected, (state) => {
                state.EmployerUnreadCount = 0
            });
    }
})


export const fetchEmployerUnreadCount = createAsyncThunk(
    "mail/fetchEmployerUnreadCount",
    async () => {
        const { data } = await http.get('/mails/employer/unread-mails')
        return data
    }
)

export const { setAdminUnreadCount, decrementAdminUnreadCount, decrementEmployerUnreadCount } = mailCountSlice.actions

export default mailCountSlice.reducer