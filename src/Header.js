import React from 'react'
import { useContext } from 'react';
import DataContext from './context/DataContext';
import {FaShoppingCart, FaUserCircle, FaSearch, FaMapMarker, FaArrowRight} 
from 'react-icons/fa';
import{ Link } from 'react-router-dom';
const Header = () => {
    const {userName, search, setSearch, cartItems} = useContext(DataContext);
    return (
        <header className='header'>
            <Link to="/">
                <figure>
                    <img src="favicon.png" alt="Ferns n Petals Logo" />
                </figure>
            </Link>
            <div className='header-forms'>
                <form onSubmit={(e)=>e.preventDefault()}>
                    <label htmlFor='search-items'>
                        Search Items
                    </label>
                    <input 
                        id='search-items'
                        type='text'
                        required
                        placeholder='Search flowers, gifts, cakes, etc.'
                        value = {search}
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                    <button type='submit'>
                        <FaSearch className='search-icon'/>
                    </button>
                </form>
                <form>
                    <button>
                        <FaMapMarker className='map-icon'/>
                    </button>
                    <label htmlFor='set-location'>
                        Set Location
                    </label>
                    <input
                        id='set-location'
                        type='number'
                        min='100000'
                        max='999999'
                        required
                        placeholder='Enter Pincode'
                    >
                    </input>
                    <button
                        type='submit'    
                    >
                        <FaArrowRight className='map-icon'/>
                    </button>
                </form>
            </div>
            <div className='cart-and-user'>
                <Link to ="/cart" style={{color:"white", textDecoration:"none"}}>
                    <FaShoppingCart/>
                    <p>{cartItems.length} {cartItems.length === 1 ? "Item": "Items"}</p>
                </Link> 
                <div>
                    <Link to="/login" style={{color:"white", textDecoration:"none"}}>
                        <FaUserCircle/>
                        <p>Hi {userName}</p>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header
