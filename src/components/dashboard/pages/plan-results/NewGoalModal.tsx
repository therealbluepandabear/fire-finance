import { Flex, Button, Grid } from '@chakra-ui/react'
import { useState } from 'react'
import * as Icons from 'react-icons/md'
import FormInput from '../../../ui/FormInput'
import FScrollableBox from '../../../ui/ScrollableBox'
import SimpleModal from '../../../ui/SimpleModal'

interface NewGoalModalProps {
    onClose: () => void
}

export default function NewGoalModal(props: NewGoalModalProps) {
    const [showIconSelector, setShowIconSelector] = useState(false)
    const [selectedIcon, setSelectedIcon] = useState<JSX.Element | null>(null)

    function pickIconClickHandler(): void {
        setShowIconSelector(true)
    }

    function iconClickHandler(icon: JSX.Element): void {
        setSelectedIcon(icon)
    }

    function OKClickHandler(): void {
        props.onClose()
    }

    return (
        <SimpleModal title='New Goal' onOKClick={OKClickHandler} onClose={props.onClose}>
            <Flex marginTop='16px' gap='16px' flexDirection='column'>
                {[
                    { placeholder: 'Name', inputLeftElement: <Icons.MdFace color='lightgray' /> },
                    { placeholder: 'Target Networth', inputLeftElement: <Icons.MdAttachMoney color='lightgray' /> },
                ].map(element => (
                    <FormInput
                        placeholder={element.placeholder} inputLeftElement={element.inputLeftElement}
                    />
                ))}

                <Button
                    border='1px solid'
                    borderColor='buttonPrimary'
                    color='buttonPrimary'
                    fontFamily='Manrope'
                    leftIcon={selectedIcon ?? <Icons.MdOutlineAddReaction />}
                    onClick={pickIconClickHandler}
                >
                    Pick Icon
                </Button>

                {showIconSelector && (
                    <FScrollableBox overflowY='scroll' height='300px'>
                        <Grid width='100%' templateColumns='repeat(8, 1fr)'>
                            {Object.keys(Icons).map(iconName => {
                                const Icon = (Icons as any)[iconName]

                                return (
                                    <Flex
                                        key={iconName}
                                        _hover={{ background: 'gray.100' }}
                                        _active={{ background: 'gray.200' }}
                                        borderRadius='md'
                                        alignItems='center'
                                        justifyContent='center'
                                        paddingTop='12px'
                                        paddingBottom='12px'
                                        cursor='pointer'
                                        onClick={() => iconClickHandler(Icon)}
                                    >
                                        <Icon size={22} />
                                    </Flex>
                                )
                            })}
                        </Grid>
                    </FScrollableBox>
                )}
            </Flex>
        </SimpleModal>
    )
}
