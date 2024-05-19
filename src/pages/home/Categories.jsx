import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";


const Categories = () => {

  const [categories, setCategories] = React.useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 16;

  useEffect(() => {
    axios.get('/categories.json')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log("Error fetching data:", error);
      })
  }
  , [])

  

  const nextPage = () => {
    if (currentIndex + itemsPerPage < categories.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  

  return (
    <div className='max-w-screen-2xl mx-auto px-16 pt-28 container min-h-[500px]'>
      <h1 className='text-2xl py-4 mb-8 font-bold'>Categories</h1>

      <div className='relative'>
        <div className="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 grid-cols-1 min-h-[290px]">
          {categories.slice(currentIndex, currentIndex + itemsPerPage).map(category => (
            <Link to={category.link} key={category.id} className="text-center p-4 border hover:shadow-md hover:bg-gray-100 transition-all duration-200 min-h-[145px] max-h-[50%]">
              <img src={category.image} alt={category.name} className="w-16 h-16 mx-auto" />
              <p className="mt-2 text-sm font-medium">{category.name}</p>
            </Link>
          ))}
        </div>
        <div className="absolute flex justify-between -left-4 -right-4 top-[50%] -translate-y-[50%]">
          <button onClick={prevPage} disabled={currentIndex === 0} className="h-8 w-8 flex rounded-full disabled:opacity-0 border border-black hover:transition-all hover:scale-150 duration-200">
            <IoIosArrowBack className='m-auto text-xl font-bold pr-0.5'/>
          </button>
          <button onClick={nextPage} disabled={currentIndex + itemsPerPage >= categories.length} className="h-8 w-8 flex rounded-full disabled:opacity-0 border border-black hover:transition-all hover:scale-150 hover:duration-200">
          <IoIosArrowForward className='m-auto text-xl font-bold'/>
          </button>
        </div>
      </div>

    </div>
  )
}

export default Categories