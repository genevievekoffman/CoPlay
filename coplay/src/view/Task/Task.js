import React, { useState, useEffect } from "react";
import "./Task.css";

//component
import pinkarrow from "../../Sketches/Pinkarrow.svg";

function Task(props) {
  //passed an array of tasks
  const { task, index, db, groupID, setTaskDeleted, setPointsDisplay } = props;
  const [taskWasClicked, setTaskWasClicked] = useState(false);
  const [totalCompleted, setTotalCompleted] = useState(0) //getCompCount(db,groupID,task)

  //const [completedCount, setCompletedCount] = useState(false)
 
  //const [taskCompleted, setTaskCompleted] = useState(completion);

  useEffect(()=>{ //when the component runs, it will invoke this function
    getCompCount(db, groupID, task[0], setTotalCompleted)
  }, [])

  // if(completedCount){
  //   getCompCount(db, groupID, task[0], setTotalCompleted)
  //   setCompletedCount(false);
  // }

  return (
    <div
      className="task"
      key={index}
       
    >
      

      <div className="aTask" onClick={() => {
        taskClicked(task, setTaskWasClicked);
      }}>
        {task[0]} <br></br>
        {taskWasClicked ? (
          <div className="subInfoContainer">
            <img src={pinkarrow} className="pinkarrow" alt="pinkarrow" />

            <div className="subInfo">
              {task[1]} points <br></br> 
                  completed count: {totalCompleted} 
                <div>
                  {/* <div>completed by</div>
                  <div>@{task[3]}</div> */}
                  <div className="twoBtns">
                    <button
                      className="taskCompleteBtn"
                      onClick={() => {
                        completeTask(task[0], task[1], db, groupID, setPointsDisplay)
                      }}
                    >
                      Complete
                    </button>
                    <button
                      className="taskCompleteBtn"
                      onClick={() => {
                        deleteTaskClicked(task[0], groupID, db, setTaskDeleted);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

 
function completeTask(task, points, db, groupID, setPointsDisplay) {
 
 
    //get the amount of times completed from firebase and update it +1
  db.collection("Groups")
    .doc(groupID)
    .collection("Tasks")
    .doc(task)
    .get()
    .then(taskDB => {
      let totalTimesCompleted = taskDB.get("completedCount");
      let total = totalTimesCompleted+1; 
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
  //setCompletedCount(true) //updates the completed number
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


function getCompCount(db, groupID, task, setTotalCompleted){
  db.collection("Groups")
  .doc(groupID)
  .collection("Tasks")
  .doc(task)
  .get()
  .then(taskDB => {
    let totalTimesCompleted = taskDB.get("completedCount"); 
    setTotalCompleted(totalTimesCompleted)

    }
  )
}

 


