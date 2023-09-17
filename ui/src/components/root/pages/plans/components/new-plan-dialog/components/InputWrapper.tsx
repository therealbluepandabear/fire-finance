import FormInput from 'components/ui/FormInput'
import { PlanEngineInputs } from 'models/retirement-calculator'
import { UseFormRegisterReturn } from 'react-hook-form'
import { defaultTextualInput, globalInputHandler, shouldShowDefaultValue } from '../utils'
import { cloneElement } from 'react'
import { accessNestedObject } from 'utils'

interface InputWrapperProps {
    placeholder: string
    icon: JSX.Element
    register: UseFormRegisterReturn
    percentage?: boolean
}

export default function InputWrapper(props: InputWrapperProps) {
    const shouldShowDefValue = shouldShowDefaultValue(props.register.name)
    const defaultValue = shouldShowDefValue ? String(accessNestedObject(defaultTextualInput, props.register.name)) : undefined

    return (
        <FormInput
            placeholder={props.placeholder}
            inputLeftElement={cloneElement(props.icon, { color: 'lightgray' })}
            type='number'
            onInput={(e) => globalInputHandler(e, props.percentage)}
            defaultValue={defaultValue}
            {...props.register}
        />
    )
}