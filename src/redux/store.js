import { configureStore } from '@reduxjs/toolkit'
import MailUnreadCountReducer from '../helpers/slices/mailCountSlice'
import userReducer from '../helpers/slices/userSlice'

export default configureStore({
    reducer: {
        mailCount: MailUnreadCountReducer,
        user: userReducer,
    },
})