import { Select } from '@chakra-ui/react'
import { PlanEngineInputs } from 'models/retirement-calculator'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MdAttachMoney, MdPercent } from 'react-icons/md'
import InputWrapper from './InputWrapper'
import { defaultTextualInput, globalSelectHandler, loadLocalStorage, updateRawInputs } from '../utils'
import { modifyNestedPath } from 'utils'
import SelectWrapper from './SelectWrapper'

export default function FinancialFactorsInputs() {
    const { register, setValue, watch } = useForm<Partial<PlanEngineInputs>>()

    const withdrawalStrategyType = watch('withdrawalStrategy.type') || defaultTextualInput.withdrawalStrategy.type

    useEffect(() => {
        loadLocalStorage(setValue)
    }, [])

    watch((inputs) => {
        updateRawInputs(inputs as Partial<PlanEngineInputs>)
    })

    return (
        <>
            <SelectWrapper register={register('withdrawalStrategy.type')}>
                <option value='DEFAULT'>Default</option>
                <option value='FIXED_PERCENTAGE'>Fixed Percentage</option>
                <option value='FIXED_DOLLAR'>Fixed Dollar</option>
            </SelectWrapper>

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
                    percentage={true}
                />
            )}

            <InputWrapper
                placeholder='Inflation Rate'
                icon={<MdPercent />}
                register={register('inflationRate')}
                percentage={true}
            />
        </>
    )
}