import "./UserProfile.css";
import { useState } from "react";

// upload image breaks page but functionality works ??? HELp

// const image_input = document.querySelector("#image_input");
// var uploaded_image = "";

// image_input.addEventListener("change", function () {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => {
//     uploaded_image = reader.result;
//     document.querySelector(
//       "#display_image"
//     ).style.backgroundImage = `url(${uploaded_image})`;
//   });
//   reader.readAsDataURL(this.files[0]);
// });

const UserProfile = (props) => {
  const [newPassword, setNewPassword] = useState("");
  let user = props.user;
  if (!user) {
    user = {
      username: "testuser",
      password: "testpassword",
    };
  }
  const handlePasswordInputChange = (event) => {
    setNewPassword(event.target.value);
  };
  const handleChangePassword = async () => {
    console.log("Changepassword");
    let data = {
      username: user.username,
      newPassword: newPassword,
    };

    class Book {
      constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
      }
    }

    // UI Class: Handle UI Tasks
    class UI {
      static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
      }

      static addBookToList(book) {
        const list = document.querySelector("#book-list");

        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
      }

      static deleteBook(el) {
        if (el.classList.contains("delete")) {
          el.parentElement.parentElement.remove();
        }
      }

      static showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector(".alert").remove(), 3000);
      }

      static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
      }
    }

    // Store Class: Handles Storage
    class Store {
      static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
          books = [];
        } else {
          books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
      }

      static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
      }

      static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
          if (book.isbn === isbn) {
            books.splice(index, 1);
          }
        });

        localStorage.setItem("books", JSON.stringify(books));
      }
    }

    // Event: Display Books
    document.addEventListener("DOMContentLoaded", UI.displayBooks);

    // Event: Add a Book
    document.querySelector("#book-form").addEventListener("submit", (e) => {
      // Prevent actual submit
      e.preventDefault();

      // Get form values
      const title = document.querySelector("#title").value;
      const author = document.querySelector("#author").value;
      const isbn = document.querySelector("#isbn").value;

      // Validate
      if (title === "" || author === "" || isbn === "") {
        UI.showAlert("Please fill in all fields", "danger");
      } else {
        // Instatiate book
        const book = new Book(title, author, isbn);

        // Add Book to UI
        UI.addBookToList(book);

        // Add book to store
        Store.addBook(book);

        // Show success message
        UI.showAlert("Book Added", "success");

        // Clear fields
        UI.clearFields();
      }
    });

    // Event: Remove a Book
    document.querySelector("#book-list").addEventListener("click", (e) => {
      // Remove book from UI
      UI.deleteBook(e.target);

      // Remove book from store
      Store.removeBook(
        e.target.parentElement.previousElementSibling.textContent
      );

      // Show success message
      UI.showAlert("Book Removed", "success");
    });

    // needs endpoint set up
    await fetch("http://127.0.0.1:3001/myendpoint", {
      method: "POST",
      body: data,
    });
  };
  return (
    <body>
      <div className="userNav">
        <a className="button" href="">
          <div className="logout">
            LOGOUT{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-book"
              viewBox="0 0 16 16"
            >
              <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
            </svg>
          </div>
        </a>
      </div>
      <div>
        <input
          type="file"
          id="image_input"
          accept="image/png, image/jpg"
        ></input>
        <div id="display_image"></div>
        <br />

        <p>
          <span style={{ fontWeight: "bold" }}>Username:</span> Hoffman
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>User email:</span>
          Tomhoffmanco@gmail.com
        </p>
        <br />

        <div class="container mt-4">
          <h1 class="display-4 text-center">
            <i class="fas fa-book-open text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-book"
                viewBox="0 0 16 16"
              >
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
              </svg>
            </i>{" "}
            Book
            <span class="text-primary">Wish</span>List
          </h1>
          <form id="book-form">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" id="title" class="form-control"></input>
            </div>
            <div class="form-group">
              <label for="author">Author</label>
              <input type="text" id="author" class="form-control"></input>
            </div>
            <div class="form-group">
              <label for="isbn">ISBN#</label>
              <input type="text" id="isbn" class="form-control"></input>
            </div>
            <input
              type="submit"
              value="Add Book"
              class="btn btn-primary btn-block"
            ></input>
          </form>
          <table class="table table-striped mt-5">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN#</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="book-list"></tbody>
          </table>
        </div>

        <br />
        <br />
        <br />
        <div id="password">
          <input
            onChange={() => handlePasswordInputChange}
            id="passwordInput"
            type="text"
          ></input>
          <button onClick={() => handleChangePassword()}>
            Change password
          </button>
        </div>
      </div>
    </body>
  );
};

// export const searchGoogleBooks = (query) => {
//   return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
// };

export default UserProfile;

// breaks page ??
// const handleChangePassword = async (e) => {
//   e.preventDefault()
//   const passChange = {password: newPassword}
//   console.log("Changepassword");
//   let newPassword = await fetch("/api/user/"+{props.authUser._id},{
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(passChange)
//   // needs work try array passing data
//   };
