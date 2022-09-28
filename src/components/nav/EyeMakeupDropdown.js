import React, { useState } from "react";
import { eyesDropdown } from "./NavItems";
import { Link } from "react-router-dom";
import "./EyeMakeupDropdown.css";

export const EyeMakeupDropdown = () => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <>
      <ul
        className={dropdown ? "eye-makeup-submenu clicked" : "eye-makeup-submenu"}
        onClick={() => setDropdown(!dropdown)}
      >
        {eyesDropdown.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className={item.cName}
                onClick={() => setDropdown(false)}>
                <div className = "eye_dropdown_select">
                <center>{item.title}</center></div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );

}