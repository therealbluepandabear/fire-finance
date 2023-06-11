import { User } from './api'
import Dashboard from './components/dashboard/Dashboard'

function App() {
    const user: User = { id: 0, email: 'todoescode@gmail.com', password: 'DFA25013' }

    return (
        <Dashboard user={user} />
    )
}

export default App;
