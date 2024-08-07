import { createContext, useState, useEffect } from "react";
import apiRequest from '../apiRequest';
const DataContext = createContext({});

export const DataProvider = ({children})=>{
    const [userName, setUserName] = useState("Guest");
    const [items, setItems] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const API_URL_ITEMS = "http://localhost:3500/items";
    const [searchedCakes, setSearchedCakes] = useState([]);
    const [searchedBouquets, setSearchedBouquets] = useState([]);
    const [searchedPlants, setSearchedPlants] = useState([]);
    const [searchedChocolates, setSearchedChocolates] = useState([]);
    const [searchedCombos, setSearchedCombos] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [priceRange, setPriceRange]= useState(0);
    const [ratingRange, setRatingRange] = useState(0);
    const [reviewRange, setReviewRange] = useState(0);
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await fetch(API_URL_ITEMS);
          if (!response.ok) {
            throw Error("Did not receive expected data");
          }
          const responseJson = await response.json();
          setItems(responseJson);
          setFetchError(null);
        } catch (err) {
          setFetchError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchItems();
    }, [API_URL_ITEMS]);
  
    useEffect(() => {
      const filterItems = () => {
        const filteredResults = items.filter(
          item => 
            ((item.title).toLowerCase().includes(search.toLowerCase()) || 
            (item.details).toLowerCase().includes(search.toLowerCase())) &&
            (priceRange === 1 ? parseInt(item.price) < 700 : 
            priceRange === 2 ? (parseInt(item.price) >= 700 && parseInt(item.price) < 1200) : 
            priceRange === 3 ? parseInt(item.price) >= 1200 : parseInt(item.price) > 0) &&
            (reviewRange === 1 ? parseInt(item.reviews) < 25 : 
            reviewRange === 2 ? (parseInt(item.reviews) >= 25 && parseInt(item.reviews) < 75) : 
            reviewRange === 3 ? parseInt(item.reviews) >= 75  : parseInt(item.reviews) > 0) &&
            (ratingRange === 1 ? parseFloat(item.rating) < 4.6 : 
            ratingRange === 2 ? (parseFloat(item.rating) >= 4.6 && parseFloat(item.rating) < 4.8) : 
            ratingRange === 3 ? parseFloat(item.rating) >= 4.8  : parseFloat(item.rating) > 0) 
        );
        setSearchResults(filteredResults);
        setSearchedCakes(filteredResults.filter(item => item.type === "cake"));
        setSearchedBouquets(filteredResults.filter(item => item.type === "bouquet"));
        setSearchedPlants(filteredResults.filter(item => item.type === "plant"));
        setSearchedChocolates(filteredResults.filter(item => item.type === "chocolate"));
        setSearchedCombos(filteredResults.filter(item => item.type === "combo"));
      };
  
      filterItems();
    }, [items, search, priceRange, reviewRange, ratingRange]);
    const handlePriceFilter=(filterNumber)=>{
      setPriceRange(filterNumber)
      if(filterNumber === 1)
      document.querySelector(".filters-list:nth-child(1) p").textContent = `Price: Less than 700`;
      else if(filterNumber === 2)
      document.querySelector(".filters-list:nth-child(1) p").textContent = `Price: 700 - 1200`;
      else if(filterNumber === 3)
      document.querySelector(".filters-list:nth-child(1) p").textContent = `Price: More than 1200`;
      else
      document.querySelector(".filters-list:nth-child(1) p").textContent = `Price`;
  }
   const handleRatingFilter = (filterNumber)=>{
    setRatingRange(filterNumber)
    if(filterNumber === 1)
    document.querySelector(".filters-list li:nth-of-type(2) p").textContent = `Rating: Less than 4.6`;
    else if(filterNumber === 2)
    document.querySelector(".filters-list li:nth-of-type(2) p").textContent = `Rating: 4.6 - 4.8`;
    else if(filterNumber === 3)
    document.querySelector(".filters-list li:nth-of-type(2) p").textContent = `Rating: More than 4.8`;
    else
    document.querySelector(".filters-list li:nth-of-type(2) p").textContent = `Rating`;
   }
   const handleReviewsFilter = (filterNumber)=>{
    setReviewRange(filterNumber)
    if(filterNumber === 1)
    document.querySelector(".filters-list li:nth-of-type(3) p").textContent = `Reviews: Less than 25`;
    else if(filterNumber === 2)
    document.querySelector(".filters-list li:nth-of-type(3) p").textContent = `Reviews: 25 - 75`;
    else if(filterNumber === 3)
    document.querySelector(".filters-list li:nth-of-type(3) p").textContent = `Reviews: More than 75`;
    else
    document.querySelector(".filters-list li:nth-of-type(3) p").textContent = `Reviews`;
   }
    useEffect(()=>{
      const storedCartItems = JSON.parse(localStorage.getItem('mycart')) ? JSON.parse(localStorage.getItem('mycart')):[];
      setCartItems(storedCartItems);
      setPriceRange(0);
      setReviewRange(0);
      setRatingRange(0);
    }, [])
    const handleAddToCart = async (id)=>{
        const newItems = items.map((item)=>item.id === id ? {...item, quantity: "1"}: item);
        setItems(newItems);
        const newCartItems = [...cartItems , newItems[id-1]];
        setCartItems(newCartItems);      
        const myItem =  newItems.filter((item)=>item.id === id);
        localStorage.setItem('mycart', JSON.stringify(newCartItems));
        const updateOptions = {
          method: 'PATCH',
          headers : {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({quantity: myItem[0].quantity})
        };
        const reqUrl = `${API_URL_ITEMS}/${id}`;
        const result = await apiRequest(reqUrl, updateOptions);
        if(result)
        setFetchError(result);
    }
    const handleDelete = async (id)=>{
      const newItems = items.map((item)=>item.id === id ? {...item, quantity: "0"}: item);
      setItems(newItems);
      const newCartItems = cartItems.filter(item => item.id !== id);
      setCartItems(newCartItems);
      localStorage.setItem('mycart', JSON.stringify(newCartItems));
      const myItem =  newItems.filter((item)=>item.id === id);
      const updateOptions = {
        method: 'PATCH',
        headers : {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({quantity: myItem[0].quantity})
      };
      const reqUrl = `${API_URL_ITEMS}/${id}`;
      const result = await apiRequest(reqUrl, updateOptions);
      if(result)
      setFetchError(result);
    }
    const handleIncreaseQty = async (id)=>{
      const newItems = items.map((item)=>item.id === id ? {...item, quantity : (parseInt(item.quantity)+1).toString()}: item);
      setItems(newItems);
      const newCartItems = newItems.filter(item => item.quantity !== "0");
      setCartItems(newCartItems);
      localStorage.setItem('mycart', JSON.stringify(newCartItems));
      const myItem = newItems.filter((item)=>item.id === id);
      const updateOptions = {
        method: 'PATCH',
        headers : {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({quantity: myItem[0].quantity})
      };
      const reqUrl = `${API_URL_ITEMS}/${id}`;
      const result = await apiRequest(reqUrl, updateOptions);
      if(result)
      setFetchError(result);
    }
    const handleDecreaseQty = async (id)=>{
      const newItems = items.map((item)=>item.id === id ? {...item, quantity : (parseInt(item.quantity)-1).toString()}: item);
      setItems(newItems);
      const newCartItems = newItems.filter(item => item.quantity !== "0");
      setCartItems(newCartItems);
      localStorage.setItem('mycart', JSON.stringify(newCartItems));
      const myItem = newItems.filter((item)=>item.id === id);
      const updateOptions = {
        method: 'PATCH',
        headers : {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({quantity: myItem[0].quantity})
      };
      const reqUrl = `${API_URL_ITEMS}/${id}`;
      const result = await apiRequest(reqUrl, updateOptions);
      if(result)
      setFetchError(result);
    }
    return(
        <DataContext.Provider value={{
            userName, setUserName, search, setSearch, cartItems, handleDelete, items, setItems, setCartItems, API_URL_ITEMS, handleIncreaseQty, handleDecreaseQty, searchedCakes, isLoading, fetchError, handleAddToCart, handlePriceFilter, handleReviewsFilter, handleRatingFilter, searchedBouquets, searchedPlants, searchedChocolates, searchedCombos, searchResults
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;