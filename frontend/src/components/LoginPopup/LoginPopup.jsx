import React, { useState, useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext);

    const [currState, setCurrState] = useState("Sign Up");
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }


    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if(currState==="Login"){
            newUrl += "/api/user/login";
        }
        else{
            newUrl += "/api/user/register";
        }

        try {
            const response = await axios.post(newUrl, data);
            if (response?.data?.success) {
                if (typeof setToken === 'function') setToken(response.data.token);
                try { localStorage.setItem("token", response.data.token); } catch (e) { /* ignore */ }
                setShowLogin(false);
            } else {
                const msg = response?.data?.message || 'Request failed';
                alert(msg);
            }
        } catch (err) {
            console.error('Login/register request failed', err);
            const msg = err?.response?.data?.message || err.message || 'Network error';
            alert(msg);
        }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className='login-popup-title'>
                <h2>{currState }</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className='login-popup-inputs'>
                {currState==="Login" ? <></> : <input name="name" value={data.name} type="text" placeholder='Your Name' required onChange={onChangeHandler} />}
                <input name="email" type="email" placeholder='Email Address' required value={data.email} onChange={onChangeHandler} />
                <input name="password" value={data.password} type="password" placeholder='Password' required onChange={onChangeHandler} />
            </div>
            <button type='submit'>{currState==="Sign Up" ? "Create Account" : "Log In"}</button>
            <div className="login-popup-condition">
                <label>
                    <input type="checkbox" required />
                    <span>I agree to the terms and conditions</span>
                </label>
            </div>
            {currState==="Login" ?  
            <p>Create a new Account? <button type="button" className="link-button" onClick={()=>setCurrState("Sign Up")}>Click Here</button></p>
            :<p>Already have an account? <button type="button" className="link-button" onClick={()=>setCurrState("Login")}>Login Here</button></p>}
        </form>
    </div>
  )
}

export default LoginPopup