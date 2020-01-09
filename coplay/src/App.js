import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase";
import Task from "./view/Task/Task";

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
  let username = sessionStorage.getItem("user");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasksLists, setTasksList] = useState([]);
  //useEffect(() => updateTasks(setTasksList), []);
  const [counter, setCounter] = useState(0);
  const [points, setPoints] = useState(false);

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

    if (counter == 0) {
      updateTasks(setTasksList, setCounter);
    }
     
    return (
    
      <div className="App2">



       
        <div className = "top-nav"> 
              <a className="active" href="#leaderboard">Leading</a>
              <a href="#tasks">Tasks</a>
              <a href="#rewards">Rewards</a> 
        </div>

      <div>
      <h4>
          {tasksLists.map((task, index) => {
            return <Task task={task} key={index} db={DB} />;
          })}
        </h4>
      </div>
         

        <div className="AddTaskPopUp">
          <form
            onSubmit={event => {
              addTask(event, setTasksList, setCounter);
            }}
          >
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
              <input type="submit" id="Cancel" value="Cancel"></input>
              <input type="submit" id="Save" value="Save"></input>
            </div>
          </form>
        </div>


        <div id = "points" className = "points"></div>
        <img className = "profileIcon" src = "sketchImages/profileheadbig.png" onClick = {
          displayPoints
          }></img>
        

      </div>
    );
  }
}

function displayPoints(){
  DB.collection("Users").doc(sessionStorage.getItem('user')).get().then(userDB => {
    let points = userDB.get("totalPoints")
    console.log(points)
    document.getElementById("points").style.visibility = "visible";
    document.getElementById("points").innerHTML = "Points: " + points;
    wait();
     
  });
}

function wait(){
  setTimeout(()=> document.getElementById("points").style.visibility = "hidden", 3000) 
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

function addTask(event, setTasksList, setCounter) {
  event.preventDefault();
  let title = event.target.elements.title.value;
  let points = event.target.elements.points.value;
  console.log(title);
  console.log(points);
  DB.collection("Tasks")
    .doc(title)
    .set({
      points: points,
      completed: false,
      task: title
    });
  event.target.elements.title.value = " ";
  event.target.elements.points.value = " ";
  updateTasks(setTasksList,setCounter)
}

function checkUser(e, setIsLoggedIn) {
  e.preventDefault();
  console.log("function called");
  let username = e.target.elements.username.value;
  let password = e.target.elements.password.value;

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

export default App;
