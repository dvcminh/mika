import React, { useState, useEffect } from 'react'
import { FaSearch, FaUser, FaShoppingBag, FaTimes} from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import logo from "/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {nikaApi} from "../api/nikaApi";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setSearchQuery("");
    }, [location]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLoggedIn(true);
        }
        const currentRole = localStorage.getItem('role');
        console.log(currentRole);
        if(currentRole === 'ADMIN') {
            console.log('admin');
            setIsAdmin(true);
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
        window.location.reload();
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearchSubmit = async (e) => {

        console.log(searchQuery);
        navigate(`/search?query=${searchQuery}`);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit(e);
        }
    }
    
    const navItems = [
        {title:"Jewelry & Accessories", path:"/"},
        {title:"Clothing & Shoes", path:"/"},
        {title:"Home & Living", path:"/"},
        {title:"Wedding & Party", path:"/"},
        {title:"Toys & Entertainment", path:"/"},
        {title:"Art & Collectibles", path:"/"},
        {title:"Craft Supplies & Tools", path:"/"},
    ];

    return (
        <header className='mx-auto px-28 max-lg:px-4 absolute top-0 left-0 right-0 bg-[#FFC656]'>     
            <nav className=" border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    {/* logo */}
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Mika</span>
                    </Link>

                    {/* search bar */}
                    <div className="flex">
                        <div className="relative hidden md:flex">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <FaSearch className='text-orange-500 h-3.5 w-3.5 text-5xl' />
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input 
                                type="text" 
                                id="search-navbar" 
                                className="block w-full min-w-[500px] p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg rounded-r-none bg-gray-50 " 
                                placeholder="Search..." 
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown}
                            />
                            <button onClick={() => handleSearchSubmit()} className='text-white font-semibold py-2 px-6 bg-[#F7452F] rounded-md rounded-l-none hover:bg-[#ea4531] hover:text-gray-200'>Search</button>
                        </div>
                    </div>
                    
                    {/* user profile */}
                    <div className="flex items-center space-x-4">
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" className="text-white hover:text-gray-300">
                                    <button className='text-white font-semibold py-2 px-6 bg-[#F7452F] rounded-md hover:bg-[#ea4531] hover:text-gray-200'>Login</button>
                                </Link>
                                <Link to="/register" className="text-white hover:text-gray-300">
                                    <button className='text-white font-semibold py-2 px-6 bg-[#213a54] rounded-md hover:bg-[#37587a] hover:text-gray-200'>Register</button>
                                </Link>
                            </>
                        ) : (
                            <div onMouseEnter={() => { setIsUserMenuOpen(true) }} onMouseLeave={() => { setIsUserMenuOpen(false) }} className="relative">
                                <button type="button" className="flex text-sm pb-1 rounded-full md:me-0 focus:ring-4  focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" >
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="user photo" />
                                </button>
                                {/* Dropdown menu */}
                                {isUserMenuOpen && (
                                    <div className="z-50 my-4 absolute top-5 right-0 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                        <div className="px-4 py-3">
                                            <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                                        </div>
                                        <ul className="py-2" aria-labelledby="user-menu-button">
                                            {isAdmin ? (
                                                <li>
                                                    <Link to={"/admin/managecustomer"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                                                </li>
                                            ) : ""
                                            }
                                            <li>
                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                            </li>
                                            <li>
                                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                                    Sign out
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>     
        </header>  
    )

    
}

export default Navbar