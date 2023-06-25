import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Plan } from '../components/dashboard/pages/Plans'

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
            const plan = state.plans.find(plan => plan.id === action.payload.id)

            if (plan) {
                state.plans = state.plans.filter(plan => plan.id !== action.payload.id)

                const newPlan: Plan = { ...plan, name: action.payload.newName }

                state.plans.push(newPlan)
            }
        },

        duplicatePlan(state, action: PayloadAction<string>) {
            const plan = state.plans.find(plan => plan.id === action.payload)
            
            if (plan) {
                const duplicatedPlan = { ...plan, name: `Duplicate of ${plan.name}` }
                
                state.plans.push(duplicatedPlan)
            }
        }
    }
})

export const plansActions = plansSlice.actions
export default plansSlice.reducer