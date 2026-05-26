import React from "react";
import { NavLink } from "react-router-dom";



const Navbar = () => {
    return (
        <header className="navbar header relative z-50 flex items-center px-6 py-3 rounded-b-lg shadow-md">

            <nav className="silkscreen-regular sm:text-xl lg:text-xl flex ml-auto text-lg gap-7 font-medium">
                <NavLink 
                    to="/"  
                    className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`}
                >
                    <span className="navbar-link-label">About Me</span>
                    <span className="navbar-link-hover">About Me</span>
                </NavLink>
                <NavLink 
                    to="/contactme"  
                    className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`}
                >
                    <span className="navbar-link-label">Contact</span>
                    <span className="navbar-link-hover">Contact</span>
                </NavLink>
                <NavLink 
                    to="/projects"  
                    className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`}
                >
                    <span className="navbar-link-label">Projects</span>
                    <span className="navbar-link-hover">Projects</span>
                </NavLink>

            </nav>
        </header>
    );
};

export default Navbar;