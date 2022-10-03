import { Outlet, Route, Routes } from "react-router-dom"
import { FeaturesForm } from "../eyeshadow/FeaturesForm"
import { UndertoneFinder } from "../featureFinder/undertone/UndertoneFinder"
import { Account } from "../account/Account"
import { Homepage } from "../homepage/Homepage"
import { EyeShape} from "../featureFinder/eyeShape/EyeShape"
import { FaceShape } from "../featureFinder/faceShape/FaceShape"

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

                <Route path="home" element = {<Homepage/>}/>
                <Route path="eyeshadow_generator" element={  <FeaturesForm/>} />
                <Route path="undertone_finder" element = { <UndertoneFinder/>} />
                <Route path="profile" element = { <Account/>} />
                <Route path="eyeShape_finder" element = {<EyeShape/>}/>
                <Route path="faceShape_finder" element = {<FaceShape/>}/>

            </Route>
        </Routes>
    )
}