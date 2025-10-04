import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        isAuthChecked: false,
        suggestedUsers:null,
        profileData:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload;
            state.isAuthChecked = true;
        },
        setSuggestedUsers:(state,action)=>{
            state.suggestedUsers=action.payload;
            
        },
        setProfileData: (state, action) => {
      state.profileData = action.payload; 
        },
         updateSavedPosts: (state, action) => {
      if (state.userData) {
        state.userData.saved = action.payload;
      }
    }

    }
    
})
export const {setUserData, setSuggestedUsers,setProfileData, updateSavedPosts}=userSlice.actions
export default userSlice.reducer