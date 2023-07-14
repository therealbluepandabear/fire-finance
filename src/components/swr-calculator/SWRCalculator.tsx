import SWRCalculatorForm from './SWRCalculatorForm'
import { calculateChanceOfSuccess, CycleInfo, getCycleInfo, SWRCalculatorInputs, SWRCalculatorOutputs } from '../../models/swr-calculator'
import { useState } from 'react'
import SWRCalculatorResults from './SWRCalculatorResults'


export default function SWRCalculator() {
    const [outputs, setOutputs] = useState<SWRCalculatorOutputs | null>(null)
    const [cycleInfo, setCycleInfo] = useState<CycleInfo | null>(null)   

    async function submitHandler(inputs: SWRCalculatorInputs): Promise<void> {
        const outputs = await calculateChanceOfSuccess(inputs)
        setOutputs(outputs)

        const cycleInfo = getCycleInfo(outputs)
        setCycleInfo(cycleInfo)
    }

    return ( 
        <>
            {(cycleInfo && outputs) ? 
                <SWRCalculatorResults outputs={outputs} cycleInfo={cycleInfo} /> : 
                <SWRCalculatorForm onSubmit={submitHandler} />}
        </> 
    )
}