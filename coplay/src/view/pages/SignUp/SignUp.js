import React, { useState } from "react";
import "./SignUp.css";

//function to make sure no usernames are the same
//each username has a name field-their real name

function SignUp(props) {
  const { db, setIsRegistering } = props;

  return (
    <div className="grid">
      <div id="leftCol"></div>
      <div id="LogIn">Coplay</div>
      <div id="slogan">
        Coexisting sounds hard but<br></br>CoPlay sounds like fun
      </div>

      <form
        id="createUserForm"
        onSubmit={event => {
          registerUser(event, db, setIsRegistering);
        }}
      >
        <div id="formFlex">
          <div id="userLabel">Username</div>
          <input type="text" name="username" id="name"></input>
          <br></br>
          <div id="passwordLabel">Password</div>
          <input type="text" name="password" id="password"></input>
          <br></br>
          <input type="submit" id="submitLogin" value="Create Account"></input>
        </div>
        <img src="sketchImages/lego.png"></img>
      </form>
    </div>
  );
}

export default SignUp;

async function registerUser(e, db, setIsRegistering) {
  e.preventDefault();

  let username = e.target.elements.username.value;
  let password = e.target.elements.password.value;

  if (username == "") {
    alert("Must enter a username");
  } else if (password == "") {
    alert("Must enter a password");
  } else {
    const available = await checkUsername(username, db);
    if (available) {
      //if available
      await db
        .collection("Users")
        .doc(username)
        .set({
          name: username,
          password: password,
          totalPoints: 0
        });
       
      setIsRegistering(false);
    } else {
      alert("Username already exists, choose a different username");
    }
  }
}

async function checkUsername(username, db) {
  //returns false if the username already exists

  let available = true;
  const IDusersDB = await db.collection("Users").get();
  IDusersDB.forEach(userDB => {
    if (userDB.get("name") == username) {
      available = false;
    }
  });
  return available;
}
