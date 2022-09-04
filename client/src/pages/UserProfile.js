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

        {/* dummy data table */}

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

export default UserProfile;
