import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const userSlice=createSlice({
    name:'User',
    initialState:{
        userToken:Cookies.get('token') || null,
        users:null
    },
    reducers:{
        addUser : (state,action)=>{
            state.userToken = action.payload
        },
        addNewUser:(state,action)=>{
            state.users=action.payload
        }
    }
})
export const {addUser,addNewUser}=userSlice.actions
export default userSlice.reducer