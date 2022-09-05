import "./WishList.css";
import { useEffect, useState } from "react";

const Wishlist = (props) => {
  const [wishlist, setWishList] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:3001/api/book")
      .then((response) => {
        response
          .json()
          .then((result) => {
            setWishList(result.payload);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <header>
        <div className="container">
          <h3 className="header__username">Book Den </h3>
          <h1 className="header__title">My Wish List</h1>
        </div>
      </header>

      <main>
        <div className="container">
          <input
            className="submission-line__input"
            type="text"
            maxLength="20"
            placeholder="Enter new book here..."
          />
          <button className="submission-line__btn">Add</button>

          <ul className="list">
            {wishlist.map((wishlistItem) => (
              <li className="list__item">
                <a href="javascript:void(0)" className="list__delete-btn">
                  X
                </a>
                {wishlistItem.bookTitle}
                <a href="javascript:void(0)" className="list__check-btn">
                  ✔
                </a>
              </li>
            ))}
          </ul>
          <div>
            <footer className="footer">
              <div className="row">
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Our Services</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <a href="#">Contact us</a>
                    </a>
                  </li>
                </ul>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </>
  );
};


export default Wishlist;