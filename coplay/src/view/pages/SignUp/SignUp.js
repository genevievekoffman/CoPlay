import React from "react";
import "./SignUp.css";

//function to make sure no usernames are the same
//each username has a name field-their real name

function SignUp(props) {
  const { db, setIsRegistering } = props;

  return (
    <div className="screen">
      <div className="top">
        <div className="blueBubbleRev">Sign Up</div>
        <div className="pinkBubbleRev"></div>
      </div>
      <div className="bottom">
        <form
          className="createUserForm"
          onSubmit={event => {
            registerUser(event, db, setIsRegistering);
          }}
        >
          <div className="userLabel">username</div>
          <input type="text" name="username" className="name"></input>
          <br></br>
          <div className="passwordLabel">password</div>
          <input type="text" name="password" className="password"></input>
          <br></br>
          <input type="submit" className="submitLogin" value="create account"></input>
          <div className="backToLogin" onClick={() => setIsRegistering(false)}>back to login</div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

async function registerUser(e, db, setIsRegistering) {
  e.preventDefault();

  let username = e.target.elements.username.value;
  let password = e.target.elements.password.value;

  if (username === "") {
    alert("Must enter a username");
  } else if (password === "") {
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
          password: password
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
