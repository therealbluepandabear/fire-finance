import { PlanEngineInputs } from 'models/retirement-calculator'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MdPerson, MdAttachMoney } from 'react-icons/md'
import InputWrapper from './InputWrapper'
import { loadLocalStorage, updateRawInputs } from '../utils'

export default function BasicInfoInputs() {
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
                placeholder='Age'
                icon={<MdPerson />}
                register={register('age')}
            />

            <InputWrapper
                placeholder='Annual Income'
                icon={<MdAttachMoney />}
                register={register('annualIncome')}
            />

            <InputWrapper
                placeholder='Annual Spending'
                icon={<MdAttachMoney />}
                register={register('annualSpending')}
            />

            <InputWrapper
                placeholder='Networth'
                icon={<MdAttachMoney />}
                register={register('networth')}
            />
        </>
    )
}