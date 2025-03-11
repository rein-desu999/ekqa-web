import React from 'react'
import './Collections.css'
import new_collection from '../Assets/new_collection'
import Item from '../Item/Item'

const Collections =()=>{
    return (
        <div className='new-collections'>
            <h1>ALL PRODUCTS</h1>
            <hr/>
            <div className="collections">
                {new_collection.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
                })}
            </div>

        </div>
    )
}

export default Collections