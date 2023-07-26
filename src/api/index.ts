import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Plan } from '../store/plans-slice'

export interface User {
    id: number
    email: string
    password: string 
}

export interface UserLoginCredentials {
    email: string
    password: string
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/users'
    }),
    endpoints: (builder) => ({
        createUser: builder.mutation<void, User>({
            query: (user) => ({
                url: '/',
                method: 'POST',
                body: user
            })
        }),

        getUserById: builder.query<User, number>({
            query: (id) => `/${id}`
        }),

        loginUser: builder.mutation<User, UserLoginCredentials>({
            query: ({ email, password }) => ({
                url: `/login?email=${email}&password=${password}`,
                method: 'POST'
            })
        }),

        addPlanToUser: builder.mutation<void, { id: string, plan: Plan }>({
            query: ({ id, plan }) => ({
                url: `/${id}/plans`,
                method: 'POST',
                body: plan
            })
        })
    })
})

export const {
    useCreateUserMutation,
    useGetUserByIdQuery,
    useLoginUserMutation
} = userApi