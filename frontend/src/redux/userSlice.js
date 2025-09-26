import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        isAuthChecked: false,
        suggestedUsers:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload;
            state.isAuthChecked = true;
        },
        setSuggestedUsers:(state,action)=>{
            state.suggestedUsers=action.payload;
            
        }
    }
    
})
export const {setUserData, setSuggestedUsers}=userSlice.actions
export default userSlice.reducer