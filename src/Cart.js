import React from 'react'
import CartItem from './CartItem'
import { useState, useEffect } from 'react'
import Addon from './Addon'
import apiRequest from './apiRequest';
import { useContext } from 'react';
import DataContext from './context/DataContext';
const Cart = () => {
    const {cartItems, handleDelete, items, setItems, setCartItems, API_URL_ITEMS, handleIncreaseQty, handleDecreaseQty} = useContext(DataContext);
    const [total, setTotal] = useState(0);
    const [baseItemsCost, setBaseItemsCost] = useState(0);
    const [addonsCost, setAddonsCost] = useState(0);
    const API_URL_ADDONS = "http://localhost:3500/addons";
    const [totalItems, setTotalItems] = useState(0);
    const [addons, setAddons] = useState([]);
    const [purchasedAddons, setPurchasedAddons] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCartItems, setTotalCartItems] = useState(0);
    const [totalAddons, setTotalAddons] = useState(0);
    useEffect(()=>{
        let total1 = 0;
        let total2 = 0;
        cartItems.forEach(item => total1 += parseInt(item.quantity)*parseInt(item.price));
        setBaseItemsCost(total1);
        addons.forEach(item => total2 += parseInt(item.quantity)*parseInt(item.price));
        setAddonsCost(total2);
        setTotal(total1+total2);
    }, [cartItems, addons]);
    useEffect(()=>{
        const storedAddons = JSON.parse(localStorage.getItem('myAddons')) ? JSON.parse(localStorage.getItem('myAddons')) : [];
        setPurchasedAddons(storedAddons);
    }, []);
    useEffect(()=>{
        const fetchAddons = async()=>{
            try{
                const response = await fetch(API_URL_ADDONS);
                if(!response.ok)
                throw Error ("Did not recieve expected data");
                const responseJson = await response.json();
                setAddons(responseJson);
            }
            catch(err)
            {
                setFetchError(err.message);
            }
            finally{
                setIsLoading(false);
            }
        }
            fetchAddons();
    }, []);
    const handleDeleteAllItems = async ()=>{
        const newItems = items.map((item) => ({...item, quantity: "0"})) ;
        setItems(newItems);
        setCartItems([]);
        localStorage.setItem('mycart', JSON.stringify([]));
        for (const item of newItems) {
            try {
                const updateOptions = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ quantity: item.quantity })
                };
                const reqUrl = `${API_URL_ITEMS}/${item.id}`;
                const result = await apiRequest(reqUrl, updateOptions);
                if (result) {
                    setFetchError(result);
                }
            } catch (err) {
                console.error("Failed to update item", item.id, err);
            }
        }
        const newAddons = addons.map((item) => ({...item, quantity: "0"})) ;
        setAddons(newAddons);
        setPurchasedAddons([]);
        localStorage.setItem('myAddons', JSON.stringify([]));
        for (const item of newAddons) {
            try {
                const updateOptions = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ quantity: item.quantity, checked:false })
                };
                const reqUrl = `${API_URL_ADDONS}/${item.id}`;
                const result = await apiRequest(reqUrl, updateOptions);
                if (result) {
                    setFetchError(result);
                }
            } catch (err) {
                console.error("Failed to update item", item.id, err);
            }
        }
    }
    const handleCheck = async(id)=>{
        const newAddons = addons.map((item)=> item.id === id ? {...item, checked: !item.checked, quantity: item.checked ? "0" : "1"} : item);
        setAddons(newAddons);
        const newPurchasedAddons = newAddons.filter(item => item.checked === true);
        setPurchasedAddons(newPurchasedAddons);
        localStorage.setItem('myAddons', JSON.stringify(newPurchasedAddons));
        const myItem =  newAddons.filter((item)=>item.id === id);
        const updateOptions = {
            method: 'PATCH',
            headers : {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({checked: myItem[0].checked, quantity: myItem[0].quantity})
          };
          const reqUrl = `${API_URL_ADDONS}/${id}`;
          const result = await apiRequest(reqUrl, updateOptions);
          if(result)
          setFetchError(result);    
    }
    const handleIncreaseAddonQty = async(id) =>{
        const newAddons = addons.map((item)=> item.id === id ? {...item, checked:true,quantity: (parseInt(item.quantity)+1).toString()} : item)
        setAddons(newAddons);
        const newPurchasedAddons = newAddons.filter(item => item.checked === true);
        setPurchasedAddons(newPurchasedAddons);
        localStorage.setItem('myAddons', JSON.stringify(newPurchasedAddons));
        const myItem =  newAddons.filter((item)=>item.id === id);
        const updateOptions = {
            method: 'PATCH',
            headers : {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({checked: myItem[0].checked, quantity: myItem[0].quantity})
          };
          const reqUrl = `${API_URL_ADDONS}/${id}`;
          const result = await apiRequest(reqUrl, updateOptions);
          if(result)
          setFetchError(result); 
    }
    const handleDecreaseAddonQty = async(id)=>{
        const newAddons = addons.map((item)=> item.id === id ? {...item, checked:parseInt(item.quantity).toString() >1 ? true : false,quantity: parseInt(item.quantity).toString() > 0 ? parseInt(item.quantity).toString()-1 : 0} : item)
        setAddons(newAddons);
        const newPurchasedAddons = newAddons.filter(item => item.checked === true);
        setPurchasedAddons(newPurchasedAddons);
        localStorage.setItem('myAddons', JSON.stringify(newPurchasedAddons));
        const myItem =  newAddons.filter((item)=>item.id === id);
        const updateOptions = {
            method: 'PATCH',
            headers : {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({checked: myItem[0].checked, quantity: myItem[0].quantity})
          };
          const reqUrl = `${API_URL_ADDONS}/${id}`;
          const result = await apiRequest(reqUrl, updateOptions);
          if(result)
          setFetchError(result); 
    }
    useEffect(()=>{
        let num1 =0;
        let num2 =0;
        cartItems.forEach(item=> num1+=parseInt(item.quantity));
        setTotalCartItems(num1);
        purchasedAddons.forEach(item=>num2+=parseInt(item.quantity));
        setTotalAddons(num2)
        setTotalItems(num1 + num2);
    }, [cartItems, addons]);
    return (
        <div className='cart'>
        <h2 style={{textAlign:"center", paddingTop:"5px", fontSize:"1.8rem"}}>Shopping Cart</h2>
        {cartItems.length ?
                <div className='cart-inside'>
                    <div className='cart-items'>
                        <div className='cart-headers' style={{display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%"}}>
                            <p style={{fontSize:"1.2rem", fontWeight:"bold", margin:"0 10px",flexGrow:"1"}}>Base Items</p>
                            <p style={{whiteSpace:"nowrap", flexGrow:"1", margin:"5px 10px", textAlign:"right"}}>Price: &#8377; {baseItemsCost}</p>
                        </div>
                    <ul style={{padding:"10px"}} >
                        {cartItems.map(item=>
                            <CartItem
                                key={item.id}
                                item={item}
                                handleDelete={handleDelete}
                                handleIncreaseQty={handleIncreaseQty}
                                handleDecreaseQty={handleDecreaseQty}
                            />)
                        }
                    </ul>
                    </div>
                    <aside className='cart-aside'>
                        <div className="purchase">
                            <p style={{textAlign:"center", fontSize:"1.2rem", fontWeight:"bold", margin:"5px auto"}}>Total Amount: <span style={{whiteSpace:"nowrap"}}>&#8377; {total}</span></p>
                            <p style={{textAlign:"center"}}>{totalItems} {totalItems === 1? "Item" : "Items"}</p>
                            <p>Base Items: {totalCartItems} + Add ons: {totalAddons}</p>
                            <button style={{backgroundColor:"#82853e", color:"white", minHeight:"35px", display:"block", fontSize:"1rem", margin:"5px auto", border:"none", outline:"none", padding:"5px"}}>
                                Proceed to Purchase
                            </button>
                            <button 
                                style={{backgroundColor:"white", color:"#82853e", minHeight:"40px", display:"block", fontSize:"0.9rem", margin:"auto", border:"none", outline:"none", cursor:"pointer", textDecoration:"underline"}}
                                onClick = {handleDeleteAllItems}
                            >
                                Delete All Items
                            </button>
                        </div>
                        {isLoading && <p style={{margin: "5px"}}>Loading Addons...</p>}
                        {!isLoading && fetchError && <p style={{margin: "5px", color: "Red"}}>Network Error</p>}
                        {!isLoading && !fetchError &&
                            <div className='add-ons'>
                                <div className='cart-headers' style={{display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%"}}>
                                    <p style={{fontSize:"1.2rem", fontWeight:"bold", margin:"0 10px",flexGrow:"1"}}>Add Ons</p>
                                    <p style={{whiteSpace:"nowrap", flexGrow:"1", margin:"5px 10px", textAlign:"right"}}>Price: &#8377; {addonsCost}</p>
                                </div>
                                <ul className='addons-list'>
                                    {
                                        addons.map(item => 
                                            <Addon
                                                key={item.id}
                                                item={item}
                                                handleCheck = {handleCheck}
                                                handleIncreaseAddonQty={handleIncreaseAddonQty}
                                                handleDecreaseAddonQty ={handleDecreaseAddonQty}
                                            />
                                        )
                                    }
                                </ul>
                            </div>
                        }
                    </aside>
                </div>
                 :
            
            <p style={{textAlign:"center"}}>Cart Is Empty</p>
        
        }
        </div>

    )
}

export default Cart
