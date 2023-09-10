import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "../../store/authSlice"
import toast from "react-hot-toast"

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://instagram.brightly-shining.cloud/api/v1',
    credentials: 'omit',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})


const baseQueryWithJWT = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)


    if (result?.error?.status === 401) {
        toast.error("Session is expired")
        api.dispatch(logOut())
    } else if (result?.error?.status === 400) {
        toast.error(result.error.data.detail)
        api.dispatch(logOut())
    }
 

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithJWT,
    endpoints: (builder) => ({})
})