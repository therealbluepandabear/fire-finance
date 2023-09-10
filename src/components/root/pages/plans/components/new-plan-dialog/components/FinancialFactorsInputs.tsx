import { Select } from '@chakra-ui/react'
import { PlanEngineInputs } from 'models/retirement-calculator'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MdAttachMoney, MdPercent } from 'react-icons/md'
import InputWrapper from './InputWrapper'
import { defaultTextualInput, loadLocalStorage, updateRawInputs } from '../utils'

export default function FinancialFactorsInputs() {
    const { register, setValue, watch, unregister } = useForm<Partial<PlanEngineInputs>>()

    const withdrawalStrategyType = watch('withdrawalStrategy.type') || defaultTextualInput.withdrawalStrategy.type

    useEffect(() => {
        loadLocalStorage(setValue)
    }, [])

    watch(inputs => {
        updateRawInputs(inputs as Partial<PlanEngineInputs>)
    })

    function selectChangeHandler(): void {
        // not the cleanest of code, but will do for now
        unregister('withdrawalStrategy.amount')
        unregister('withdrawalStrategy.safeWithdrawalRate')
    }

    return (
        <>
            <Select {...register('withdrawalStrategy.type', { onChange: selectChangeHandler })} defaultValue={defaultTextualInput.withdrawalStrategy.type}>
                <option value='DEFAULT'>Default</option>
                <option value='FIXED_PERCENTAGE'>Fixed Percentage</option>
                <option value='FIXED_DOLLAR'>Fixed Dollar</option>
            </Select>

            {(withdrawalStrategyType === 'FIXED_DOLLAR' || withdrawalStrategyType === 'FIXED_PERCENTAGE') && (
                <InputWrapper
                    placeholder='Amount'
                    icon={<MdAttachMoney />}
                    register={register('withdrawalStrategy.amount')}
                />
            )}

            {withdrawalStrategyType === 'DEFAULT' && (
                <InputWrapper
                    placeholder='Safe Withdrawal Rate'
                    icon={<MdPercent />}
                    register={register('withdrawalStrategy.safeWithdrawalRate')}
                />
            )}

            <InputWrapper
                placeholder='Inflation Rate'
                icon={<MdPercent />}
                register={register('inflationRate')}
            />
        </>
    )
}