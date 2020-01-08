import React, {useState} from "react";
import "./Task.css";

function Task(props) {
  //passed an array of tasks
  const { task, index, db } = props; 
  


  if (task[2] === false) {
    return (
      <div className="task" key={index}>
        <div id={"completed"}></div>
        {task[0]} <br></br>
        {task[1]} <br></br>
        <button onClick={() => completeTask(task[0], task[1], db)}>
          {" "}
          Complete Task
        </button>
      </div>
    );
  } else {
    return (
      <div className="task" key={index}>
        Completed <br></br>
        {task[0]} <br></br>
        {task[1]}
        <br></br>
      </div>
    );
  }
}

function completeTask(task, points, db) {


  db.collection("Tasks")
    .doc(task)
    .update({
      completed: true
    });
  document.getElementById("completed").innerHTML = "Completed";

       
     
  db.collection("Users").doc(sessionStorage.getItem("user")).get().then(function(doc){
    let total = doc.get("totalPoints") + points;

    db.collection("Users")
    .doc(sessionStorage.getItem("user"))
    .update({
      totalPoints: total
    });
  });
   
   
   
}

export default Task;
