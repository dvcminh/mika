import React from 'react'
import bannerImg from "/images/banner.png";
import { FaShoppingBag } from "react-icons/fa";

const Banner = () => {
  
  return (
    <div className='bg-primaryBG py-12 px-28 max-xl:px-4 '>
        <div className='py-28 max-w-screen-2xl mx-auto px-16  flex max-md:flex-col justify-center items-center gap-14'>
            <div className='md:w-1/2'>
                <h1 className='text-5xl text-Black mb-12'>Collections</h1>
                <p className='text-2xl mb-12'>You can explore ans shop many differnt collection from various barands here.</p>

                <button className='text-white font-semibold py-4 px-6 bg-Black flex items-center gap-2 rounded-sm hover:text-orange-500'>
                  <FaShoppingBag className='text-xl'/> Shop Now
                </button>
            </div>
            <div className='md:w-1/2'>
                <img className='mx-auto' src={bannerImg} alt="banner" />
            </div>
        </div>
    </div>
  )
}

export default Banner