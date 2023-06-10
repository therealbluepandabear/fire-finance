import { Flex } from '@chakra-ui/react'
import { useState } from 'react'
import RetirementCalculator from './components/retirement-calculator/RetirementCalculator'
import SWRCalculator from './components/swr-calculator/SWRCalculator';
import SignUp from './components/signup/SignUp'
import Dashboard from './components/dashboard/Dashboard'

interface Page {
    title: string
    content: () => JSX.Element
}

const pages: Page[] = [
    { title: 'Sign Up', content: () => SignUp() },
    { title: 'Retirement Calculator', content: () => RetirementCalculator() },
    { title: 'SWR Calculator', content: () => SWRCalculator() }
]

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const [pageIndex, setPageIndex] = useState(0)
    const currentPage = pages[pageIndex]

    const PageContent = currentPage.content

    return (
        <SignUp />
    )
}

export default App;
