import React, { useContext } from 'react'

import './ShopCategory.css'
import { ShopContext } from '../../Context/ShopContext'
import dropdown_icon from '../../assets/icons/dropdown_icon.png'
import Item from '../../Components/shop/Item/Item'

const ShopCategory =(props)=>{
    const {all_product} = useContext(ShopContext);
    const filteredProducts = all_product.filter((item) => item.category === props.category);

    return (
        <div className='shop-category'>
            <div className="shopcategory-indexSort">
                <p>
                <span>Showing {filteredProducts.length}</span> out of {all_product.length} products
                </p>
            </div>
            <div className="shopcategory-product">
                {filteredProducts.length > 0 ? (
                filteredProducts.map((item, i) => (
                    <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
                ))
                ) : (
                <div className="shopcategory-no-products">
                    <h2>No products are available in this category.</h2>
                </div>
            )}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory