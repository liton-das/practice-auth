import { configureStore } from "@reduxjs/toolkit";
import User from "./featurs/UserSlice"
const store = configureStore({
    reducer:{
        user:User
    }
})
export default store