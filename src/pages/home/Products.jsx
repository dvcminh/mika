import React, { useEffect, useState } from 'react'
import { FaFilter } from "react-icons/fa";
import Cards from '../../components/Cards';

const Products = () => {
    
    const [products, setProducts] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState('all'); // ['All Products', 'T-shirt', 'Hoodies', 'Bag'
    const [sortOption, setSortOption] = useState('default'); // ['default', 'A-Z', 'Z-A', 'low-to-high', 'high-to-low'


    // get data in products.json
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/cora_products.json');
                const data = await response.json();
                setProducts(data);
                setFilteredItems(data);
            }
            catch (error) {
                console.log("Error fetching data:", error);
            }
        }

        fetchData();
    }, [])

    // filter items based on selected category
    const filterItems = (category) => {
        if (category === 'all') {
            setFilteredItems(products);
        } else {
            const filteredItems = products.filter(product => product.category === category);
            setFilteredItems(filteredItems);
            setSelectedCategory(category);
        }
        setSortOption('default');
        
    }

    //show all products
    const showAll = () => {
        setFilteredItems(products);
        setSelectedCategory('all');
        setSortOption('default');

    }

    //sorting functionality
    const handleSortChange = (option) => {
        setSortOption(option);
        let sortedItems = [...filteredItems];
        switch (option) {
            case 'A-Z':
                sortedItems.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'Z-A':
                sortedItems.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'low-to-high':
                sortedItems.sort((a, b) => a.price - b.price);
                break;
            case 'high-to-low':
                sortedItems.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFilteredItems(sortedItems);
    }





    return (
    <div className='max-w-screen-2xl container px-28 mx-auto mb-12'>
        {/* title */}
        <h2 className='title'>Or subscribe to the newsletter</h2>

        {/* product cards */}
        <div>
            <div className='flex max-md:flex-col justify-between items-center space-y-3'>
                {/* all buttons */}
                <div className='flex justify-start items-center flex-wrap gap-8 max-md:gap-4 '>
                    <button onClick={showAll}>All Products</button>
                    <button onClick={() => filterItems("Dress")} >T-shirt</button>
                    <button onClick={() => filterItems("Hoodies")}>Hoodies</button>
                    <button onClick={() => filterItems("Bag")}>Bag</button>
                </div>

                {/* sorting option */}
                <div className='flex justify-end rounded-sm'>
                    <div className='bg-Black p-2' >
                        <FaFilter className='text-lg text-white h-4 w-4' /> 
                    </div>
                    <select name="" id="sort" className='bg-Black text-white'
                    onChange={(e) => handleSortChange(e.target.value)}
                    value={sortOption}
                    >
                        <option value="default">Sort by</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <Cards filteredItems={filteredItems} />

        </div>
        



    </div>
  )
}

export default Products