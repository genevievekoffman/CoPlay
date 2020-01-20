import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase";

import { Manager, Reference, Popper } from "react-popper";

import Rewards from "./view/pages/Rewards/Rewards";
import Tasks from "./view/pages/Tasks/Tasks";
import LeaderBoard from "./view/pages/LeaderBoard/LeaderBoard";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import SignUp from "./view/pages/SignUp/SignUp";

import Groups from "./view/pages/Groups/Groups";

//Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAQrMqvW5LWBc2rXz-ve-jdgUnwXGtT9Gk",
  authDomain: "coplay-85fcb.firebaseapp.com",
  databaseURL: "https://coplay-85fcb.firebaseio.com",
  projectId: "coplay-85fcb",
  storageBucket: "coplay-85fcb.appspot.com",
  messagingSenderId: "665171121143",
  appId: "1:665171121143:web:26c80d193d2c122876d4f2",
  measurementId: "G-FY38M8DQM6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const DB = firebase.firestore();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [homePage, setHomePage] = useState(false); //for changing to task page from groups
  const [groupID, setGroupID] = useState("");
  const [name, setName] = useState("");
  //useEffect(() => updateTasks(setTasksList), []);

  //const [points, setPoints] = useState(false);
  const style = {
    "@media (min-width : 500px": {
      width: "400px"
    }
  };

  if (!isLoggedIn) {
    if (!isRegistering) {
      return (
        <div className="App">
          <div className="screen">
            <div className="top">
              <div className="pinkBubble"></div>
              <div className="blueBubble">Login</div>
            </div>
            <div className="bottom">
              <form
                className="signInForm"
                onSubmit={event => {
                  checkUser(event, setIsLoggedIn);
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
                  value="login"
                ></input>
                <div
                  className="signUp"
                  onClick={() => newUser(setIsRegistering)}
                >
                  sign up
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      //they clicked the create new user
      return (
        <div className="App3">
          <SignUp db={DB} setIsRegistering={setIsRegistering} />
        </div>
      );
    }
  } else {
    //someone is logged in
    if (!homePage) {
      return (
        <Groups
          db={DB}
          setGroupID={setGroupID}
          setHomePage={setHomePage}
          setName={setName}
        />
      );
    }
    return (
      //use task state to get the name of the group
      <Router>
        <div>
          <ul className="topNav">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" eventKey="1">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <button onClick={() => setHomePage(false)}>Back to Groups</button>
              <Navbar.Collapse id="responsive-navbar-nav">
                {/* <Nav className="mr-auto"> */}
                  <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <li className="link">
                      <Link to="/leaderboardpage">Leaderboard Page</Link>
                    </li>
                    <li className="link">
                      <Link to="/">Tasks Page</Link>
                    </li>
                    <li className="link">
                      <Link to="/rewardspage">Rewards page</Link>
                    </li>
                  </NavDropdown>
                {/* </Nav> */}
                <Nav>
                  <button onClick={() => setIsLoggedIn(false)}>Log Out</button>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </ul>

          <h1>{name}</h1>

          <Switch>
            <Route exact path="/leaderboardpage">
              <LeaderBoard db={DB} groupID={groupID} />
            </Route>
            <Route exact path="/">
              <Tasks db={DB} groupID={groupID} />
            </Route>
            <Route path="/rewardspage">
              <Rewards db={DB} groupID={groupID} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function checkUser(e, setIsLoggedIn) {
  e.preventDefault();

  let username = e.target.elements.username.value;
  let password = e.target.elements.password.value;

  if (username == "") {
    alert("Must enter a username");
  } else if (password == "") {
    alert("Must enter a password");
  } else {
    var docRef = DB.collection("Users").doc(username);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        if (password === doc.data().password) {
          console.log("passwords match");
          sessionStorage.setItem("user", username); //saves to local storage
          setIsLoggedIn(true);
        } else {
          console.log("passwords dont match");
          alert("Either the username or password is incorrect");
        }
      }
    });
  }

  e.target.elements.username.value = "";
  e.target.elements.password.value = "";
}

function newUser(setIsRegistering) {
  console.log("new user clicked");
  setIsRegistering(true);
}

export default App;
