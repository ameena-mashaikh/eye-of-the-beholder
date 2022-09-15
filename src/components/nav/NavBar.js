import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    const localEyeUser = localStorage.getItem("eye_user")
    const eyeUserObject = JSON.parse(localEyeUser)
    const navigate = useNavigate()
    
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Homepage</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/eyeshadow_generator">Eyeshadow Color Generator</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/undertone_finder">Undertone Finder</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/account">Account</Link>
            </li>
            {
                localStorage.getItem("eye_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("eye_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}