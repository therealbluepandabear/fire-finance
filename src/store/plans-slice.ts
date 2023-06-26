import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Plan } from '../components/dashboard/pages/Plans'
import { generatePlanId } from '../utils'

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
            const plan = state.plans.find(plan => plan.id === action.payload)
            
            if (plan) {
                const duplicatedPlan: Plan = { ...plan, name: `Duplicate of ${plan.name}`, id: generatePlanId() }
                
                state.plans.push(duplicatedPlan)
            }
        },

        addPlanDescription(state, action: PayloadAction<{ id: string, description: string }>) {
            const index = state.plans.findIndex(plan => plan.id === action.payload.id)

            if (index !== -1) {
                state.plans[index].description = action.payload.description
            }
        }
    }
})

export const plansActions = plansSlice.actions
export default plansSlice.reducer