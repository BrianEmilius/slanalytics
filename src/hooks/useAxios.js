import axios from "axios"
import { useEffect, useState } from "react"

export default function useAxios({url}) {
	const [data, setData] = useState()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	
	useEffect(function() {
		axios.get(url, {
			headers: {
				Accept: "application/json"
			}
		})
			.then(function(response) {
				setData(response.data)
				setLoading(false)
			})
			.catch(error => setError(error))
	}, [])

	return { data, loading, error }
}
