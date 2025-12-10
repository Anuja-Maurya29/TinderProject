import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState:{
    list:[]
  },
  reducers: {
    addConnection: (state, action) => {
      state.list=action.payload;
    },
    removeConnection: (state) => {
      state.list= [];
    },
  },
});

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;