import { Link, NavLink, Outlet } from "react-router-dom"
import FeatherIcon from "feather-icons-react"

export default function Layout() {
	return (
		<>
			<header className="bg-white shadow-md flex justify-between items-center px-10">
				<Link to="/">Secondlife Analytics</Link>

				<nav>
					<menu className="flex">
						<li>
							<NavLink
								to="/"
								className={({isActive}) => (
									`flex py-4 px-5 uppercase ${isActive ? "bg-[#10a6c8] text-white" : "bg-white text-black"}`
								)}
								end
							>
								<FeatherIcon icon="home" className="mr-2"/> Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/test"
								className={({isActive}) => (
									`flex py-4 px-5 uppercase ${isActive ? "bg-[#10a6c8] text-white" : "bg-white text-black"}`
								)}
								end
							>
								<FeatherIcon icon="settings" className="mr-2"/> Test
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/account"
								className={({isActive}) => (
									`flex py-4 px-5 uppercase ${isActive ? "bg-[#10a6c8] text-white" : "bg-white text-black"}`
								)}
								end
							>
								<FeatherIcon icon="user" className="mr-2"/> Account
							</NavLink>
						</li>
					</menu>
				</nav>
			</header>
			<main className="pt-12">
				<Outlet/>
			</main>
		</>
	)
}