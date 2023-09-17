import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    loading: false,
    error: null
}
const token = window.localStorage.getItem('access-token') || null;
export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async (username, thunkAPI) => {
      try {
        const response = await fetch(
          `https://instagram.brightly-shining.cloud/api/v1/user?username=${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch user feed");
        }
  
        const data = await response.json();
        console.log(data)
        return data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  
  
  const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = null;
      });
      builder.addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      });
    },
  });
  
  export const userActions = userSlice.actions;
  
  export default userSlice.reducer;