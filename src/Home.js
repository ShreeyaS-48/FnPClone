import React from 'react'
import GiftsInTrend from './GiftsInTrend';
import BestSellers from './BestSellers';
import { Link } from 'react-router-dom';
import Item from './Item';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext } from 'react';
import DataContext from './context/DataContext';
const Home = () => {
    const {items, searchResults, handleAddToCart, handleDecreaseQty, handleDelete, handleIncreaseQty} = useContext(DataContext);
    var settings ={
            dots:true,
            infinite:true,
            speed:500,
            slidesToShow:1,
            slidesToScroll:1,
            nextArrow:null,
            prevArrow:null
    }
    return (
        <main className='home'>
            <ul className='home-items-display'>
                {searchResults.length <120 &&
                searchResults.map(item=>
                <Item
                    key = {item.id}
                    item={item}
                    handleAddToCart={handleAddToCart}
                    handleDelete={handleDelete}
                    handleIncreaseQty={handleIncreaseQty}
                    handleDecreaseQty={handleDecreaseQty}
                />)
                }
            </ul> 
            {searchResults.length === 0 && <p style={{textAlign:"center", width:"100%", height:"100px"}}>No items to display</p>}
            <GiftsInTrend/>
            <article className='products' style={{padding:"10px 0", margin:"15px auto 20px auto"}}>
                <h2>Our Products</h2>
                <div className='products-display' style={{display:"flex", alignItems:"center", justifyContent:"space-evenly"}}>
                    <figure>
                        <Link to="/cakes" style={{color: "black", textDecoration:"none"}}>
                            <img src="https://www.fnp.com/images/pr/l/v200/chocolate-trio-cake-half-kg_1.jpg" alt="cakes" />
                            <figcaption>Cakes</figcaption>
                        </Link>
                    </figure>
                    <figure>
                        <Link to="/bouquets"style={{color: "black", textDecoration:"none"}}>
                            <img src="https://www.fnp.com/images/pr/l/v200/blooming-joy-rose-bouquet_1.jpg" alt="bouquets" />
                            <figcaption>Bouquets</figcaption>
                        </Link>
                    </figure>
                    <figure>
                        <Link to = "/plants"style={{color: "black", textDecoration:"none"}}>
                            <img src="https://www.fnp.com/images/pr/l/v200/money-plant-in-colourfull-rajwada-printed-pot-hand-delivery_1.jpg" alt="plants" />
                            <figcaption>Plants</figcaption>
                        </Link>
                    </figure>
                    <figure>
                        <Link to="/chocolates" style={{color: "black", textDecoration:"none"}}>
                            <img src="https://www.fnp.com/images/pr/l/v200/chocolate-fusion-surprise_1.jpg" alt="chocolates" />
                            <figcaption>Chocolates</figcaption>
                        </Link>
                    </figure>
                    <figure>
                        <Link to="/combos" style={{color: "black", textDecoration:"none"}}>
                            <img src="https://www.fnp.com/images/pr/l/v200/luxe-love-orchids-bouquet-truffle-cake_1.jpg" alt="combos" />
                            <figcaption>Combos</figcaption>
                        </Link>
                    </figure>
                </div>
            </article>
            <div className='offers-slider-container'>
                <Slider {...settings}>
                    <div>
                        <img src="https://www.fnp.com/assets/images/custom/new-desk-home/offer-banners/desk_airtel_25may.jpg" alt="" />
                    </div>
                    <div>
                        <img src="https://www.fnp.com/assets/images/custom/new-desk-home/offer-banners/mobikwik_desk_07dec.jpg" alt="" />
                    </div>
                    <div>
                        <img src="https://www.fnp.com/assets/images/custom/new-desk-home/offer-banners/fnp_desktop_strip_29jun.jpg" alt="" />
                    </div>
                    <div>
                        <img src="https://www.fnp.com/assets/images/custom/new-desk-home/offer-banners/CRED1531X101-28624.jpg" alt="" />
                    </div>
                </Slider>
            </div>
            <BestSellers
                items={items.filter(item => parseInt(item.reviews) >= 80)}
            />
        </main>
    )
}

export default Home
