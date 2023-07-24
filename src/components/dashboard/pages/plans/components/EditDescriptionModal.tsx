import { Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../../../../store'
import { plansActions } from '../../../../../store/plans-slice'
import SimpleModal from '../../../../ui/SimpleModal'
import { ModalProps } from '../index'

export default function EditDescriptionModal(props: ModalProps) {
    const dispatch = useAppDispatch()

    const planDescription = props.plan.description ?? ''

    const { register, watch } = useForm<{ description: string }>(
        { defaultValues: { description: planDescription } }
    )

    function OKClickHandler(): void {
        const description = watch('description')
        dispatch(plansActions.editPlan({ id: props.plan.id, partialState: { description: description } }))

        props.onClose()
    }

    return (
        <SimpleModal title='Edit Description' onOKClick={OKClickHandler} onClose={props.onClose}>
            <Input {...register('description', { required: true })} />
        </SimpleModal>
    )
}