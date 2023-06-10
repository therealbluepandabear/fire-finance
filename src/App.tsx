import { useState } from 'react'
import { User } from './api'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/signin/SignIn'
import SignUp from './components/signup/SignUp'

function App() {
    const [user, setUser] = useState<User | null>(null)

    return (
        <>
            {/* {user ? <Dashboard user={user} /> : <SignUp onUserCreated={(user) => setUser(user)} />} */}
    
            <SignIn />
        </>
    )
}

export default App;
