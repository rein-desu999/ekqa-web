import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom';

const Item =(props)=>{
    return (
        <div className="item">
            <div className="item-image-container">
            <Link to={`/shop/product/${props.id}`}><img src={props.image} alt="" /></Link>
            </div>
            <p>{props.name}</p>
            <div className="item-price">
                <div className="item-price_new">
                    ${props.price}
                </div>
            </div>
        </div>
    )
}

export default Item