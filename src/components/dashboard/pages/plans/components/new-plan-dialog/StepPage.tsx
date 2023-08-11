import { Flex } from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { PlanEngineInputs } from '../../../../../../models/retirement-calculator'
import FormInput from '../../../../../ui/FormInput'

export interface InputModel {
    key: keyof PlanEngineInputs
    placeholder: string
    defaultValue: string
    icon: JSX.Element
}

interface StepPageProps {
    inputs: InputModel[]
    onInputsChange: (data: Partial<PlanEngineInputs>) => void
}

export default function StepPage(props: StepPageProps) {
    const { control, watch } = useForm<Partial<PlanEngineInputs>>({
        defaultValues: Object.fromEntries(
            props.inputs.map((inputModel) => [inputModel.key, inputModel.defaultValue])
        )
    })

    watch(inputs => {
        props.onInputsChange(inputs)
    })

    return (
        <Flex marginTop='16px' gap='16px' flexDirection='column'>
            {props.inputs.map(inputModel => (
                <Controller
                    key={inputModel.key}
                    name={inputModel.key}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormInput
                            placeholder={inputModel.placeholder}
                            inputLeftElement={inputModel.icon}
                            onChange={(e) => onChange(parseInt(e.target.value))}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />
            ))}
        </Flex>
    )
}