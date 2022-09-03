import "./WishList.css";
import { useEffect, useState } from "react";
import { response } from "express";

const UserProfile = (props) => {
  const [wishlist, setWishList] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:3001/getwishlist")
.then(response => {
  setWishList(response.json())
})
.catch(err => {
  console.log(err)
})

  })
  return (
    <>
      <header>
        <div class="container">
          <h3 class="header__username">Book Den </h3>
          <h1 class="header__title">Wish List</h1>
        </div>
      </header>

      <main>
        <div class="container">
          <input
            class="submission-line__input"
            type="text"
            maxlength="20"
            placeholder="Enter new book here..."
          />
          <button class="submission-line__btn">Add</button>

          <ul class="list">
            {wishlist.map((wishlistItem) => {
            <li class="list__item">
          <a href="javascript:void(0)" class="list__delete-btn">
            X
          </a>
          {wishlistItem.title}
          <a href="javascript:void(0)" class="list__check-btn">
            ✔
          </a>
        </li>
 
            })
         
                </ul> 
        </div>
      </main>
    </>
  );
};

export default UserProfile;
