import React, { useState } from "react";
import "./SignUp.css";

//function to make sure no usernames are the same
//each username has a name field-their real name

import SignUpFail1 from "../../../Popups/SignUpFails/SignUpFail1"

function SignUp(props) {
  const { db, setIsRegistering } = props;
  const [isShowing, setIsShowing] = useState(false);
  const [issue, setIssue] = useState(0); //number changes based on the issue

  return (
    <div className="screen">
      <SignUpFail1
        isShowing = {isShowing}
        setIsShowing = {setIsShowing}
        issue = {issue}
         
      />
      
      <div className="top">
        <div className="blueBubbleRev">Sign Up</div>
        <div className="pinkBubbleRev"></div>
      </div>
      <div className="bottom">
        <form
          className="createUserForm"
          onSubmit={event => {
            registerUser(event, db, setIsRegistering, setIsShowing, setIssue);
          }}
        >
          <div className="userLabel">username</div>
          <input type="text" name="username" className="name"></input>
          <br></br>
          <div className="passwordLabel">password</div>
          <input type="text" name="password" className="password"></input>
          <br></br>
          <input
            type="submit"
            className="submitLogin"
            value="create account"
          ></input>
          <div className="backToLogin" onClick={() => setIsRegistering(false)}>
            back to login
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

async function registerUser(e, db, setIsRegistering, setIsShowing, setIssue) {
  e.preventDefault();

  let username = e.target.elements.username.value;
  let password = e.target.elements.password.value;

  if (username === "") {
    setIssue(2)
    //alert("Must enter a username");
    setIsShowing(true)
  } else if (password === "") {
    setIssue(2)
    //alert("Must enter a password");
    setIsShowing(true)
  } else if (username.length < 2) {
    setIssue(0)
    //alert("Username is too short");
    setIsShowing(true)
  } else if (username.length > 12) {
    setIssue(0)
    //alert("Username exceeds character limit");
    setIsShowing(true)
  } else if (password.length < 2) {
    setIssue(0)
    //alert("Password is too short");
    setIsShowing(true)
  } else if (password.length > 12) {
    setIssue(0)
    //alert("Password exceeds character limit");
    setIsShowing(true)
  } else {
    const available = await checkUsername(username, db);
    if (available) {
      //if available
      await db
        .collection("Users")
        .doc(username)
        .set({
          name: username,
          password: password
        });

      setIsRegistering(false);
    } else {
      setIssue(1)
      //alert("Username already exists, choose a different username");
      setIsShowing(true)
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
