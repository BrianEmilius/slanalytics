import { Link } from "react-router-dom"
import Calendar from "../components/Calendar"
import Graph from "../components/Graph"
import SelectDay from "../components/SelectDay"
import DayContextProvider from "../contexts/Day"

export default function Home() {
	return (
		<DayContextProvider>
			<div className="mx-10 border-b-2 border-gray-300 grid grid-cols-12 gap-x-2">
				<div className="col-start-1 col-end-3 flex items-center">
					<SelectDay/>
				</div>
				<div className="col-start-4 col-end-13">
					<Link>Real time</Link>
					<Link>Last hour</Link>
					<Link>Last 12 hours</Link>
					<Link>Last 24 hours</Link>
				</div>
			</div>
			<div className="mx-10 grid grid-cols-12 gap-x-2 mt-3">
				<Calendar/>
				<Graph />
			</div>
		</DayContextProvider>
	)
}
