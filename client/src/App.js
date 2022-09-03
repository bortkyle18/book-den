import React from 'react';
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Navbar from "./components/Navbar";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import PageNotFound from "./pages/404";
import './App.css'

import "bootstrap/dist/css/bootstrap.min.css"
// import { Navbar } from 'react-bootstrap';

function App() {
  // const [ authUser, setAuthUser ] = useState(null)

  // const checkForValidUser = async() => {
  //   const authCheck = await fetch("/api/user/lookup")
  //   const checkResult = await authCheck.json()
  //   if( checkResult && checkResult.result === "success" ){
  //     setAuthUser(checkResult.payload)
  //   }
  // }
  
  // useEffect(() => {
  //   checkForValidUser()
  // }, [])

  return (
    <div className="App">
      <Container>
        <Router>
        <Navbar />
        <Routes>
            <Route 
              path="/" 
              element={<Home/>} 
            />
            
            <Route 
              path='*' 
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
