import React from "react";
import { Link } from "react-router-dom";
const Logos = () => {
  const companyLogos = [
    { id: 1, image: "/images/company/brand1.png" },
    { id: 2, image: "/images/company/brand2.png" },
    { id: 3, image: "/images/company/brand3.png" },
    { id: 4, image: "/images/company/brand4.png" },
    { id: 5, image: "/images/company/brand5.png" },
  ];

  // const categories = [
  //   { name: "Men's Fashion", image: "/images/company/brand1.png" },
  //   { name: "Electronics & Accessories", image: "/images/company/brand1.png" },
  //   { name: "Home Appliances", image: "/images/company/brand1.png" },
  //   // Add other categories as per the actual data
  // ];

  return (
    <div className='max-w-screen-2xl mx-auto px-16 py-28 container'>
        {/* company logos */}
        <div className='flex justify-between items-center gap-4 flex-wrap max-sm:justify-center'>
            {companyLogos.map(({id, image}) => (
                <img key={id} src={image} alt="company logo" />
            ))}
        </div>

        {/* categories */}
        <div className='mt-8 flex max-md:flex-col items-center pt-24 gap-2'>
            <p className='uppercase text-Black text-2xl xl:w-1/5 md:-rotate-90 font-semibold inline-flex'>Explore new and popular styles</p>
            <div className='md:w-1/2'>
                <Link><img src="/images/category/image1.png" alt="" className='w-full hover:scale-105 transition-all duration-200' /></Link>
            </div>
            <div className='md:w-1/2'>
                <div className='grid grid-cols-2 gap-4'>
                    <Link to=""><img src="/images/category/image2.png" alt="" className='w-full hover:scale-105 transition-all duration-200'/></Link>
                    <Link to=""><img src="/images/category/image3.png" alt="" className='w-full hover:scale-105 transition-all duration-200'/></Link>
                    <Link to=""><img src="/images/category/image4.png" alt="" className='w-full hover:scale-105 transition-all duration-200'/></Link>
                    <Link to=""><img src="/images/category/image5.png" alt="" className='w-full hover:scale-105 transition-all duration-200'/></Link>
                </div>

            </div>
        </div>
    </div>
    // <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
    //   {categories.map((category, index) => (
    //     <div key={index} className="flex flex-col items-center text-center">
    //       <img
    //         src={category.image}
    //         alt={category.name}
    //         className="w-full rounded-lg"
    //       />
    //       <div className="mt-2 font-bold">{category.name}</div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Logos;
