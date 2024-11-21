import { configureStore } from '@reduxjs/toolkit'
import MailUnreadCountReducer from '../helpers/slices/mailCountSlice'
import userReducer from '../helpers/slices/userSlice'
import generalReducer from '../helpers/slices/generalSlice'

export default configureStore({
    reducer: {
        mailCount: MailUnreadCountReducer,
        user: userReducer,
        general: generalReducer
    },
})