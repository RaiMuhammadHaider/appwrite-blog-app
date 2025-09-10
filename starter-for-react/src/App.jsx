import React from "react";
import "./App.css";
import { Home , Footer } from "./Components";
import { useDispatch } from 'react-redux' 
import AuthService from "./lib/Auth";
import { useState, useEffect } from "react";
import { login, logout } from "./store/authSlice";
import {Outlet} from "react-router-dom"



function App() {
  const [Loading , setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect( 
    ()=>{
 AuthService.currentUser().then((userData)=>{
  if (userData) {
    dispatch(login(userData))
  }
  else{
    dispatch(logout())
  }
}).finally(()=> setLoading(false))
    }
  , [])
  

  

  return Loading? (<div>Loading...</div>
  ) : (
    <div className="App">
      <Home />
      <main>Todo    </main>
    
      <Footer />
    </div>
  );
}

export default App;
