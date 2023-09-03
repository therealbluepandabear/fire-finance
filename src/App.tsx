import { useEffect, useState } from 'react'
import LoginPage from './components/root/pages/login'
import RootPage from './components/root/index'

function App() {
    const [userId, setUserId] = useState<string | null>(null)

    useEffect(() => {
        if (localStorage.getItem('loggedInUserId')) {
            setUserId(localStorage.getItem('loggedInUserId')!)
        } 
    }, [])

    function loginClickHandler(id: string): void {
        setUserId(id)
        localStorage.setItem('loggedInUserId', id)
    }

    localStorage.removeItem('AdvancedInputs')

    return (
        <>
            {userId ? <RootPage userId={userId} /> : <LoginPage onLogin={loginClickHandler} />}
        </>
    )
}

export default App;
