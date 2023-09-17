import { PlanEngineInputs } from 'models/retirement-calculator'
import { UseFormSetValue } from 'react-hook-form'
import { accessNestedObject, modifyNestedPath } from 'utils'

export const rawInputsKey = 'new_plan_inputs_raw'
export const formattedInputsKey = 'new_plan_inputs_formatted'

// IMPORTANT: Percentages are formatted differently as this is a textual input :)
export const defaultTextualInput: PlanEngineInputs = {
    age: 20,
    annualIncome: 70_000,
    annualSpending: 30_000,
    networth: 0,
    withdrawalStrategy: { type: 'DEFAULT', safeWithdrawalRate: 4 },
    inflationRate: 0,
    stocksAllocationRate: 100,
    bondsAllocationRate: 0,
    cashAllocationRate: 0,
    stocksReturnRate: 7,
    bondsReturnRate: 0,
    cashReturnRate: 0,
    maximumAge: 100,
    retirementAge: 70,
    incomeGrowthRate: 0
}

function updateLocalStorage(key: string, inputs: Partial<PlanEngineInputs>): void {
    let prevInputs: Partial<PlanEngineInputs> | null = null

    if (localStorage.getItem(key)) {
        prevInputs = JSON.parse(localStorage.getItem(key)!) as Partial<PlanEngineInputs>
    }

    localStorage.setItem(key, JSON.stringify({ ...prevInputs, ...inputs }))
}

function updateFormattedInputs(inputs: Partial<PlanEngineInputs>) {
    updateLocalStorage(formattedInputsKey, inputs)
}

export function updateRawInputs(inputs: Partial<PlanEngineInputs>): void {
    updateLocalStorage(rawInputsKey, inputs)
}

export function loadLocalStorage(reset: UseFormSetValue<Partial<PlanEngineInputs>>): void {
    if (localStorage.getItem(rawInputsKey)) {
        const item = JSON.parse(localStorage.getItem(rawInputsKey)!) as Partial<PlanEngineInputs>

        for (const key in item) {
            const asKey = key as keyof Partial<PlanEngineInputs>

            reset(asKey, item[asKey])
        }
    }
}

export function shouldShowDefaultValue(key: string): boolean {
    if (localStorage.getItem(rawInputsKey)) {
        return accessNestedObject(JSON.parse(localStorage.getItem(rawInputsKey)!) as Partial<PlanEngineInputs>, key) == accessNestedObject(defaultTextualInput, key)
    }

    return true
}

export function globalInputHandler(e: React.FormEvent<HTMLInputElement>, percentage: boolean = false): void {
    let newValue = parseInt(e.currentTarget.value)

    if (percentage) {
        newValue /= 100
    }

    updateFormattedInputs({ [e.currentTarget.name]: newValue })
}

export function globalSelectHandler(e: React.ChangeEvent<HTMLSelectElement>): void {
    updateFormattedInputs({ [e.currentTarget.name]: e.currentTarget.value })
}