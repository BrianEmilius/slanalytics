import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../views/Home"
import Layout from "./Layout"

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout/>}>
					<Route index element={<Home/>}/>
					<Route path="/test" element={<h1>Test</h1>}/>
					<Route path="*" element={<h1>Nope</h1>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
