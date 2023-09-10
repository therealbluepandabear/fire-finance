import { PlanEngineInputs } from 'models/retirement-calculator'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MdPercent, MdPerson } from 'react-icons/md'
import { loadLocalStorage, updateRawInputs } from '../utils'
import InputWrapper from './InputWrapper'

export default function AdvancedInputs() {
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
                placeholder='Income Growth Rate'
                icon={<MdPercent />}
                register={register('incomeGrowthRate')}
            />

            <InputWrapper
                placeholder='Retirement Age'
                icon={<MdPerson />}
                register={register('retirementAge')}
            />

            <InputWrapper
                placeholder='Maximum Age'
                icon={<MdPerson />}
                register={register('maximumAge')}
            />
        </>
    )
}