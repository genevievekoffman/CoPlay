import React, { useState } from "react";

import "./App.css";
import firebase from "firebase";

import Task from "./view/Task/Task";

//Firebase
var firebaseConfig = {
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
  let username = sessionStorage.getItem("user");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="App">
        <form
          onSubmit={event => {
            checkUser(event, setIsLoggedIn);
          }}
        >
          <div id="container">
            <div id="LogIn">CoPlay</div>
            <input
              type="text"
              name="username"
              id="name"
              placeholder="username"
            ></input>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="password"
            ></input>
            <input type="submit" id="submit" value="Verify Credentials"></input>
          </div>
        </form>
      </div>
    );
  } else {
    //someone is logged in

    return (
      <div>
        Logged in page
        
          <div class="AddTask" name="AddTask">
            {showForm && <AddTaskForm />}

            <button id="PopUp" onClick={() => setShowForm(!showForm)}>
              +
            </button>
          </div>
       
      </div>
    );
  }
}

function AddTaskForm() {
  const [showForm, setShowForm] = useState(false);
  console.log("form opened");
  console.log(showForm, setShowForm);
  return (
    <div name = "PopUp" className = "PopUp">
      <div id = "grid">
      <form
        onSubmit={event => {
          addTask(event);
        }}
      >
        <h2>Add Task </h2>
        <input type="text" name="title" placeholder="Title" id="Title"></input>
        <input
          type="text"
          name="points"
          placeholder="Points"
          id="Points"
        ></input>
        <div class="button">
          <input type="submit" name="save" id="Save" value="Save"></input>
        </div>
      </form>

      <button
        name="cancel"
        id="Cancel"
        value="Cancel"
        onClick={() => setShowForm(false)}
      >
        Cancel
      </button>
      </div>
    </div>
  );
}

function addTask(event) {
  event.preventDefault();

  console.log("saved my G");
  let title = event.target.elements.title.value;
  let points = parseInt(event.target.elements.points.value);
  if(title==""){
    alert("Must enter a title")
  }
  else if(points==""){
    alert("Must enter points")
  }
  else{
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
  
  
  event.target.elements.title.value = " ";
  event.target.elements.points.value = " ";
}

function checkUser(e, setIsLoggedIn) {
  e.preventDefault();
  console.log("function called");


  let username = e.target.elements.username.value;
  let password = e.target.elements.password.value;

  if(username==""){
    alert("Must enter a username")
  }
  else if(password==""){
    alert("Must enter a password")
  }
  else{


  var docRef = DB.collection("Users").doc(username);
  docRef.get().then(function(doc) {
    if (doc.exists) {
      if (password === doc.data().password) {
        console.log("passwords match");
        sessionStorage.setItem("user", username); //saves to local storage
        setIsLoggedIn(true);
      } else {
        console.log("passwords dont match");
      }
    } else {
      console.log("no info found");
    }
  });
}
}
export default App;
