import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import lazadaLogo from '/images/logo-lazada.png'
import shopeeLogo from '/images/logo-shopee.png'
import tikiLogo from '/images/logo-tiki.png'
import { FaStar, FaLongArrowAltRight } from "react-icons/fa";
import {nikaApi} from "../api/nikaApi";

const SearchResult = () => {


    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('query');
    const [products, setProducts] = useState([]);

    const [sortOption, setSortOption] = useState('default');
    const [platformOptions, setPlatformOptions] = useState({
        tiki: true,
        lazada: true,
        shopee: true,
        all: true
    });

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let sortBy = 'price';
                let direction = 'ASC';

                switch (sortOption) {
                    case 'price-asc':
                        sortBy = 'price';
                        direction = 'ASC';
                        break;
                    case 'price-desc':
                        sortBy = 'price';
                        direction = 'DESC';
                        break;
                    case 'A-Z':
                        sortBy = 'title';
                        direction = 'ASC';
                        break;
                    case 'Z-A':
                        sortBy = 'title';
                        direction = 'DESC';
                        break;
                    default:
                        sortBy = 'price';
                        direction = 'ASC';
                        break;
                }
                console.log("fetching data...");
                const response = await nikaApi.newGetProductsByCategory(
                    searchQuery,
                    platformOptions.all ? null : Object.keys(platformOptions).find(key => platformOptions[key] && key !== 'all'),
                    null,
                    null,
                    null,
                    page,
                    50,
                    sortBy,
                    direction
                );
                //console.log("response:", response.data);
                setProducts(response.data.data);
                console.log(response.data.data.length());
                
                //setAllProducts(response.data.content);
                setTotalPages(response.data.totalPages);
            }
            catch (error) {
                console.log("Error fetching data:", error);
            }
        }
        fetchData();    
    }, [platformOptions, sortOption, page, size, searchQuery])


    useEffect(() => {
        setPage(0);
    }, [platformOptions, sortOption]);

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

    const handleButtonClick = (link_item) => {
        window.open(link_item);
    }

    const handleSortChange = (option) => {
        setSortOption(option);
    }

    const handlePlatformChange = (platform) => {
        setPlatformOptions(prevState => {
            const newState = { ...prevState };

            if (platform === 'all') {
                const allChecked = !prevState.all;
                newState.tiki = allChecked;
                newState.lazada = allChecked;
                newState.shopee = allChecked;
                newState.all = allChecked;
            } else {
                if (!prevState[platform] || (prevState[platform] && (prevState.tiki + prevState.lazada + prevState.shopee > 1))) {
                    newState[platform] = !prevState[platform];
                    newState.all = newState.tiki && newState.lazada && newState.shopee;
                }
            }

            return newState;
        });
    }

    const formatPrice = (price, type) => {
        if(type === 'lazada') {
            return price;
        }
        else if(type === 'tiki') {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        }
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        
        
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };


    return (
        <div className='max-w-screen-2xl mx-auto container px-36 pt-20 bg-[#F3F4F6]'>
            {searchQuery ? (
                <header className='py-20 ml-10'>
                    <div className='text-2xl font-bold mb-4'>Kết quả tìm kiếm: <span className='text-[#e6664a]'>{searchQuery}</span></div>
                </header>
            ) : (
                <header className='pt-20 ml-10'>
                    <div className='text-2xl font-bold mb-4'>Không tìm thấy kết quả</div>
                </header>
            )}
            
            {(products.length > 0 && searchQuery !== "") ? (
                <div div className='flex gap-20'> 
                {/* product list */}
                <div className='w-3/4 mx-auto'>
                    {/* sort options*/}
                    <div className='flex gap-12 justify-end items-center mb-8 border-2 border-orange-400 rounded-md p-4'>
                        <div className='flex gap-8'>
                            <label className='flex gap-2 items-center justify-center'>
                                <input
                                className='w-4 h-4'
                                type="checkbox"
                                    checked={platformOptions.all}
                                    onChange={() => handlePlatformChange('all')}
                                />
                                Tất cả
                            </label> 
                            <label className='flex gap-2 items-center justify-center'>
                                <input
                                className='w-4 h-4'
                                    type="checkbox"
                                    checked={platformOptions.tiki}
                                    onChange={() => handlePlatformChange('tiki')}
                                />
                                <img src={tikiLogo} alt="Tiki" className='h-8 object-cover' />
                            </label>
                            <label className='flex gap-2 items-center justify-center'>
                                <input
                                className='w-4 h-4'
                                    type="checkbox"
                                    checked={platformOptions.lazada}
                                    onChange={() => handlePlatformChange('lazada')}
                                />
                                <img src={lazadaLogo} alt="Lazada" className='h-7 object-cover' />
                            </label>
                            <label className='flex gap-2 items-center justify-center'>
                                <input
                                className='w-4 h-4'
                                    type="checkbox"
                                    checked={platformOptions.shopee}
                                    onChange={() => handlePlatformChange('shopee')}
                                />
                                <img src={shopeeLogo} alt="Shopee" className='h-8 object-cover' />
                            </label>       
                        </div>


                        <div className='flex gap-4'>
                            <select name="" id="sort" className='border p-2 rounded'
                            onChange={(e) => handleSortChange(e.target.value)}
                            value={sortOption}
                            >
                                <option value='default'>Sắp xếp</option>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                                <option value='price-asc'>Giá: Thấp đến Cao</option>
                                <option value='price-desc'>Giá: Cao đến Thấp</option>
                                {/* <option value='rating-desc'>Đánh giá cao</option> */}
                            </select>
                        </div>
                    </div>
                        
                    {/* products */}
                    <div className='grid xl:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 gap-12'>
                        {products.map(product => (
                        <div key={product.id} className='relative group p-2 border rounded-lg shadow-md hover:bg-gray-100 transition-transform duration-200 transform hover:scale-105 hover:border hover:border-orange-500'>
                            <Link to={`/product/${product.id}`} className="block ">
                                <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-4" />
                                <img src={getLogoSrc(product.type)} alt="logo" className='h-8 object-cover absolute top-[5%] left-[3%]'/>
                                <div>
                                    {
                                        (product.discount_percent_list != '' && product.discount_percent_list != 0) ?
                                            <p className="text-sm text-red-500">{product.discount_percent_list}</p>
                                        : ''
                                    }
                                    <h2 className="font-medium ">{product.title}</h2>
                                    <p className="text-sm text-gray-600">{formatPrice(product.price, product.type)}</p>
                                    <p className="text-[12px] mt-2 text-[#FBBF24] flex"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></p>   
                                </div>
                            </Link>
                            <button onClick={() => handleButtonClick(product.link_item)} className='hidden group-hover:flex absolute bottom-0 left-0 right-0 w-full text-white rounded-b-lg bg-orange-500 px-4 py-2 hover:bg-[#ea4531] hover:text-gray-200 justify-center items-center gap-2'>Đến nơi bán<FaLongArrowAltRight /></button>                          
                        </div>          
                        ))}
                    </div>   
                    {/* Pagination */}
                    <div className='flex justify-center mt-8'>
                        <button 
                            onClick={() => handlePageChange(page - 1)} 
                            disabled={page === 0}
                            className={`px-4 py-2 mx-2 rounded ${page === 0 ? 'bg-gray-300' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                        >
                            Previous
                        </button>
                        <span className='px-4 py-2 bg-white border-t border-b'>{page + 1} of {totalPages}</span>
                        <button 
                            onClick={() => handlePageChange(page + 1)} 
                            disabled={page === totalPages - 1}
                            className={`px-4 py-2 mx-2 rounded ${page === totalPages - 1 ? 'bg-gray-300' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            ) : (
                <div className='flex overflow-y-hidden'>
                    <img className='mx-auto' src="https://cdni.iconscout.com/illustration/premium/thumb/product-is-empty-8044872-6430781.png" alt="" />

                </div>
            )
            }
        </div>
    )
}

export default SearchResult