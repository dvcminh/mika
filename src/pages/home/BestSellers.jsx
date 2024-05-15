import React, { useEffect, useState, useRef } from 'react'
import Cards from '../../components/Cards';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';


const BestSellers = () => {
  
    const [products, setProducts] = useState([]);
    
    // get data in products.json
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/products.json');
                const data = await response.json();
                setProducts(data);
            }
            catch (error) {
                console.log("Error fetching data:", error);
            }
        }

        fetchData();
    }, [])

    const bestSellers = products.filter((item) => item.status === "Best Sellers");
    //console.log(bestSellers);
    
    return (
      <div className="max-w-screen-2xl container px-28 mx-auto mb-12">
        <h2 className="title">Best Sellers</h2>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          aspernatur officiis iste nihil explicabo? <br /> Qui pariatur
          architecto molestias autem magni?
        </p>

        {/* best seller product cards */}
        <div className=''>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
            {
                bestSellers.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div>
                            <Link to={`/shop/${item.id}`}>
                                <img src={item.image} alt="" className='mx-auto w-full hover:scale-105 transition-all duration-200'/>
                            </Link>
                            <div className='mt-4 px-4'>
                                <h4 className='text-base font-semibold mb-2'>{item.title}</h4>
                                <div className='flex items-center justify-between'>
                                <p className='text-black/50'>{item.category}</p>
                                <p className='font-semibold'>${item.price}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
              
            </Swiper>
        </div>
      </div>
    );
}

export default BestSellers