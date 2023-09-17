import { useAppDispatch } from '../../../../../store'
import { plansActions } from '../../../../../store/plans-slice'
import SimpleModal from '../../../../ui/SimpleModal'
import { Text } from '@chakra-ui/react'
import { ModalProps } from '../index'
import { useDeletePlanMutation } from '../../../../../api'

export default function DeletePlanModal(props: ModalProps) {
    const [deletePlan] = useDeletePlanMutation()

    async function OKClickHandler(): Promise<void> {
        await deletePlan(props.plan.id)

        props.onClose()
    }

    return (
        <SimpleModal title='Delete Plan' onOKClick={OKClickHandler} onClose={props.onClose}>
            <Text>{`Are you sure you want to delete ${props.plan.name}? This cannot be undone.`}</Text>
        </SimpleModal>
    )
}