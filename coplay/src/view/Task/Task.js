import React from "react";
import "./Task.css";

function Task(props) {
  //passed an array of tasks
  const {task, index, db} = props

  if (task[2] === false) {
    return (
    <div className="task" key={index}>
        {task[0]} <br></br>
        {task[1]} <br></br>
        <div id = "completed"></div>  
        <button onClick = {() => completeTask(task[0], db)}> Complete Task</button>  
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

function completeTask(task, db){
    db.collection("Tasks").doc(task).update({
        completed: true
    })

    document.getElementById("completed").innerHTML = "Completed"
}
 
export default Task;


 