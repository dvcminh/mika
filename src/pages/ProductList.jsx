import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const {categoryName, subcategoryName } = useParams();
  const location = useLocation();

  const [allProducts, setAllProducts] = useState([]); 
  const [filteredProducts, setFilterdProducts] = useState([]);

  const [categories, setCategories] = useState([]); 
  const [category, setCategory] = useState({});
  const [subcategories, setSubcategories] = useState([]);

  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategoryName || '');
  
    
    useEffect(() => {
        
        axios.get('/categories.json')
        .then(response => {
            setCategories(response.data);
        })
        .catch(error => {
            console.log("Error fetching data:", error);
        })
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/products.json');
                setAllProducts(response.data);
            }
            catch (error) {
                console.log("Error fetching data:", error);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const category = categories.find(cat => cat.link === `/category/${categoryName}`);
        if (category) {
            setCategory(category);
            setSubcategories(category.subcategories);
        }
    }, [categories, categoryName]);

    console.log("category:", category);
    console.log("subcat:", subcategories);
    console.log("selectedSubcat:", selectedSubcategory);

    useEffect(() => {
        const filterProduct = async () => {
            const filteredProducts = allProducts.filter(product => {
                if (selectedSubcategory) {
                    console.log("Da vao");
                    console.log("check category:", product.category, "check subcat", product.subcategory);
                    console.log(product.category === categoryName && product.subcategory === selectedSubcategory);
                    return product.category === categoryName && product.subcategory === selectedSubcategory;
                }
                return product.category === categoryName;
            });
            setFilterdProducts(filteredProducts);
        }
        filterProduct();

    }, [allProducts, categoryName, selectedSubcategory]);
    
    console.log("allProducts:", allProducts);
    console.log("filteredProducts:", filteredProducts);

    useEffect(() => {
        setSelectedSubcategory(subcategoryName || '');
    }, [subcategoryName, location]);

    return (
        <div className='max-w-screen-2xl mx-auto px-36 container pt-20 py-28 bg-[#F3F4F6]'>
            <header className='py-20 text-[#ffb628]'>
                <Link to={`/category/${categoryName}`} className='text-2xl font-bold mb-4'>{category.name}</Link>
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
                    <div className='flex justify-end items-center mb-8'>
                        <div className='flex gap-4'>
                            <select className='border p-2 rounded'>
                                <option value=''>Sắp xếp</option>
                                <option value="popular">Phổ biến</option>
                                <option value='price-asc'>Giá: Thấp đến Cao</option>
                                <option value='price-desc'>Giá: Cao đến Thấp</option>
                                <option value='rating-desc'>Đánh giá cao</option>
                            </select>
                        </div>
                    </div>
                        
                    {/* products */}
                    <div className='grid xl:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 gap-12'>
                        {filteredProducts.map(product => (
                        <Link to={`/product/${product.id}`} key={product.id} className="block p-4 border rounded-lg shadow-md hover:bg-gray-100 transition-transform duration-200 transform hover:scale-105">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                            <div>
                                <h2 className="text-lg font-medium">{product.name}</h2>
                                <p className="text-sm text-gray-600">{product.price} đ</p>
                                <p className="text-sm text-gray-600">{product.rating} ★</p>
                            </div>
                        </Link>
                        ))}
                    </div>         
                </div>
            </div>
        </div>
    );
};

export default ProductList;