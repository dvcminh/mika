import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <div>
                <div className="hero-hand-icon">
                    <p>Choose</p>
                    <img src={hand_icon} alt='' />
                </div>
            </div>
            <p>the best price</p>
            <p>for you</p>
            <h2><span style={{color:"#FD5D31"}}>Shopee</span>, <span style={{color:"#FA029D"}}>Lazada</span>, <span style={{color:"#0A68FF"}}>Tiki</span></h2>
            <div className="hero-lasted-btn">
            <div>Let's check it</div>
            <img src={arrow_icon} alt=''></img>
        </div>
        </div>
        
        <div className="hero-right">
            <img src={hero_image} alt=''></img>
        </div>
    </div>
  )
}

export default Hero