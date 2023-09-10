import { apiSlice } from "./apiSlice";
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCurrentUser: builder.query({
            query: (username) => `/user?username=${username}`
        })
    })
})


export const {useGetCurrentUserQuery} = userApiSlice