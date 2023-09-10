import { apiSlice } from "./apiSlice";
export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentPost: builder.query({
      query: (postId) => `/post?postId=${postId}`,
    }),
  }),
});

export const { useGetCurrentPostQuery } = postApiSlice;
