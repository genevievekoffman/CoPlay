import React, { useState } from "react";
import "./Task.css";

//component
import pinkarrow from "../../Sketches/Pinkarrow.svg";

function Task(props) {
  //passed an array of tasks
  const { task, index, db, groupID } = props;
  const [taskWasClicked, setTaskWasClicked] = useState(false);

  let completion = task[2];
  // console.log("Running", task[0], task.completed)
  const [taskCompleted, setTaskCompleted] = useState(completion);

  return (
    <div
      className="task"
      key={index}
      onClick={() => {
        taskClicked(task, setTaskWasClicked);
      }}
    >
      <div>
        {taskCompleted ? (
          <div className="checkBox"> X </div>
        ) : (
          <button
            className="checkBox"
            onClick={() =>
              completeTask(task[0], task[1], db, setTaskCompleted, groupID)
            }
          ></button>
        )}

         
      </div>

       
      <div className = "aTask">
        {task[0]} <br></br>
         
        {taskWasClicked ? 
        <div className = "subInfoContainer">
          <img src={pinkarrow} className="pinkarrow" alt="pinkarrow" />
           
          <div className="subInfo">
            {task[1]} points
            {taskCompleted ? (
              <div> complete </div>
            ):(<div> incomplete </div>)}
          </div>  
        </div> : ""}

      </div>
       
       
    </div>
  );
}

function completeTask(task, points, db, setTaskCompleted, groupID) {
  //should also update in Groups
  db.collection("Users")
    .doc(sessionStorage.getItem("user"))
    .get()
    .then(userDB => {
      let totalPoints = userDB.get("totalPoints");
      console.log(
        "You have " +
          (totalPoints + points) +
          " points now that " +
          points +
          " has been added to your account"
      );
    });

  setTaskCompleted(true);
  db.collection("Groups")
    .doc(groupID)
    .collection("Tasks")
    .doc(task)
    .update({
      completed: true,
      completedBy: sessionStorage.getItem("user")
    });

  db.collection("Groups")
    .doc(groupID)
    .collection("Users")
    .doc(sessionStorage.getItem("user"))
    .get()
    .then(function(doc) {
      let total = doc.get("totalPoints") + points;

      db.collection("Groups") //points are updated in Groups Collection for the specific user
        .doc(groupID)
        .collection("Users")
        .doc(sessionStorage.getItem("user"))
        .update({
          totalPoints: total
        });
    });
}

function taskClicked(task, setTaskWasClicked) {
  //drop down
  console.log("task " + task[0] + "clicked, worth: " + task[1]);
  setTaskWasClicked(true)
}

export default Task;
