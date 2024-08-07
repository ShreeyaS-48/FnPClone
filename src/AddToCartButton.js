import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

const AddToCartButton = ({handleAddToCart, handleIncreaseQty, handleDecreaseQty, item}) => {
    return (
        <div style={{display:"flex", alignItems:"center"}}>
                    <button
                        className='item-add'
                        type="button"
                        style={item.quantity === "0" ? {backgroundColor:"#82853e", color:"#fff", border:"none", outline:"none", height: "40px", borderRadius: "7px", 
                        fontSize:"1.25rem",padding:"5px", width:"140px"}:{backgroundColor:"#82853e", color:"#fff", border:"none", outline:"none", height: "40px", borderRadius: "7px 0px 0px 7px", 
                        fontSize:"1rem",padding:"5px",
                        width:"70px"}}
                        onClick={(e)=>handleAddToCart(item.id)}
                    >
                        <p style={item.quantity === "0" ? {cursor:"pointer"} : null}>{item.quantity === "0" ? "Add to Cart" : "Quantity"}</p>
                    </button>
                    {item.quantity === "0" ? null : <><FaMinus
                            style={{paddingRight:"5px",
                            paddingLeft: "5px",
                            width: "25px",
                            backgroundColor:"#82853e", color:"#fff", height: "40px" , cursor:"pointer"}}
                            role="button"
                            onClick={()=>handleDecreaseQty(item.id)}
                        />
                        <p style={{height:"40px", backgroundColor:"#82853e", color:"white", display:"grid", width:"20px", placeContent:"center", fontWeight:"bold"}}>{item.quantity}</p>
                        <FaPlus
                            role="button"
                            style={{ paddingLeft: "5px",
                            paddingRight:"5px",
                            width:"25px", 
                            borderRadius: "0px 7px 7px 0px",
                            backgroundColor:"#82853e", color:"#fff", height: "40px", cursor:"pointer"}}
                            onClick={()=>handleIncreaseQty(item.id)}
                        />
                        </>}
                    </div>
    )
}

export default AddToCartButton
