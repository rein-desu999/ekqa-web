import React from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'

const ProductDisplay =(props)=>{
    const {product} = props;
    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt={`{product.name} thumbnail`} />
                    <img src={product.image} alt={`{product.name} thumbnail`} />
                    <img src={product.image} alt={`{product.name} thumbnail`} />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt={`{product.name} thumbnail`} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <p>0</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price">
                        ${product.price}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    A lightweight, cotton shirt
                </div>
                <div className="productdisplay-right-size">
                    <h1>Size</h1>
                    <div className="productdisplay-right-size">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                    </div>
                </div>
                <button>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category: </span>{product.category}</p>
            </div>
        </div>
    )
}

export default ProductDisplay