import { Flex } from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { PlanEngine, PlanEngineInputs } from '../../../../../../models/retirement-calculator'
import FormInput from '../../../../../ui/FormInput'
import { useEffect } from 'react'

export interface InputModel {
    key: keyof PlanEngineInputs
    placeholder: string
    defaultValue: string
    inputType?: 'number' | 'percentage'
    icon: JSX.Element
}

interface StepPageProps {
    inputModels: InputModel[]
    onInputsChange: (data: Partial<PlanEngineInputs>) => void
}

function adjustPercentageInputs(inputs: Partial<PlanEngineInputs>, inputModels: InputModel[]): Partial<PlanEngineInputs> { 
    const modifiedInputs = { ...inputs }

    for (const inputModel of inputModels) {
        if (inputModel.inputType === 'percentage') {
            modifiedInputs[inputModel.key] = modifiedInputs[inputModel.key]! / 100
        }
    }

    return modifiedInputs
}

export default function StepPage(props: StepPageProps) {
    const defaultValues: Partial<PlanEngineInputs> = Object.fromEntries(props.inputModels.map((inputModel) => [inputModel.key, inputModel.defaultValue]))

    const { control, watch } = useForm<Partial<PlanEngineInputs>>({
        defaultValues: defaultValues
    })

    useEffect(() => {
        props.onInputsChange(adjustPercentageInputs(defaultValues, props.inputModels))
    }, [])

    watch(inputs => {
        props.onInputsChange(adjustPercentageInputs(inputs, props.inputModels))
    })

    return (
        <Flex marginTop='16px' gap='16px' flexDirection='column'>
            {props.inputModels.map(inputModel => (
                <Controller
                    key={inputModel.key}
                    name={inputModel.key}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormInput
                            placeholder={inputModel.placeholder}
                            inputLeftElement={inputModel.icon}
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            value={value}
                            type='number'
                        />
                    )}
                />
            ))}
        </Flex>
    )
}