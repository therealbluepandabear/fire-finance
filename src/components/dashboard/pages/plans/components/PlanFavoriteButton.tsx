import { IconButton } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { MdStarOutline, MdStar } from 'react-icons/md'
import { useAppDispatch } from '../../../../../store'
import { Plan, plansActions } from '../../../../../store/plans-slice'

interface PlanFavoriteButtonProps {
    plan: Plan
}

export default function PlanFavoriteButton(props: PlanFavoriteButtonProps) {
    const dispatch = useAppDispatch()

    const yetToFavoriteIcon = <MdStarOutline color='#c5c5c5' size={25} />
    const hasFavoritedIcon = <MdStar color='#feba4f' size={25} />

    const [hasFavorited, setHasFavorited] = useState(props.plan.isFavorite)

    useEffect(() => {
        dispatch(plansActions.editPlan(
            { id: props.plan.id, partialState: { isFavorite: hasFavorited } }
        ))
    }, [hasFavorited])

    function favoriteButtonClickHandler(): void {
        setHasFavorited(prevHasFavorited => !prevHasFavorited)
    }

    return (
        <IconButton
            aria-label='Favorite'
            _hover={{ background: 'gray.100' }}
            _active={{ background: 'gray.200' }}
            icon={hasFavorited ? hasFavoritedIcon : yetToFavoriteIcon}
            onClick={favoriteButtonClickHandler}
            marginLeft='auto'
        />
    )
}