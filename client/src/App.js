import React from 'react';
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserSingleBook from './pages/UserSingleBook';
import UserProfile from './pages/UserProfile';
import Bookshelf from "./pages/Bookshelf";
import Favorites from "./pages/Favorites";
import Wishlist from "./pages/Wishlist";
import VisitProfile from "./pages/VisitProfile";
import AddToLibrary from './pages/AddToLibrary';
import PageNotFound from "./pages/404";
import './App.css'

import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [ authUser, setAuthUser ] = useState(null)

  const checkForValidUser = async() => {
    const authCheck = await fetch("/api/user/lookup")
    const checkAuthResult = await authCheck.json()
    if( checkAuthResult && checkAuthResult.result === "success" ){
      const userData = await fetch("/api/user/"+checkAuthResult.payload._id)
      const checkUserDataResult = await userData.json()
      if( checkUserDataResult && checkUserDataResult.result === "success" ){
        setAuthUser(checkUserDataResult.payload)
      }
    }
  }

  useEffect(() => {
    checkForValidUser()
  }, [])

  return (
    <div className="App">
      <Container>
        <Router>
        <Navbar authUser={ authUser } />
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile">
              <Route path=":username" element={<VisitProfile />} />
              <Route path="" element={<UserProfile authUser={authUser}/>} />
            </Route>
            <Route path="/:bookId" element={<UserSingleBook />} />
            <Route path="/Bookshelf" element={<Bookshelf authUser={authUser} />}></Route>
            <Route path="/Favorites" element={<Favorites authUser={authUser} />}></Route>
            <Route path="/Wishlist" element={<Wishlist authUser={authUser} />}></Route>
            <Route path="/AddBook" element={<AddToLibrary authUser={authUser} />}></Route>
            <Route path='*' element={<PageNotFound />}/>
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
