import Dashboard from './components/dashboard/Dashboard'
import RetirementCalculator from './components/retirement-calculator/RetirementCalculator'

function App() {
    return (
        <Dashboard user={ { id: 0, email: 'todoescode@gmail.com', password: 'DFA2532423' } } />
        // <RetirementCalculator />
    )
}

export default App;
