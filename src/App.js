import { useEffect, useState } from "react"
import Chart from "chart.js/auto"
import { Bar } from "react-chartjs-2"
import hourMinute from "./helpers/hour-minute"

function App() {
	const [data, setData] = useState({labels: [], datasets: []})

	useEffect(function() {
		fetch("/.netlify/functions/get-records?space=242-2424-23424")
			.then(res => res.json())
			.then(results => setData({
				labels: results.map(record => hourMinute(record._id.time)),
				datasets: [
					{
						label: "Visitors",
						data: results.map(record => record.numberOfVisitors),
						tension: 0.5
					}
				]
			}))
	}, [])

	return (
		<div>
			<Bar data={data}/>
		</div>
	)
}

export default App
