import { useContext } from "react"
import { DayContext } from "../contexts/Day"
import FeatherIcon from "feather-icons-react"

export default function SelectDay() {
	const {day, setDay} = useContext(DayContext)

	return (
		<>
			<button onClick={() => setDay(day - (60 * 60 * 24 * 1000))}><FeatherIcon icon="chevron-left"/></button>
			{new Date(day).toLocaleString()}
			<button onClick={() => setDay(day + (60 * 60 * 24 * 1000))}><FeatherIcon icon="chevron-right"/></button>
		</>
	)
}
