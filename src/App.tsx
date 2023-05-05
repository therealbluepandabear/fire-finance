import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import RetirementCalculator from './components/retirement-calculator/RetirementCalculator'
import SWRCalculator from './components/swr-calculator/SWRCalculator';
import AppBar from './components/ui/AppBar'

function App() {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0)

    function itemClickHandler(itemIndex: number): void {
        setSelectedItemIndex(itemIndex)
    }

    return (
        <Flex flexDirection="column" height="100vh">
            <AppBar selectedItemIndex={selectedItemIndex} onItemClick={itemClickHandler} />

            {selectedItemIndex === 0 && (
                <RetirementCalculator />
            )}

            {selectedItemIndex === 1 && (
                <SWRCalculator />
            )}
        </Flex>
    )
}

export default App;
