import { PlanEngineInputs } from 'models/retirement-calculator'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MdPercent } from 'react-icons/md'
import { loadLocalStorage, updateRawInputs } from '../utils'
import InputWrapper from './InputWrapper'

export default function AssetAllocationRateInputs() {
    const { register, setValue, watch } = useForm<Partial<PlanEngineInputs>>()

    useEffect(() => {
        loadLocalStorage(setValue)
    }, [])

    watch(inputs => {
        updateRawInputs(inputs as Partial<PlanEngineInputs>)
    })

    return (
        <>
            <InputWrapper
                placeholder='Stocks Allocation Rate'
                icon={<MdPercent />}
                register={register('stocksAllocationRate')}
            />

            <InputWrapper
                placeholder='Bonds Allocation Rate'
                icon={<MdPercent />}
                register={register('bondsAllocationRate')}
            />

            <InputWrapper
                placeholder='Cash Allocation Rate'
                icon={<MdPercent />}
                register={register('cashAllocationRate')}
            />
        </>
    )
}