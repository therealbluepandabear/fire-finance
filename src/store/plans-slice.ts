import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { generateId } from '../utils'
import { RetirementCalculatorInputs } from '../models/retirement-calculator'

export interface Goal {
    label: string
    icon: JSX.Element
    targetNetworth: number
}

export interface Plan {
    id: string
    name: string
    creationDate: string
    isFavorite: boolean
    description?: string
    inputs: RetirementCalculatorInputs
}

interface PlansState {
    plans: Plan[]
}

const initialPlansState: PlansState = {
    plans: [{ 
        id: '0', 
        name: 'Plan 1', 
        creationDate: '2023-07-16T08:08:02.872Z', 
        isFavorite: false, 
        description: 'ETC',
        inputs: {
            age: 20,
            annualIncome: 70_000,
            annualSpending: 30_000,

            retirementAge: 50,

            networth: 30_000,
            safeWithdrawalRate: 4,
            inflationRate: 0,

            stocksAllocationRate: 1,
            bondsAllocationRate: 0,
            cashAllocationRate: 0,

            stocksReturnRate: 0.07,
            bondsReturnRate: 0,
            cashReturnRate: 0,

            maximumAge: 100
        }
    }]
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
                const duplicatedPlan: Plan = { ...plan, name: `Duplicate of ${plan.name}`, id: generateId() }
                
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