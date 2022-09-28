import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { Dropdown } from "./Dropdown"
import { useState, useEffect } from "react"

export const NavBar = () => {

    const [dropdown, setDropdown] = useState(false)
    const navigate = useNavigate()
    
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Homepage</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/eyeshadow_generator">Eyeshadow Color Generator</Link>
            </li>
            <li className="navbar__item active"
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                >
                <Link className="navbar__link" to="/feature_finder">Feature Finder</Link>
                {dropdown && <Dropdown/>}
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
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