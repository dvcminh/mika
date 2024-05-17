import React from 'react'
// import bannerImg from "/images/banner.png";
import bannerImg from "/Remove_2.png";

import { FaShoppingBag } from "react-icons/fa";

const Banner = () => {
  
  return (
    <div className='bg-[#FFC656] py-4 px-28 max-xl:px-4 '>
        <div className='pt-20 pb-12 max-w-screen-2xl mx-auto px-16  flex max-md:flex-col justify-center items-center gap-14'>
            <div className='md:w-1/2 order-0'>
                <h1 className='text-4xl text-Black mb-8'>Welcome to <span className='text-4xl font-bold'>Nika!</span></h1>
                <p className='text-base font-semibold mb-4  text-[#616060]'>Explore and shop a variety of collections from different brands right here.</p>
                <p className='mb-8'>Nika helps you save money by comparing prices from e-commerce platforms like <span className='text-[#FD5D31] font-semibold text-xl'>Shopee</span>, <span className='text-[#FA029D] font-semibold text-xl'>Lazada</span>, <span className='text-[#0A68FF] font-semibold text-xl'>Tiki</span>. With Nika, you will easily find the best shopping place with the most reasonable price.</p>
                <button className='text-white font-semibold py-4 px-6 bg-[#F7452F] flex items-center gap-2 rounded-md hover:bg-[#ea4531] hover:text-gray-200'>
                  <FaShoppingBag className='text-xl'/> Shop Now
                </button>
            </div>
            <div className='md:w-1/2 order-1'>
                <img className='mx-auto w-full max-w-[450px]' src={bannerImg} alt="banner" />
            </div>
        </div>
    </div>
  )
}

export default Banner