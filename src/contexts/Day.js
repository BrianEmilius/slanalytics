import { createContext, useState } from "react"

const DayContext = createContext()

export default function DayContextProvider({children}) {
	const [day, setDay] = useState(new Date().valueOf())

	return (
		<DayContext.Provider value={{day, setDay}}>
			{children}
		</DayContext.Provider>
	)
}

export { DayContext }
