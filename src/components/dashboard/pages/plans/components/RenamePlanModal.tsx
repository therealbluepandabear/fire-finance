import { Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { ModalProps } from '..'
import { useAppDispatch } from '../../../../../store'
import { plansActions } from '../../../../../store/plans-slice'
import SimpleModal from '../../../../ui/SimpleModal'

export default function RenamePlanModal(props: ModalProps) {
    const dispatch = useAppDispatch()

    const { register, watch } = useForm<{ inputValue: string }>(
        { defaultValues: { inputValue: props.plan.name } }
    )

    function OKClickHandler(): void {
        const newName = watch('inputValue')
        dispatch(plansActions.renamePlan({ id: props.plan.id, newName: newName }))

        props.onClose()
    }

    return (
        <SimpleModal title='Rename' onOKClick={OKClickHandler} onClose={props.onClose}>
            <Input {...register('inputValue', { required: true })} />
        </SimpleModal>
    )
}