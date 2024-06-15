import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios, { all } from 'axios';
import { FaStar, FaLongArrowAltRight } from "react-icons/fa";
import lazadaLogo from '/images/logo-lazada.png'
import shopeeLogo from '/images/logo-shopee.png'
import tikiLogo from '/images/logo-tiki.png'
import { nikaApi } from "../api/nikaApi";

const ProductList = () => {
    const {categoryName, subcategoryName } = useParams();
    const location = useLocation();

    const [allProducts, setAllProducts] = useState([]); 
    const [filteredProducts, setFilterdProducts] = useState([]);
    const [oneMoreTimeFilteredProducts, setOneMoreTimeFilteredProducts] = useState([]);

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]); 
    const [currentCategory, setCurrentCategory] = useState({});
    const [subcategories, setSubcategories] = useState([]);

    const [selectedSubcategory, setSelectedSubcategory] = useState(subcategoryName || '');
    
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
        axios.get('/categories.json')
        .then(response => setCategories(response.data))
        .catch(error => console.log("Error fetching data:", error))
    }, [])

    // console.log(categoryName)

    // fetch real data
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
                    null,
                    platformOptions.all ? null : Object.keys(platformOptions).find(key => platformOptions[key] && key !== 'all'),
                    categoryName,
                    selectedSubcategory,
                    null,
                    page,
                    50,
                    sortBy,
                    direction
                );
                //console.log("response:", response.data);
                setProducts(response.data.data);
                //setAllProducts(response.data.content);
                setTotalPages(response.data.totalPages);
            }
            catch (error) {
                console.log("Error fetching data:", error);
            }
        }
        fetchData();    
    }, [categoryName, selectedSubcategory, platformOptions, sortOption, page, size])

    //get subcategories of current category
    useEffect(() => {
        const category = categories.find(cat => cat.link === `/category/${categoryName}`);
        if (category) {
            setCurrentCategory(category);
            setSubcategories(category.subcategories);
        }
    }, [categories, categoryName]);

    useEffect(() => {
        setSelectedSubcategory(subcategoryName || '');
    }, [subcategoryName, location]);

    useEffect(() => {
        setPage(0);
    }, [categoryName, selectedSubcategory, platformOptions, sortOption]);

    // console.log("category:", currentCategory);
    // console.log("subcat:", subcategories);
    // console.log("selectedSubcat:", selectedSubcategory);

    //filter products by category and subcategory
    // useEffect(() => {
    //     const filterProduct = async () => {
    //         if(selectedSubcategory == ''){
    //             setFilterdProducts(allProducts);
    //             setOneMoreTimeFilteredProducts(allProducts);
    //             return;
    //         }
    //         const filteredProducts = allProducts.filter(product => {
    //                 // console.log("check category:", product.category, "check subcat", product.subcategory);
    //                 // console.log("check selected cat:", categoryName);
    //                 // console.log("check selected subcat:", selectedSubcategory);
    //                 //console.log(product.category === categoryName && product.subcategory === selectedSubcategory);
    //                 return product.category === categoryName && product.subcategory === selectedSubcategory;
    //         });
    //         setFilterdProducts(filteredProducts);
    //         setOneMoreTimeFilteredProducts(filteredProducts);

    //     }
    //     filterProduct();

    // }, [allProducts, categoryName, selectedSubcategory]);
    

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

    //sorting functionality
    // const handleSortChange = (option, data = null) => {
    //     setSortOption(option);
    //     let sortedItems;
    //     if(data === null) {
    //         sortedItems = [...oneMoreTimeFilteredProducts];
    //     } else {
    //         sortedItems = [...data];
    //     }
    //     switch (option) {
    //         case 'A-Z':
    //             sortedItems.sort((a, b) => a.title.localeCompare(b.title));
    //             break;
    //         case 'Z-A':
    //             sortedItems.sort((a, b) => b.title.localeCompare(a.title));
    //             break;
    //         case 'price-asc':
    //             sortedItems.sort((a, b) => a.price - b.price);
    //             break;
    //         case 'price-desc':
    //             sortedItems.sort((a, b) => b.price - a.price);
    //             break;
    //         default:
    //             break;
    //     }

    //     setOneMoreTimeFilteredProducts(sortedItems);
    // }

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


    // useEffect(() => {
    //     if(platformOptions.all) {
    //         console.log("all checked");
    //         handleSortChange(sortOption, filteredProducts);
            
    //     } else {
    //         console.log("filtering..." , platformOptions)
    //         const filtered = filteredProducts.filter(product => {
    //             if(platformOptions.tiki && product.type === 'tiki') {
    //                 return true;
    //             }
    //             if(platformOptions.lazada && product.type === 'lazada') {
    //                 return true;
    //             }
    //             if(platformOptions.shopee && product.type === 'shopee') {
    //                 return true;
    //             }
    //             return false;
    //         });
    //         console.log("filtered:", filtered)
    //         handleSortChange(sortOption, filtered);
    //         // setOneMoreTimeFilteredProducts(filtered);
    //     }
    // }, [platformOptions]);


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
        <div className='max-w-screen-2xl mx-auto px-36 container pt-20 py-28 bg-[#F3F4F6]'>
            <header className='py-20 text-[#ffb628]'>
                <Link to={`/category/${categoryName}`} className='text-2xl font-bold mb-4'>{currentCategory.name}</Link>
            </header>
            <div div className='flex gap-20'>
                {/* categories */}
                <div className='w-1/5 bg-white'>
                    <h2 className=' font-semibold mb-2 uppercase bg-[#F6C176] p-2 text-Black'>Danh mục</h2>
                    <ul className='list-none'>
                        {subcategories.map(subcategory => (
                        <li key={subcategory.id}>
                            <Link 
                            to={`${subcategory.link}`} 
                            onClick={() => setSelectedSubcategory(subcategory.name)} 
                            className={`block text-sm font-semibold text-gray-600 hover:text-orange-400 py-2 px-4 rounded ${selectedSubcategory === subcategory.link.split('/').pop() ? ' text-orange-400' : ''}`}
                            >
                            {subcategory.name}
                            </Link>
                        </li>
                        ))}
                    </ul>
                </div>

                {/* product list */}
                <div className='w-3/4'>
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
        </div>
    );
};


export default ProductList;