import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar, FaLongArrowAltRight } from "react-icons/fa";
import lazadaLogo from '/images/logo-lazada.png'
import shopeeLogo from '/images/logo-shopee.png'
import tikiLogo from '/images/logo-tiki.png'
import axios from 'axios';

const SingleProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [relativeProducts, setRelativeProducts] = useState([]);
    const [category, setCategory] = useState('');
    console.log(id);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/products/findProductById", {
                    params: {
                        id: id
                    }
                });
                console.log(response.data);
                setProduct(response.data);
                setCategory(response.data.category);
                console.log(response.data.title)

            }
            catch (error) {
                console.log("Error fetching data:", error);
            }
        }
        fetchData();
        //window.scrollTo(0, 0);
    }, [id])

    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:8080/api/v1/products/findProductByName", {
    //                 params: {
    //                     category: category
    //                 }
    //             });
    //             console.log("hello");
    //             console.log(response.data);
    //             setRelativeProducts(response.data);
    //         }
    //         catch (error) {
    //             console.log("Error aaa fetching data:", error);
    //         }
    //     }
    //     fetchData();
    //     //window.scrollTo(0, 0);
    // }, [category])

    const handleButtonClick = (link_item) => {
        window.open(link_item);
    }

    const getLogoSrc = (type) => {
        switch(type) {
          case 'lazada':
            return lazadaLogo;
          case 'shopee':
            return shopeeLogo;
          case 'tiki':
            return tikiLogo;
          default:
            return 'https://w7.pngwing.com/pngs/426/341/png-transparent-shopping-cart-e-commerce-online-shopping-logo-shopping-cart-blue-service-logo.png';
        }
    }

    return (
        <div className='mt-32 px-28 max-w-screen-2xl mx-auto container'>
            <div className='p-3 m-auto'>         
                <hr />
                {/* path */}
                <div className='mt-10'>
                    <a href="/" className='text-gray-600'>Home </a>
                    <a href="/category" className='font-bold'>/ Category</a>
                </div>

                {/* Main section */}
                <div className='mt-12 sm:mt-10'>
                    <div className='flex gap-4 h-max justify-center'>
                        {/* image */}
                        <div className='w-1/2 flex border p-8 rounded-lg shadow-sm'>
                            <img src={product.image_url} alt="image" className='h-120 w-[80%] object-cover  mx-auto' />
                        </div>
                        {/* product detail */}
                        <div className='w-1/2'>
                            <h2 className='text-2xl font-bold capitalize text-center'>{product.title}</h2>
                            {/* <p className='mt-4 text-gray-500 text-base leading-6 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque in hic magni esse distinctio maxime alias tempore aperiam sunt odit unde quia, a autem voluptas eaque? Ut veniam dolorum velit. Et voluptatum quia nulla optio, suscipit sit repellendus eos ab, magnam natus quam. Ea perspiciatis voluptates sunt inventore accusamus, debitis, ipsam ipsa eveniet quo, quas adipisci nisi error reiciendis asperiores?</p> */}
                            <span className='flex text-yellow-400 my-8 max-sm:my-4 text-xl items-center gap-1'>
                                (120)
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </span>

                            <div className='mt-3'>
                                {/* <div className='flex flex-col gap-2 w-full'>
                                    <label className='font-semibold'>Quantity</label>
                                    <input type="number" name='quantity' id='price' defaultValue={1} required className='border p-2 border-gray-400
                                    font-semibold outline-none w-full max-w-full focus:border-red-500' />
                                </div> */}
                                <div className='w-full mt-2 flex items-center justify-between px-4 py-4 shadow-sm border rounded-md'>
                                    <p className='text-red-600 font-semibold max-sm:text-xl '>${product.price}</p>
                                    <div className='flex items-center gap-4'>
                                        <img src={getLogoSrc(product.type)} alt="logo" className='h-8 object-cover'/>
                                        <button onClick={() => handleButtonClick(product.link_item)} className='flex text-white rounded-md bg-orange-500 px-4 py-2 hover:bg-[#ea4531] hover:text-gray-200 justify-center items-center gap-2'>Đến nơi bán<FaLongArrowAltRight /></button>                          
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-12'>
                    {/* Description */}

                    <div className='mt-4'>
                        <h1 className='text-2xl font-bold mb-4'>CHI TIẾT SẢN PHẨM</h1>
                        <div
                            className='text-gray-700'
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />                
                    </div>


                    {/* Relative product */}
                    <div className='mt-4'>
                        <h1 className='text-2xl font-bold mb-4'>SẢN PHẨM LIÊN QUAN</h1>
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default SingleProduct