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
    Filler, 
    Legend 
} from 'chart.js'
import { Line as LineChart } from 'react-chartjs-2'

export default function RetirementCalculatorChart(): JSX.Element {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
    )

    ChartJS.defaults.font.family = 'Noto Sans'
    ChartJS.defaults.font.size = 16

    const labels: number[] = []

    for (let i = 17; i < 85; ++i) {
        labels.push(i)
    }

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
                }
            }
        }
    }

    const lineChartData: ChartData<"line"> = {
        labels: labels,
        datasets: [
            {
                fill: true, // For Area effect
                data: labels.map((num) => num ** 2),
                backgroundColor: 'rgba(255, 165, 0, 0.2)'
            }
        ]
    }

    return (
        <LineChart data={lineChartData} options={lineChartOptions} />
    )
}