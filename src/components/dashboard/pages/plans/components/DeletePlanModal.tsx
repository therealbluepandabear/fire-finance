import { useAppDispatch } from '../../../../../store'
import { plansActions } from '../../../../../store/plans-slice'
import SimpleModal from '../../../../ui/SimpleModal'
import { Text } from '@chakra-ui/react'
import { ModalProps } from '../index'

export default function DeletePlanModal(props: ModalProps) {
    const dispatch = useAppDispatch()

    function OKClickHandler(): void {
        dispatch(plansActions.removePlan(props.plan.id))

        props.onClose()
    }

    return (
        <SimpleModal title='Delete Plan' onOKClick={OKClickHandler} onClose={props.onClose}>
            <Text>{`Are you sure you want to delete ${props.plan.name}? This cannot be undone.`}</Text>
        </SimpleModal>
    )
}