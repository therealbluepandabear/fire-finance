import { Flex } from '@chakra-ui/react'
import Menu from './components/ui/Menu'
import MenuItem from './components/ui/MenuItem'
import { useState } from 'react'
import RetirementCalculator from './components/retirement-calculator/RetirementCalculator'
import SWRCalculator from './components/swr-calculator/SWRCalculator';
import PageHeader from './components/ui/AppBar'
import Home from './components/home/Home'
import SignUp from './components/signup/SignUp'

interface Page {
    title: string
    content: () => JSX.Element
}

const pages: Page[] = [
    { title: 'Home', content: () => Home() },
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
        <Flex width='100%'>
            {/* <Menu isOpen={isMenuOpen} onItemClick={(index) => {
                setPageIndex(index)
                setIsMenuOpen(false)
            }}>
                {pages.map(page => <MenuItem label={page.title} />)}
            </Menu>

            <Flex height='100vh' flexDirection='column' flexGrow={1}>
                <PageHeader
                    title={currentPage.title}
                    isMenuOpen={isMenuOpen}
                    onHamburgerClick={() => setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)}
                /> */}

                <Flex flexGrow={1}>
                    <SignUp />
                </Flex>
            {/* </Flex> */}
        </Flex>
    )
}

export default App;
