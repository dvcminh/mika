import React, { useState } from 'react'
import { FaSearch, FaUser, FaShoppingBag, FaTimes} from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import logo from "../../public/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
        <header className='max-w-screen-2xl mx-auto px-16 max-lg:px-4 absolute top-0 left-0 right-0 '>
            <nav className='flex justify-between items-center md:py-4 pt-6 pb-3'>
                <FaSearch className='text-Black w-5 h-5 block max-md:hidden cursor-pointer' /> 
                
                <a className='md:ml-36' href="/"><img src={logo} alt="" /></a>

                <div className='text-lg text-Black flex items-center gap-4 max-sm:hidden'>
                    <a href="" className='flex gap-2 items-center'><FaUser/> Account</a>
                    <a href="" className='flex gap-2 items-center'><FaShoppingBag /> Shopping</a>
                </div>

                {/* navbar for sm devices */}
                <div className='sm:hidden'>
                    <button onClick={toggleMenu}>
                        { isMenuOpen ? <FaTimes className='w-5 h-5 text-Black'/> : <FaBars className='w-5 h-5 text-Black'/> }
                    </button>
                </div>

                
            </nav>

            <hr />

            {/* category items */}
            <div className='pt-8'>
                <ul className='flex justify-between items-center text-Black max-lg:hidden'>
                    {navItems.map(({title, path}) => (
                        <li key={title} className='hover:text-orange-500'>
                            
                            <Link to="/">{title}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* category items in mobile view */}
            <div className={isMenuOpen ? 'block' : 'hidden'}>
                <ul className='bg-Black text-white py-6 px-4 rounded'>
                    {navItems.map(({title, path}) => (
                        <li key={title} className='hover:text-orange-500 py-2 cursor-pointer'>
                            <Link to="/">{title}</Link>
                            <hr className='pt-4'/>
                        </li>
                    ))}
                </ul>        
            </div>

        </header>  
    )

    
}

export default Navbar