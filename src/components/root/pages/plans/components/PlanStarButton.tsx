import { IconButton } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { MdStarOutline, MdStar } from 'react-icons/md'
import { useAppDispatch } from '../../../../../store'
import { plansActions } from '../../../../../store/plans-slice'
import { NewPlan, usePatchPlanMutation } from '../../../../../api'

interface PlanStarButtonProps {
    plan: NewPlan
}

export default function PlanStarButton(props: PlanStarButtonProps) {
    const yetToStarIcon = <MdStarOutline color='#c5c5c5' size={25} />
    const hasStarredIcon = <MdStar color='#feba4f' size={25} />

    const [hasStarred, setHasStarred] = useState(props.plan.isStarred)

    const [patchPlan] = usePatchPlanMutation()

    async function starButtonClickHandler(hasStarred: boolean): Promise<void> {      
        await patchPlan({ planId: props.plan.id, patch: { isStarred: hasStarred } })
  
        setHasStarred(hasStarred)
    }

    return (
        <IconButton
            aria-label='Favorite'
            _hover={{ background: 'gray.100' }}
            _active={{ background: 'gray.200' }}
            icon={hasStarred ? hasStarredIcon : yetToStarIcon}
            onClick={(e) => {
                e.stopPropagation()
                
                starButtonClickHandler(!hasStarred)
            }}
            marginLeft='auto'
        />
    )
}