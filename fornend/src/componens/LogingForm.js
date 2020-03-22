import React from 'react'
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { AuthActions }  from "../redux/store";


const LogingForm =()=>{
    const [infor , setinfor] = useState({
        username : "",
        password : ""
    })
    const action = bindActionCreators(AuthActions, useDispatch());
    const [facebookLink, setFacebookLink] = useState('');
    const getFacebookLink = async () =>{
        const res = await axios.get(`http://localhost:8000/auth/facebook`);
        setFacebookLink(res.data);
    }

    useEffect(()=>{
        getFacebookLink();
    },[]);
    const loginPSU = (e) =>{
        action.loginPSU(infor)
    }
    
    return(
        <div>
            <div>
                facebook login click <a href={facebookLink}>loginfacebook</a>
            </div>
            <div>
                <h2>PSU passport AuthActions (SOAP)</h2>
                {/* <form onSubmit = {loginPSU }> */}
                    Username: <input type='type' name='username' onChange = {(e)=>{setinfor({username : e.target.value,...infor})}} /> <br />
                    Password: <input type='Password' name='Password'onChange = {(e)=>{setinfor({password : e.target.value,...infor})}} /> <br />
                    <button onClick={(e)=>loginPSU(e) }  value='Submit' >login</button>
                {/* </form> */}
            </div>
        </div>
    )
}

export default LogingForm;