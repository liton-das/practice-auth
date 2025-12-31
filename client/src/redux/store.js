import { configureStore } from "@reduxjs/toolkit";
import { addUser } from "./featurs/UserSlice";

const store = configureStore({
    reducer:{
        user:addUser
    }
})
export default store