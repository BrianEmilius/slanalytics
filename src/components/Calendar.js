import { useContext } from "react"
import { DayContext } from "../contexts/Day"

export default function Calendar() {
	const {day} = useContext(DayContext)
	const daysInMonth = new Date(new Date(day).getUTCFullYear(), new Date(day).getUTCMonth() + 1, 0).getDate()
	const firstDayInMonth = new Date(new Date(day).getUTCFullYear(), new Date(day).getUTCMonth() + 1, 1).getDay()

	return (
		<section className="col-span-2">
			<div>
				<h1>{new Date(day).toLocaleString("en-uk", { dateStyle: "long" })}</h1>
			</div>
			<div className="grid grid-cols-7">
				<span>MO</span>
				<span>TU</span>
				<span>WE</span>
				<span>TH</span>
				<span>FR</span>
				<span>SA</span>
				<span>SU</span>
			</div>
			<div className="grid grid-cols-7">
				{Array.from({length: daysInMonth}).fill("").map((e, i)=>(
					<span
						key={i}
						className={`first:col-start-${firstDayInMonth + 1}`}
					>
						{i + 1}
					</span>
				))}
			</div>
		</section>
	)
}
