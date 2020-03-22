import React, { useEffect } from 'react'
import StudentsList from './componens/StudentsList'
import InputForm from './componens/InputForm'
import './App.css'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { studentAction , AuthActions } from './redux/store'
import LogingForm from './componens/LogingForm'
import { useState } from "react";


axios.defaults.withCredentials = true

const App = () => {

  const [loading , setLoading] = useState(true);
  const auth = useSelector (state => state.auth);
  const action = bindActionCreators({ ...studentAction, ...AuthActions}, useDispatch());
  console.log(auth);
  
  useEffect(()=>{
     action.getLoginStatus().then(res => setLoading(false));
  }, []);

  if(loading)
    return "loading..."

  if (!auth.accessToken&& !auth.psuInfo)
    return(
      <div>
        <LogingForm/>
      <button onClick ={()=>action.logout()}>Logout</button>
      
      </div>
    )
  return (
    <div>
      <InputForm />
      <StudentsList />
      <button onClick ={()=> action.logout()}>Logout</button>
      
    </div>
  );
}

export default App;
