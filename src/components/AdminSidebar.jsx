import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { IoSettingsSharp } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";

const AdminSidebar = () => {
  const navItems = [
    //   { icon:<BiSolidDashboard />, title: "Dashboard", path: "/admin/dashboard" },
      { icon:<FaUser />, title: "Users", path: "/admin/managecustomer" },
    //   { icon:<FaBox />, title: "Products", path: "/admin/products" },
  ];

  const bottomNavItems = [
    //   { icon:<BiSolidDashboard />, title: "Dashboard", path: "/admin/dashboard" },
    { icon:<IoSettingsSharp />, title: "Setting", path: "/admin/" },
    { icon:<FaQuestionCircle />, title: "Help & Support", path: "/admin/" },
    { icon:<CiLogout />, title: "Log Out", path: "/login" },
    //   { icon:<FaBox />, title: "Products", path: "/admin/products" },
  ];

  const location = useLocation();
  const handleClick = (title) => {
    if (title === "Log Out") {
        alert("Log Out");
    //   localStorage.removeItem("currentUser");
    //   localStorage.removeItem("accessToken");
    }
  };

  return (
    <div className="w-64 text-black bg-[#F3F4F6] p-4 flex flex-col justify-between">
        <div className='flex-1'>
            <ul className=''>
                {navItems.map((item) => (
                <li key={item.path} className={`hover:bg-gray-300 p-4 text-xl rounded-md font-medium
                    ${
                        location.pathname === item.path
                        ? "bg-gray-300"
                        : ""
                    }
                    `}>
                    <Link to={item.path} className={"flex items-center gap-2 px-3 text-base"}>
                        <span className='text-xl' >{item.icon}</span>
                        {item.title}
                    </Link>
                </li>
                ))}
            </ul>
        </div>
        
        <div className='border-t border-neutral-600'>
            <ul>
                {bottomNavItems.map((item) => (
                    (item.title === "Log Out")?
                        <li key={item.path} className={`hover:bg-gray-300 p-4 text-xl text-red-500 rounded-md font-medium
                            ${
                                location.pathname === item.path
                                ? "bg-gray-300"
                                : ""
                            }
                            `}>
                            <Link to={item.path} className={"flex items-center gap-2 px-3 text-base"}  onClick={() => handleClick(item.title)}>
                                <span className='text-xl' >{item.icon}</span>
                                {item.title}
                            </Link>
                        </li>
                        :
                        <li key={item.path} className="hover:bg-gray-300 p-4 text-xl  rounded-md font-medium">
                            <Link to={item.path} className={"flex items-center gap-2 px-3 text-base"} onClick={() => handleClick(item.title)}>
                                <span className='text-xl' >{item.icon}</span>
                                {item.title}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    </div>
  );
};

export default AdminSidebar;
