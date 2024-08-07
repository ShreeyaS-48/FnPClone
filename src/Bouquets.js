import React from 'react'
import Item from './Item'
import Filter from './Filter';
import DataContext from './context/DataContext';
import { useContext } from 'react';
const Bouquets = () => {
    const {searchedBouquets , isLoading, fetchError, handleAddToCart, handleDelete, handleIncreaseQty, handleDecreaseQty, handlePriceFilter, handleRatingFilter, handleReviewsFilter} = useContext(DataContext);
     return (
        <>
            {isLoading && <p style={{margin: "5px"}}>Loading Bouquets...</p>}
            {!isLoading && fetchError && <p style={{margin: "5px", color: "Red"}}>Network Error</p>}
            {!isLoading && !fetchError &&
                    <main className="items-page">
                    <Filter
                        handlePriceFilter={handlePriceFilter}
                        handleRatingFilter={handleRatingFilter}
                        handleReviewsFilter={handleReviewsFilter}
                    />
                    {searchedBouquets.length ? 
                        <ul className='items-display'>
                            {searchedBouquets.map(item=>
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
                    : 
                        <p style={{display:"grid",placeContent:"center", width:"100%", minHeight:"85vh", marginTop:"100px"}}>No items to display.</p>
                    }
                    </main>
            }
        </>
    )
}

export default Bouquets
