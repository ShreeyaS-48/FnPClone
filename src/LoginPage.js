import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import DataContext from './context/DataContext';
import { useContext } from 'react';
const LoginPage = () => {
    const {setUserName} = useContext(DataContext);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const navigate =useNavigate();
    const [userDetails, setUserDetails] = useState({
        name: "Guest",
        number:"",
        email:""
    });
    const handleSubmit = ()=>{
        if(newName.length === 0||newEmail.length === 0|| newNumber.length === 0)
        {
            alert("Please fill in all the fields");
        }
        else{
            setUserName(newName);
            const newUserDetails ={
                name: newName, number: newNumber, email:newEmail
            }
            setUserDetails(newUserDetails);
            localStorage.setItem('user-details', JSON.stringify(newUserDetails));
            navigate('/');
        }
    }
    const handleLogout = ()=>{
        setUserName("Guest")
        setUserDetails({name:"", number:"", email:""})
        localStorage.setItem('user-details', JSON.stringify({name:"Guest", email:"", number:""}))
        navigate("/");
    }
    useEffect(()=>{
        const storedUserDetails = JSON.parse(localStorage.getItem('user-details'));
        setUserDetails(storedUserDetails);
        setUserName(storedUserDetails.name);
    },[setUserName])
    return (
        <main className='login-page'>
            {userDetails.name ==="Guest" &&
        <form className="form">
            <h2>Login</h2>
            <label htmlFor='name'>Name: </label>
            <input
            type="text"
            value={newName}
            id="name"
            onChange={(e)=>setNewName(e.target.value)}
            required
            autoFocus/>
            <label htmlFor='email'>Email:</label>
            <input
            type="email"
            value={newEmail}
            id="email"
            onChange={(e)=>setNewEmail(e.target.value)}
            required
            />
            <label htmlFor='mobile'>Mobile: </label>
            <input
            type="tel"
            value={newNumber}
            id="mobile"
            onChange={(e)=>setNewNumber(e.target.value)}
            required
            />
            <button
                type="button" onClick={handleSubmit}
                style={{display:"block", backgroundColor:"#82853e", color:"white", border:"none", outline:"none", padding: "7px", borderRadius:"3px", margin:"10px auto", textDecoration:"none"}}>  
                Submit
            </button>
        </form>
}
    {userDetails.name !== "Guest" &&
    <div className='form'>
        <h2>Profile</h2>
        <p style={{minHeight:"30px"}}><span style={{fontWeight:"bold"}}>Name:</span> {userDetails.name}</p>
        <p style={{minHeight:"30px"}}><span style={{fontWeight:"bold"}}>Email:</span> {userDetails.email}</p>
        <p style={{minHeight:"30px"}}><span style={{fontWeight:"bold"}}>Number:</span> {userDetails.number}</p>
        <button style={{width:"100px", backgroundColor:"#82853e", color:"white", border:"none", outline:"none", padding: "5px", borderRadius:"3px", margin:"10px auto", textDecoration:"none", cursor:"pointer"}} type="button" onClick={handleLogout}>Logout</button>
    </div>
}
        </main>
    )
}

export default LoginPage
