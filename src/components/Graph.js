import { useEffect, useState } from "react"
// eslint-disable-next-line
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from "chart.js/auto"
import { Line } from "react-chartjs-2"
import hourMinute from "../helpers/hour-minute"

export default function Graph() {
	const [data, setData] = useState({ labels: [], datasets: [{ data: [0] }] })
	const [start] = useState(new Date(new Date() - (60 * 60 * 1000)).valueOf())
	const [end] = useState(new Date().valueOf())

	const options = {
		plugins: {
			legend: {
				display: false
			}
		},
		scales: {
			y: {
				min: 0,
				max: 70
			},
			x: {
				grid: {
					display: false
				}
			}
		}
	}

	useEffect(function () {
		const space = "d61f0d7e-08b4-5b3a-9477-906fe4b11663"

		fetch(`/.netlify/functions/get-records?space=${space}&start=${start}&end=${end}`)
			.then(res => res.json())
			.then(results => setData({
				labels: results.map(record => hourMinute(record._id.time)),
				datasets: [
					{
						label: "Visitors",
						borderColor: "rgb(73,150,81)",
						borderWidth: 1,
						backgroundColor: "rgba(73,150,81,0.4)",
						data: results.map(record => record.numberOfVisitors),
						tension: 0.3,
						pointRadius: 1,
						fill: true
					}
				]
			}))
	}, [start, end])

	return (
		<div className="col-start-4 col-end-13 bg-white shadow-sm p-3">
			<Line data={data} options={options} style={{ maxHeight: "50vh" }} />
		</div>
	)
}
