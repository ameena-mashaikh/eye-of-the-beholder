import { Outlet, Route, Routes } from "react-router-dom"
import { FeaturesForm } from "../eyeshadow/FeaturesForm"
import { UndertoneFinder } from "../featureFinder/undertone/UndertoneFinder"
import { Account } from "../account/Account"
import { Homepage } from "../homepage/Homepage"
import { EyeShape} from "../featureFinder/eyeShape/EyeShape"
import { Eyeliner } from "../eyeliner/Eyeliner"
export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                   
                    <Outlet />
                </>
            }>

                <Route path="home" element = {<Homepage/>}/>
                <Route path="eyeshadow_generator" element={  <FeaturesForm/>} />
                <Route path="undertone_finder" element = { <UndertoneFinder/>} />
                <Route path="profile" element = { <Account/>} />
                <Route path="eyeShape_finder" element = {<EyeShape/>}/>
                <Route path="eyeliner_generator" element = {<Eyeliner/>}/>


            </Route>
        </Routes>
    )
}