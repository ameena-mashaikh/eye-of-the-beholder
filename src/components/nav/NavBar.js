import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { Dropdown } from "./Dropdown"
import { useState, useEffect } from "react"
import { EyeMakeupDropdown } from "./EyeMakeupDropdown"

export const NavBar = () => {

    const [dropdown, setDropdown] = useState(false)
    const [eyeDropdown, setEyeDropdown] = useState(false)
    const navigate = useNavigate()
    
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Homepage</Link>
            </li>
            <li className="navbar__item active"
                onMouseEnter={() => setEyeDropdown(true)}
                onMouseLeave={() => setEyeDropdown(false)}
                >
                <label><u>Eye Makeup</u></label>
                {eyeDropdown && <EyeMakeupDropdown/>}
            </li>
            <li className="navbar__item active"
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                >
                <label><u>Feature Finder</u></label>
                {dropdown && <Dropdown/>}
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            {
                localStorage.getItem("eye_user")
                    ? <li className="navbar__item">
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