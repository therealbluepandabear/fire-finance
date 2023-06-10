import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
    id: number
    email: string
    password: string 
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api'
    }),
    endpoints: (builder) => ({
        createUser: builder.mutation<void, User>({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user
            })
        }),

        getUserById: builder.query<User, number>({
            query: (id) => `/users/${id}`
        })
    })
})

export const {
    useCreateUserMutation,
    useGetUserByIdQuery
} = userApi