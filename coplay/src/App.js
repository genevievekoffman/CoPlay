import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase";
import Task from "./view/Task/Task";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';

//pages

import Rewards from './view/pages/Rewards/Rewards';
import Tasks from './view/pages/Tasks/Tasks';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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

  //useEffect(() => updateTasks(setTasksList), []);

  //const [points, setPoints] = useState(false);


  if (!isLoggedIn) {
    return (
      <div className="App">

        <div className="grid">
          <div id="leftSide"></div>
          <div id="LogIn">Coplay</div>
          <div id="slogan">Coexisting sounds hard but<br></br>CoPlay sounds like fun</div>

          <img id="logo" src="./sketchImages/coplayLogo.jpeg"></img>
          <div id="signIn">Sign in to Coplay</div>
          <form id="signInForm" onSubmit={event => { checkUser(event, setIsLoggedIn); }}>
            <div id="formFlex">
              <div id="userLabel">Username</div>
              <input type="text" name="username" id="name"></input>
              <br></br>
              <div id="passwordLabel">Password</div>
              <input type="text" name="password" id="password"></input>
              <br></br>
              <input type="submit" id="submitLogin" value="Sign In"></input>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    //someone is logged in
    return (
      <Router>
        <div>
           
          <ul className = "topNav">
            <div></div>
            <div></div>
            <div></div>
            <li className="link">
              <Link to="/">Tasks Page</Link>
            </li>
            <li className="link">
              <Link to="/rewardspage">Rewards page</Link>
            </li>
            <div></div>
            <div></div>
            <div></div>
          </ul>
          <Switch>
            <Route exact path="/">
              <Tasks db = {DB} />
            </Route>
            <Route path="/rewardspage">
              <Rewards db = {DB} />

            </Route>
          </Switch>
           
        </div>
      </Router>
    );
  }
}

function checkUser(e, setIsLoggedIn) {
  e.preventDefault();
  console.log("function called");

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

export default App;
 
 
 

// function Example(props) {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>


//       <Button variant="primary" id = "PopUpButton" onClick={handleShow}>
//         +
//       </Button>

//       <Modal show={show} onHide={handleClose}>

//         <Modal.Header closeButton>
//           <Modal.Title>Add Task</Modal.Title>
//         </Modal.Header>
//         {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
//         <Modal.Footer>
//         <Form id = "kkk">
//   <Form.Group controlId="formGroupEmail">
//     <Form.Label>Title</Form.Label>
//     <Form.Control type="email" placeholder="Enter email" />
//   </Form.Group>
//   <Form.Group controlId="formGroupPassword">
//     <Form.Label>Points</Form.Label>
//     <Form.Control type="password" placeholder="Password" />
//   </Form.Group>
//           <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Add
//           </Button>
// </Form>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

