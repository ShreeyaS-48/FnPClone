import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'


const Addon = ({item, handleCheck, handleIncreaseQty, handleDecreaseQty}) => {
    return (
        <li className='addon'>
            <figure>
                <img src={item.imgURL} alt={item.title} height="100" width="100"/>
            </figure>
            <p style={{fontWeight:"bold"}}>{item.title}</p>
            <p style={{textAlign:"center"}}>&#8377; {item.price}</p>
            <div style={{display:"flex", marginTop:"5px", height:"20px",backgroundColor:"#ccc", alignItems:"center", justifyContent:"space-between", padding:"5px"}}>
                <input type='checkbox' style={{flexGrow:"1"}} onChange={()=>handleCheck(item.id)} checked={item.checked} />
                <div style={{display:"flex", fontSize:"0.9rem", flexGrow:"2", justifyContent:"space-around", alignItems:"center"}}>
                    <FaMinus
                        role='button'
                        onClick={()=>handleDecreaseQty(item.id)}
                        style={{cursor:"pointer"}}
                    />
                    <div style={{border: "1px solid black", backgroundColor:"white", width:"20px"}}>{item.quantity}</div>
                    <FaPlus
                        role='button'
                        onClick={()=>handleIncreaseQty(item.id)}
                        style={{cursor:"pointer"}}
                    />
                </div>
            </div>
        </li>
    )
}

export default Addon
