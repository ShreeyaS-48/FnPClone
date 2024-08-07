import React from 'react'
import { Link } from 'react-router-dom'

const TrendItem = ({item}) => {
    return (     
        
            <div className='trend-item'>
            <Link to={`/${item.itemId}`} style={{color:"black", textDecoration:"none"}}>
            <figure>
                <img src={item.imgURL} alt={item.title} title={item.title} /> 
            </figure>
            <p className='title'style={{fontWeight:"bold", fontSize:"19px"}}>{item.title}</p>
            <p>&#8377; {item.price}</p>
            </Link> 
            </div>
        
    )
}

export default TrendItem
