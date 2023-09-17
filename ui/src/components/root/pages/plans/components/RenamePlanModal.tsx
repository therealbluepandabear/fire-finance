import { Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { ModalProps } from '..'
import SimpleModal from '../../../../ui/SimpleModal'
import { usePatchPlanMutation } from '../../../../../api'

export default function RenamePlanModal(props: ModalProps) {
    const { register, watch } = useForm<{ inputValue: string }>(
        { defaultValues: { inputValue: props.plan.name } }
    )

    const [patchPlan] = usePatchPlanMutation()

    async function OKClickHandler(): Promise<void> {
        const newName = watch('inputValue')

        await patchPlan({ planId: props.plan.id, patch: { name: newName }})

        props.onClose()
    }

    return (
        <SimpleModal title='Rename' onOKClick={OKClickHandler} onClose={props.onClose}>
            <Input {...register('inputValue', { required: true })} />
        </SimpleModal>
    )
}