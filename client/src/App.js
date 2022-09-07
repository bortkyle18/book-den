import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserSingleBook from './pages/UserSingleBook';
import SingleBook from './pages/SingleBook';
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
        <Navbar authUser={authUser}/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="profile/:username" element={<VisitProfile />} />
            <Route path="MyProfile/:userId" element={<UserProfile />} />
            <Route path="MyBook/:bookId" element={<UserSingleBook />} />
            <Route path="/book/:username/:bookId" element={<SingleBook authUser={authUser} />} />
            <Route path="/Bookshelf/:userId" element={<Bookshelf />}></Route>
            <Route path="/Favorites/:userId" element={<Favorites />}></Route>
            <Route path="/Wishlist/:userId" element={<Wishlist />}></Route>
            <Route path="/AddBook/:userId" element={<AddToLibrary />}></Route>
            <Route path='*' element={<PageNotFound />}/>
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
