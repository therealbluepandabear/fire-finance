import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { generatePlanId } from '../utils'

export interface Plan {
    id: string
    name: string
    creationDate: string
    isFavorite: boolean
    description?: string
}

interface PlansState {
    plans: Plan[]
}

const initialPlansState: PlansState = {
    plans: []
}

const plansSlice = createSlice({
    name: 'plans',
    initialState: initialPlansState,
    reducers: {
        addPlan(state, action: PayloadAction<Plan>) {
            state.plans.push(action.payload)
        },

        removePlan(state, action: PayloadAction<string>) {
            state.plans = state.plans.filter(plan => plan.id !== action.payload)
        },

        renamePlan(state, action: PayloadAction<{ id: string, newName: string }>) {
            const index = state.plans.findIndex(plan => plan.id === action.payload.id)

            if (index !== -1) {
                state.plans[index].name = action.payload.newName
            }
        },

        duplicatePlan(state, action: PayloadAction<string>) {
            const index = state.plans.findIndex(plan => plan.id === action.payload)
            
            if (index !== -1) {
                const plan = state.plans[index]
                const duplicatedPlan: Plan = { ...plan, name: `Duplicate of ${plan.name}`, id: generatePlanId() }
                
                state.plans.push(duplicatedPlan)
            }
        },
        
        editPlan(state, action: PayloadAction<{ id: string, partialState: Partial<Plan> }>) {
            const index = state.plans.findIndex(plan => plan.id === action.payload.id)

            if (index !== -1) {
                const plan = state.plans[index]
                const partialPlan = action.payload.partialState

                state.plans[index] = { ...plan, ...partialPlan }
            }
        }
    }
})

export const plansActions = plansSlice.actions
export default plansSlice.reducer