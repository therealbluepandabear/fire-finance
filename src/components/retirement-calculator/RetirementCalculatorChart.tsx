import { 
    Chart as ChartJS, 
    ChartData, 
    ChartOptions, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Filler
} from 'chart.js'
import { Line as LineChart } from 'react-chartjs-2'
import { range } from '../../utils'
import { calculateRetirementAge, RetirementCalculatorInputs } from '../../models/Calculator'

interface RetirementCalculatorChartProps {
    age: number,
    networth: number
}

export default function RetirementCalculatorChart(props: RetirementCalculatorChartProps): JSX.Element {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler
    )

    ChartJS.defaults.font.family = 'Noto Sans'

    const lineChartOptions: ChartOptions<"line"> = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Age"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Networth"
                },
                ticks: {
                    callback: function(value: string | number): string {
                        return '$' + value;
                    }
                }
            }
        },
        interaction: {
            mode: 'x',
            intersect: false
        }

    }

    const labels = range(0, 100)

    const lineChartData: ChartData<"line"> = {
        labels: labels,
        datasets: [
            {
                fill: true, // For Area effect
                data: calculateRetirementAge({} as RetirementCalculatorInputs),
                backgroundColor: 'rgba(255, 165, 0, 0.2)',
                pointRadius: 0
            }
        ]
    }

    return (
        <LineChart data={lineChartData} options={lineChartOptions} />
    )
}