import { Flex } from '@chakra-ui/react'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
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
    onInputsChange: (data: Partial<PlanEngineInputs>, errors: FieldErrors<Partial<PlanEngineInputs>>) => void
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

    const { control, watch, formState: { errors } } = useForm<Partial<PlanEngineInputs>>({
        defaultValues: defaultValues,
        mode: 'onChange'
    })

    useEffect(() => {
        props.onInputsChange(adjustPercentageInputs(defaultValues, props.inputModels), errors)
    }, [])

    watch(inputs => {
        props.onInputsChange(adjustPercentageInputs(inputs, props.inputModels), errors)
    })

    return (
        <Flex marginTop='16px' gap='16px' flexDirection='column'>
            {props.inputModels.map(inputModel => (
                <Controller
                    key={inputModel.key}
                    name={inputModel.key}
                    control={control}
                    rules={{ required: 'Please enter a value' }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <FormInput
                            placeholder={inputModel.placeholder}
                            inputLeftElement={inputModel.icon}
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={onBlur}
                            value={value}
                            type='number'
                            isInvalid={error !== undefined}
                            errorText={error?.message}
                        />
                    )}
                />
            ))}
        </Flex>
    )
}