import React, { useState } from "react";
import "./Task.css";

//component
import pinkarrow from "../../Sketches/Pinkarrow.svg";

function Task(props) {
  //passed an array of tasks
  const { task, index, db, groupID, setTaskDeleted, setPointsDisplay } = props;
  const [taskWasClicked, setTaskWasClicked] = useState(false);
  const [totalCompleted, setTotalCompleted] = useState(0)
  const [visible, setVisibility] = useState("hidden")

  //let completion = task[2];  //amount of times completed
  //const [taskCompleted, setTaskCompleted] = useState(completion);

  return (
    // <div
    //   className="task"
    //   key={index}
    // >
    //   <div className="aTask" onClick={() => {
    //     taskClicked(task, setTaskWasClicked);
    //   }}>
    //     {task[0]} <br></br>
    //     {taskWasClicked ? (
    //       <div className="subInfoContainer">
    //         <img src={pinkarrow} className="pinkarrow" alt="pinkarrow" />

    //         <div className="subInfo">
    //           {task[1]} points <br></br>
    //           completed count: {totalCompleted}
              
    //             <div>
    //               {/* <div>completed by</div>
    //               <div>@{task[3]}</div> */}
    //               <div className="twoBtns">
    //                 <button
    //                   className="taskResetBtn"
    //                   onClick={() => {
    //                     completeTask(task[0], task[1], db, groupID, setTotalCompleted)
    //                   }}
    //                 >
    //                   Complete
    //                 </button>
    //                 <button
    //                   className="taskResetBtn"
    //                   onClick={() => {
    //                     deleteTaskClicked(task[0], groupID, db, setTaskDeleted);
    //                   }}
    //                 >
    //                   Delete
    //                 </button>
    //               </div>
    //             </div>
                
    //         </div>
    //       </div>
    //     ) : (
    //       ""
    //     )}
    //   </div>
    // </div>

    <div className = "taskGrid" key={index}>
      <div className= "taskName">{task[0]}</div>
      <button className = "complete">Complete</button>
      <button className = "delete">Delete</button>
      <div className= "info">i</div>

      <div className="completePopUp">
        <div>Did you really complete this task?</div>
        <button>Yes</button>
        <button>No</button>
      </div>

      <div className="deletePopUp">
        <div>Are you sure you want to delete this task?</div>
        <button>Yes</button>
        <button>No</button>
      </div>
      
    </div>


  );
}

 
function completeTask(task, points, db, groupID, setPointsDisplay, setTotalCompleted) {
 
 
    //get the amount of times completed from firebase and update it +1
  db.collection("Groups")
    .doc(groupID)
    .collection("Tasks")
    .doc(task)
    .get()
    .then(taskDB => {
      let totalTimesCompleted = taskDB.get("completedCount");
      let total = totalTimesCompleted+1;
      setTotalCompleted(total);
        db.collection("Groups")
        .doc(groupID)
        .collection("Tasks")
        .doc(task)
        .update({
          completedCount: total,
          completedBy: sessionStorage.getItem("user") //most recent user who completed it 
        })
    }) 

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

  setPointsDisplay(true)
}

function taskClicked(task, setTaskWasClicked) {
  //drop down
  console.log("task " + task[0] + "clicked, worth: " + task[1]);
  setTaskWasClicked(true);
}

 

function deleteTaskClicked(task, groupID, db, setTaskDeleted) {
  console.log("delete button clicked");
  db.collection("Groups")
    .doc(groupID)
    .collection("Tasks")
    .doc(task)
    .delete();
  setTaskDeleted(true)
  //window.location.reload()
}

export default Task;