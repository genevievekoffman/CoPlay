import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase";
import Task from "./view/Task/Task";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';

//pages

import Rewards from './view/pages/Rewards/Rewards';

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
              <Link to="/">Task Page</Link>
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
              <Tasks />
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
      } else {
        console.log("no info found");
      }
    });
  }

  e.target.elements.username.value = "";
  e.target.elements.password.value = "";
}

export default App;

function Tasks() {
  const [counter, setCounter] = useState(0);
  const [tasksLists, setTasksList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  if (counter == 0) {
    updateTasks(setTasksList, setCounter);
  }

  return (
    <div className="App2">

      <div>
        <h4>
          {tasksLists.map((task, index) => {
            return <Task task={task} key={index} db={DB} />;
          })}
        </h4>
      </div>


      <div className="AddTask" name="AddTask">
        {showForm && <AddTaskForm onCancel={() => setShowForm(false)} />}

        <button className="addTaskBtn" id="PopUp" onClick={() => setShowForm(!showForm)}>
          +
          </button>
      </div>

      <div id="points" className="points"></div>
      <img className="profileIcon" src="sketchImages/blackprofileicon.png" onClick={
        displayPoints

      }></img>

    </div>
  );
}



function AddTaskForm(props) {
  console.log("form opened");
  return (
    <div name="PopUp" className="PopUp">
    <button name="cancel" className="Cancel" value="Cancel" onClick={props.onCancel} >X</button>
      <div id="grid">
        <form id = "form"
          onSubmit={event => {
            addTask(event);
          }}
        >
          <div id="TitleAddTask">Add Task</div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            id="Title"
          ></input>
          <input
            type="text"
            name="points"
            placeholder="Points"
            id="Points"
          ></input>
          <div className="button">
            <input type="submit" name="save" id="Save" value="Save"></input>
          </div>
        </form>

        
         
      
      </div>
    </div>
  );
}

function addTask(event) {
  event.preventDefault();

  console.log("saved my G");
  let title = event.target.elements.title.value;
  let points = parseInt(event.target.elements.points.value);
  if (title == "") {
    alert("Must enter a title");
  } else if (points == "") {
    alert("Must enter points");
  } else {
    console.log(title);
    console.log(points);
    DB.collection("Tasks")
      .doc(title)
      .set({
        points: points,
        completed: false,
        task: title
      });
  }

  event.target.elements.title.value = "";
  event.target.elements.points.value = "";
}

function displayPoints() {
  DB.collection("Users")
    .doc(sessionStorage.getItem("user"))
    .get()
    .then(userDB => {
      let points = userDB.get("totalPoints");
      console.log(points);
      document.getElementById("points").style.visibility = "visible";
      document.getElementById("points").innerHTML = "Points: " + points;
      wait();
    });
}

function wait() {
  setTimeout(
    () => (document.getElementById("points").style.visibility = "hidden"),
    3000
  );
}

function updateTasks(setTasksList, setCounter) {
  var list = new Array();
  //let list = [];

  DB.collection("Tasks")
    .get()
    .then(tasksDB => {
      tasksDB.forEach(taskDB => {
        let taskInfo = [];
        taskInfo.push(taskDB.get("task"));
        taskInfo.push(taskDB.get("points"));
        taskInfo.push(taskDB.get("completed"));

        list.push(taskInfo);
      });
      setTasksList(list);

      setCounter(1);
    });
}

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

