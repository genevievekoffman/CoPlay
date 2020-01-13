import React, { useState } from "react";
import "./Task.css";

function Task(props) {
  //passed an array of tasks
  const { task, index, db } = props;
  task.completed = task[2];
  console.log("Running", task[0], task.completed)
  const [taskCompleted, setTaskCompleted] = useState(task.completed);

  return (
    <div className="task" key={index}>
      <div>
        {taskCompleted ? (
          <div className="checkBox"> x </div>
        ) : (
            <button className="checkBox"
              onClick={() =>
                completeTask(task[0], task[1], db, setTaskCompleted)
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

function completeTask(task, points, db, setTaskCompleted) {
  db.collection("Tasks")
    .doc(task)
    .update({
      completed: true
    });
  setTaskCompleted(true);

  db.collection("Users")
    .doc(sessionStorage.getItem("user"))
    .get()
    .then(function (doc) {
      let total = doc.get("totalPoints") + points;

      db.collection("Users")
        .doc(sessionStorage.getItem("user"))
        .update({
          totalPoints: total
        });
    });
}

export default Task;
