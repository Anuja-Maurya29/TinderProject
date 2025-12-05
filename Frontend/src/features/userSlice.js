import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        isLoogedIn:false,
        userProfile:{}
    },
    reducers:{
        addUser:(state,action)=>{
            state.userData= action.payload;
            
        },
      
        addProfile:(state,action)=>{
            state.userProfile=action.payload
        },
        removeUser:(state)=>{
            state.userData=null;

        }
    }

})

export const {addUser,addProfile,removeUser}= userSlice.actions;
export default userSlice.reducer;