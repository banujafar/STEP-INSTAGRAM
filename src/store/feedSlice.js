// feedSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedData: [],
  loading: false,
  error: null,
};



export const fetchUserFeed = createAsyncThunk(
  "feed/fetchUserFeed",
  async (token, thunkAPI) => {
    try {
      const response = await fetch(
        "https://instagram.brightly-shining.cloud/api/v1/user/feed",
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
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const followUser = createAsyncThunk(
  "feed/followUser",
  async (username, thunkAPI) => {
    try {
      const response = await fetch(
        `https://instagram.brightly-shining.cloud/api/v1/user/subscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to follow user");
      }

      return username;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "feed/unfollowUser",
  async (username,token, thunkAPI) => {
   try {

      const response = await fetch(
        `https://instagram.brightly-shining.cloud/api/v1/user/subscription?username=${username}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to unfollow user");
      }

      return username;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const feedSlice = createSlice({
  name: "feed",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserFeed.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserFeed.fulfilled, (state, action) => {
      state.loading = false;
      state.feedData = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUserFeed.rejected, (state, action) => {
      state.loading = false;
      state.feedData = [];
      state.error = action.payload;
    });
  },
});

export const feedActions = feedSlice.actions;

export default feedSlice.reducer;
