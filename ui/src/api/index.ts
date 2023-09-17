import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PlanEngineInputs, Scenario } from 'models/retirement-calculator'

export interface User {
    id: string
    email: string
    password: string 
}

export interface UserLoginCredentials {
    email: string
    password: string
}

export interface NewPlan {
    id: string
    name: string
    inputs: PlanEngineInputs
    creationDate: string
    isStarred: boolean
    scenarios: Scenario[]
}

export type PlanRequest = Omit<NewPlan, 'id'>

export const api = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.1.107:8080/api'
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
        }),

        loginUser: builder.mutation<User, UserLoginCredentials>({
            query: ({ email, password }) => ({
                url: `/users/login?email=${email}&password=${password}`,
                method: 'POST'
            })
        }),

        addPlanToUser: builder.mutation<void, { id: string, plan: PlanRequest }>({
            query: ({ id, plan }) => ({
                url: `/users/${id}/plans`,
                method: 'POST',
                body: plan
            })
        }),

        getPlansOfUser: builder.query<NewPlan[], { userId: string, isStarred: boolean }>({
            query: ({ userId, isStarred }) => ({
                url: `/users/${userId}/plans`,
                headers: { 'Filter-Starred': isStarred.toString() }
            })
        }),

        deletePlan: builder.mutation<void, string>({
            query: (planId) => ({
                url: `/plans/${planId}`,
                method: 'DELETE'
            })
        }),

        patchPlan: builder.mutation<void, { planId: string, patch: Partial<PlanRequest> }>({
            query: ({ planId, patch }) => ({
                url: `/plans/${planId}`,
                method: 'PATCH',
                body: patch
            })
        }),

        addScenarioToPlan: builder.mutation<void, { planId: string, scenario: Scenario }>({
            query: ({ planId, scenario }) => ({
                url: `/plans/${planId}/scenarios`,
                method: 'POST',
                body: scenario
            })
        }),
        
        getScenarios: builder.query<Scenario[], string>({
            query: (planId) => `/plans/${planId}/scenarios`
        })
    })
})

export const {
    useCreateUserMutation,
    useGetUserByIdQuery,
    useLoginUserMutation,
    useAddPlanToUserMutation,
    useGetPlansOfUserQuery,
    useDeletePlanMutation,
    usePatchPlanMutation,
    useAddScenarioToPlanMutation,
    useGetScenariosQuery
} = api