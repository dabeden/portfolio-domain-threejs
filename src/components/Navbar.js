import React from "react";
import { NavLink } from "react-router-dom";



const Navbar = () => {
    return (
        <header className="navbar header relative z-50 flex items-center px-6 py-3 rounded-b-lg shadow-md">

            <nav className="silkscreen-regular sm:text-xl lg:text-xl flex ml-auto text-lg gap-7 font-medium">
                <NavLink 
                    to="/"  
                    className={({ isActive }) => isActive ? 'text-blue-500' : 'text-blue-100'}
                >
                    About Me
                </NavLink>
                <NavLink 
                    to="/contactme"  
                    className={({ isActive }) => isActive ? 'text-blue-500' : 'text-blue-100'}
                >
                    Contact
                </NavLink>
                <NavLink 
                    to="/projects"  
                    className={({ isActive }) => isActive ? 'text-blue-500' : 'text-blue-100'}
                >
                    Projects
                </NavLink>

            </nav>
        </header>
    );
};

export default Navbar;