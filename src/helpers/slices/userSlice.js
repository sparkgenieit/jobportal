import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from '../http'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {
            role: localStorage.getItem('role'),
            _id: localStorage.getItem("user_id")
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.currentUser = action.payload
            }).addCase(fetchUser.rejected, () => {
                localStorage.clear()
            })
    }

})

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async () => {
        const { data } = await http.get('/users/user')
        localStorage.setItem("fullname", data.first_name + " " + data.last_name)
        return data
    }
)

export const { setUser } = userSlice.actions

export default userSlice.reducer