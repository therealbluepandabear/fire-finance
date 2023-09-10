import FormInput from 'components/ui/FormInput'
import { PlanEngineInputs } from 'models/retirement-calculator'
import { UseFormRegisterReturn } from 'react-hook-form'
import { defaultTextualInput, globalOnInput, shouldShowDefaultValue } from '../utils'
import { cloneElement } from 'react'
import { accessNestedObject } from 'utils'

interface InputWrapperProps {
    placeholder: string
    icon: JSX.Element
    register: UseFormRegisterReturn
}

export default function InputWrapper(props: InputWrapperProps) {
    const shouldShowDefValue = shouldShowDefaultValue(props.register.name as keyof PlanEngineInputs)
    const defaultValue = shouldShowDefValue ? accessNestedObject(defaultTextualInput, props.register.name) : undefined

    return (
        <FormInput
            placeholder={props.placeholder}
            inputLeftElement={cloneElement(props.icon, { color: 'lightgray' })}
            type='number'
            onInput={globalOnInput}
            defaultValue={defaultValue}
            {...props.register}
        />
    )
}