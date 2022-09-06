import "./WishList.css";
import { useEffect, useState } from "react";
import { getBooks } from "../actions/books.actions";
import { BookCard } from "../components/BookCard";

const UserProfile = (props) => {
  const [wishlist, setWishList] = useState([]);
  const [searchText, setSearchText] = useState("");
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

  const getBookData = () => {
    getBooks(searchText).then((res) => {
      setWishList(res.data.items);
      console.log(wishlist);
    });
  };
  return (
    <>
      <header>
        <div className="container">
          <h3 className="header__username">Book Den </h3>
          <h1 className="header__title">Wish List</h1>
        </div>
      </header>

      <main>
        <div className="container">
          <input
            className="submission-line__input"
            type="text"
            maxLength="20"
            placeholder="Enter new book here..."
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={getBookData} className="submission-line__btn">
            Add
          </button>

          <ul className="list">
            {wishlist.map((book) => (
              <BookCard book={book} />
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

// export const searchGoogleBooks = (query) => {
//   return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
// };

export default UserProfile;
