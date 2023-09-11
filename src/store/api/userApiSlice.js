import { apiSlice } from "./apiSlice";
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCurrentUser: builder.query({
            query: (username) => `/user?username=${username}`
        }),
        subscribe: builder.mutation({
            query: ({ username }) => ({
              url: "/user/subscription",
              method: "POST",
              body: { username },
            }),
          }),
          unsubcribe:builder.mutation({
            query:({username})=>({
              url:`/user/subscription?username=${username}`,
              method:'DELETE'
      
            })
    })
})
})


export const {useGetCurrentUserQuery,useSubscribeMutation,useUnsubcribeMutation} = userApiSlice