import { Outlet, Route, Routes } from "react-router-dom"
import { FeaturesForm } from "../eyeshadow/FeaturesForm"
import { UndertoneFinder } from "../undertone/UndertoneFinder"
import { Account } from "../account/Account"


export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Eye of the Beholder</h1>
                    <div>Your Guide To Looking Your Best!</div>

                    <Outlet />
                </>
            }>

                <Route path="eyeshadow_generator" element={  <FeaturesForm/>} />
                <Route path="undertone_finder" element = { <UndertoneFinder/>} />
                <Route path="profile" element = { <Account/>} />
            </Route>
        </Routes>
    )
}