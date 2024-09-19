import { configureStore } from '@reduxjs/toolkit'
import MailUnreadCountReducer from '../helpers/slices/mailCountSlice'

export default configureStore({
    reducer: {
        mailCount: MailUnreadCountReducer,
    },
})