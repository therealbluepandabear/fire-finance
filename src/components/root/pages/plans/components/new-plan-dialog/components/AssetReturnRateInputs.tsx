import { PlanEngineInputs } from 'models/retirement-calculator'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MdPercent } from 'react-icons/md'
import { loadLocalStorage, updateRawInputs } from '../utils'
import InputWrapper from './InputWrapper'

export default function AssetReturnRateInputs() {
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
                placeholder='Stocks Return Rate'
                icon={<MdPercent />}
                register={register('stocksReturnRate')}
            />

            <InputWrapper
                placeholder='Bonds Return Rate'
                icon={<MdPercent />}
                register={register('bondsReturnRate')}
            />

            <InputWrapper
                placeholder='Cash Return Rate'
                icon={<MdPercent />}
                register={register('cashReturnRate')}
            />
        </>
    )
}