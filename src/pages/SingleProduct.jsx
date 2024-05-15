import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa6";

const SingleProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    console.log(id);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/products.json');
                const data = await response.json();
                const productInfo = data.filter((p) => p.id == id);
                setProduct(productInfo[0]);
            }
            catch (error) {
                console.log("Error fetching data:", error);
            }
        }

        fetchData();
        window.scrollTo(0, 0);
    }, [id])

    const {title, price, category, image, status} = product;
    return (
    <div className='mt-32 px-28 max-w-screen-2xl mx-auto container'>
        <div className='p-3 m-auto'>         
            <hr />
            {/* path */}
            <div className='mt-10'>
                <a href="/" className='text-gray-600'>Home </a>
                <a href="/shop" className='font-bold'>/ Shop</a>
            </div>

            {/* Main section */}
            <div className='mt-12 sm:mt-10'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-max'>
                    <div>
                        <img src={image} alt="" className='w-full' />
                    </div>
                    {/* product detail */}
                    <div>
                        <h2 className='title text-2xl'>{title}</h2>
                        <p className='mt-4 text-gray-500 text-base leading-6 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque in hic magni esse distinctio maxime alias tempore aperiam sunt odit unde quia, a autem voluptas eaque? Ut veniam dolorum velit. Et voluptatum quia nulla optio, suscipit sit repellendus eos ab, magnam natus quam. Ea perspiciatis voluptates sunt inventore accusamus, debitis, ipsam ipsa eveniet quo, quas adipisci nisi error reiciendis asperiores?</p>
                        <span className='flex text-yellow-400 my-8 max-sm: my-4 text-xl items-center gap-1'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </span>
                        <p className='text-red-600 font-semibold my-4 text-2xl max-sm:text-xl '>${price}</p>

                        <div className='mt-3'>
                            <div className='flex flex-col gap-2 w-full'>
                                <label className='font-semibold'>Quantity</label>
                                <input type="number" name='quantity' id='price' defaultValue={1} required className='border p-2 border-gray-400
                                font-semibold outline-none w-full max-w-full focus:border-red-500' />
                            </div>
                            <div className='w-full text-left'>
                                <button className='flex justify-center items-center bg-red-500 text-white py-3 px-4 w-full mt-4 rounded-md
                                font-bold hover:bg-white hover:text-red-500 border border-red-500 ease-in-out duration-150 shadow-slate-600 gap-2'>Confirm Order <FaStar/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className='text-black/75 mt-12'>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam similique atque sit! Minima, exercitationem. Fugiat repellat culpa numquam facilis quos laboriosam ex recusandae consectetur commodi dolorem. Sunt rerum doloremque inventore.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam similique atque sit! Minima, exercitationem. Fugiat repellat culpa numquam facilis quos laboriosam ex recusandae consectetur commodi dolorem. Sunt rerum doloremque inventore.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam similique atque sit! Minima, exercitationem. Fugiat repellat culpa numquam facilis quos laboriosam ex recusandae consectetur commodi dolorem. Sunt rerum doloremque inventore.</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam similique atque sit! Minima, exercitationem. Fugiat repellat culpa numquam facilis quos laboriosam ex recusandae consectetur commodi dolorem. Sunt rerum doloremque inventore.</p>

            </div>
        </div>
    </div>
  )
}

export default SingleProduct