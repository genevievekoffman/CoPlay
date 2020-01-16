import React, { useState } from "react";
import "./Task.css";


function Task(props) {
  //passed an array of tasks
  const { task, index, db, groupID } = props;
 
  let completion = task[2];
  // console.log("Running", task[0], task.completed)
  const [taskCompleted, setTaskCompleted] = useState(completion);

  return (
    <div className="task" key={index}>
      <div>
        {taskCompleted ? (
          <div className="checkBox"> x </div>
        ) : (
            <button className="checkBox"
              onClick={() =>
                completeTask(task[0], task[1], db, setTaskCompleted, groupID)
              }
            >

            </button>
          )}
      </div>
      {task[0]} <br></br>
      {task[1]} <br></br>
    </div>
  );
}

function completeTask(task, points, db, setTaskCompleted, groupID) { //should also update in Groups
  db.collection("Users")
    .doc(sessionStorage.getItem("user"))
    .get()
    .then(userDB => {
      let totalPoints = userDB.get("totalPoints");
      console.log("You have " + (totalPoints + points) + " points now that " + points + " has been added to your account")
    })


  setTaskCompleted(true);
  db.collection("Groups")
    .doc(groupID)
    .collection("Tasks")
    .doc(task)
    .update({
      completed: true
    });

  db.collection("Groups")  
    .doc(groupID)
    .collection("Users")
    .doc(sessionStorage.getItem("user"))
    .get()
    .then(function (doc) {
      let total = doc.get("totalPoints") + points;

      // db.collection("Users") //points are updated in Users Collection for the specific user
      //   .doc(sessionStorage.getItem("user"))
      //   .update({
      //     totalPoints: total
      //   });

      db.collection("Groups") //points are updated in Groups Collection for the specific user 
      .doc(groupID)
      .collection("Users")
      .doc(sessionStorage.getItem("user"))
      .update({
        totalPoints: total
      })
    });

   
  
}

export default Task;
