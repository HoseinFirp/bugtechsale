import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUsersFromServer = createAsyncThunk(
  "users/getUsersFromServer",
  async (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  
);

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},

  extraReducers:(builder)=>{
builder.addCase(getUsersFromServer.fulfilled, (state,action)=>{
    console.log(action)
    state.push(action.payload)
} )
  }
});

export default slice.reducer;
