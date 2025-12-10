import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState:{
    list:[]
  },
  reducers: {
    addRequests: (state, action) => {
      state.list= action.payload;
    },
    removeRequest: (state, action) => {
      state.list = state.filter((r) => r._id !== action.payload);
      
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;