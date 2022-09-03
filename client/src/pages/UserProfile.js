import "./UserProfile.css";
import { useState } from "react";

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
    <div>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <input
        onChange={() => handlePasswordInputChange}
        id="passwordInput"
        type="text"
      ></input>
      <button onClick={() => handleChangePassword()}>Change password</button>
    </div>
  );
};

export default UserProfile;
