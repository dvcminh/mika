import React from 'react'
import Banner from './Banner'
import Logos from './Logos'
import Products from './Products'
import Collections from './Collections'
import BestSellers from './BestSellers'
import Categories from './Categories'

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <Logos />
      <Products />
      <Collections />
      <BestSellers />
    </div>
  )
}

export default Home