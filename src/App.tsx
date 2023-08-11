import { useState } from 'react'
import { User } from './api'
import LoginPage from './components/dashboard/pages/login'
import Dashboard from './components/dashboard/Dashboard'

function App() {
    const [user, setUser] = useState<User | null>(null)

    return (
        <>
            {/* {user ? <Dashboard user={user} /> : <LoginPage onLogin={(user) => setUser(user)} />} */}
            <Dashboard user={{ id: 0, email: 'todoescode@gmail.com', password: 'DFA25013' }} />
        </>
    )
}

export default App;
