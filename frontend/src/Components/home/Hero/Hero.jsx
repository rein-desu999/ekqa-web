import React from 'react'
import './Hero.css'
import arrow_icon from '../../../assets/icons/arrow_icon.png'
import shirt from '../../../assets/product/shirt.png'

const Hero =()=>{
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>NEW ARRIVALS</h2>
                    <div className='hero-hand-icon'>
                        <p>New</p>
                    </div>
                    <p>To Support Fundraising for Children with Autism</p>
                <div className="hero-latest-btn">
                    <p>Latest Product</p>
                    <img src={arrow_icon} alt="" />
                </div>
            </div>
            <div className="hero-right">
                <img src={shirt} alt="" />
            </div>
        </div>
    )
}

export default Hero