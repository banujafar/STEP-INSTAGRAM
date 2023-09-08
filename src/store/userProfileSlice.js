import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
  loading: false,
  error: null,
};

const token = "ec8bd96c25fb46319cdf49779182333c";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (username) => {
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
        throw new Error(`${username} is not found`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.userInfo = [];
      state.error = action.error.message;
    });
  },
});

export const userProfileActions = userProfileSlice.actions;

export default userProfileSlice.reducer;
