import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./App.css"


export const App = () => {
	return (
	<><meta name="viewport" content="width=device-width"></meta>
	<Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					 <ApplicationViews /> 
				</>
			</Authorized>

		} />
	</Routes></>)
}
