import React, { useState } from "react";
import "./App.css";
import firebase from "firebase";

import Rewards from "./view/pages/Rewards/Rewards";
import Tasks from "./view/pages/Tasks/Tasks";
import LeaderBoard from "./view/pages/LeaderBoard/LeaderBoard";
// import { useSwipeable, Swipeable } from 'react-swipeable'


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
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("loggedIn"));
  const [isRegistering, setIsRegistering] = useState(false);

  const [homePage, setHomePage] = useState(false); //for changing to task page from groups
  const [groupID, setGroupID] = useState("");
  const [name, setName] = useState("");
  //useEffect(() => updateTasks(setTasksList), []);
  const [logout, setLogout] = useState(false)


  //const [points, setPoints] = useState(false);
  const style = {
    "@media (min-width : 500px": {
      width: "400px"
    }
  };

  if (logout) {
    checkLogin(setIsLoggedIn, setLogout)
  }

  if (!isLoggedIn) {
    if (!isRegistering) {
      return (
        <div className="App">
          <div className="screen">
            <div className="top">
              <div className="pinkBubble"></div>
              <div className="blueBubble">Coplay</div>
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
        <div>
          <button id="NavButton LogOut" onClick={() => setLogout(true)}>Log Out</button>
          <Groups
            db={DB}
            setGroupID={setGroupID}
            setHomePage={setHomePage}
            setName={setName}
          />
        </div>
      );
    }
    return (
      <Router>
        <div>
          <div id="dock">
            <button id="NavButton GroupOut" onClick={() => setHomePage(false)}>Back to Groups</button>
            <div className="link" onSelect={() => null}>
              <Link to="/leaderboardpage">Leaderboard</Link>
            </div>
            <div className="link" eventKey="1">
              <Link to="/">Tasks</Link>
            </div>
            <div className="link">
              <Link to="/rewardspage">Rewards</Link>
            </div>
            <div></div>
          </div>
          <Switch>
            <Route exact path="/leaderboardpage">

              <LeaderBoard db={DB} groupID={groupID} setLogout={setLogout} />
            </Route>
            <Route exact path="/">
              <Tasks db={DB} groupID={groupID} name={name} />
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

  if (username === "") {
    alert("Must enter a username");
  } else if (password === "") {
    alert("Must enter a password");
  } else {
    var docRef = DB.collection("Users").doc(username);
    docRef.get().then(function (doc) {
      if (doc.exists) {
        if (password === doc.data().password) {
          console.log("passwords match");
          sessionStorage.setItem("user", username); //saves to local storage
          sessionStorage.setItem("loggedIn", true)
          setIsLoggedIn(sessionStorage.getItem("loggedIn"));
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

function checkLogin(setIsLoggedIn, setLogout) {
  console.log("running")
  sessionStorage.removeItem("loggedIn")
  sessionStorage.removeItem("user")

  setLogout(false)

  setTimeout(function () {
    setIsLoggedIn(false)
  }, 500)
}

export default App;
