// userSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
  loading: false,
  error: null,
};

const token = window.localStorage.getItem('access-token') || null;

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        "https://your-api-endpoint-for-all-users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch all users");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const allUsersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.userData = [];
      state.error = action.payload;
    });
  },
});

export const userActions = allUsersSlice.actions;

export default allUsersSlice.reducer;
