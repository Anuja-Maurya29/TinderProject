import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/userSlice'
import feedReducer from '../features/feedSlice'
import requestReducer from "../features/requestSlice"
import connectionReducer from '../features/connectionSlice'

export const tinderStore = configureStore({
reducer:{
    user:userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: requestReducer,
},
})
