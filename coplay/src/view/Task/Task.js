
import React, { useState } from "react";
import Confetti from "react-confetti";
import "./Task.css";

//component
import pinkarrow from "../../Sketches/Pinkarrow.svg";

function Task(props) {
  //passed an array of tasks
  const { task, index, db, groupID, setTaskDeleted, setPointsDisplay } = props;
  const [totalCompleted, setTotalCompleted] = useState(task[4])
  const [completedBy, setCompletedBy] = useState(task[3])
  const [visibleComp, setVisibilityComp] = useState(false)
  const [visibleDel, setVisibilityDel] = useState(false)
  const [visibleInfo, setVisibilityInfo] = useState(false)
  const [confetti, setConfetti] = useState(false)

  //const [completedCount, setCompletedCount] = useState(false)
 
  //const [taskCompleted, setTaskCompleted] = useState(completion);

  if (visibleComp) {
    return (
      <div className="taskGrid" key={index}>
        <div className="question">Did you really complete this task?</div>
        <button className="confirm" onClick={() => { completeTask(task[0], task[1], db, groupID, setTotalCompleted, setPointsDisplay, setCompletedBy, setVisibilityComp, setConfetti, confetti) }}>Yes</button>
        <button className="deny" onClick={() => setVisibilityComp(false)}>No</button>
      </div>
    )
  } else if (visibleDel) {
    return (
      <div className="taskGrid" key={index}>
        <div className="question">Are you sure you want to delete this task?</div>
        <button className="confirm" onClick={() => { deleteTaskClicked(task[0], groupID, db, setTaskDeleted); setVisibilityDel(false) }}>Yes</button>
        <button className="deny" onClick={() => setVisibilityDel(false)}>No</button>
      </div>
//   useEffect(()=>{ //when the component runs, it will invoke this function
//     getCompCount(db, groupID, task[0], setTotalCompleted)
//   }, [])
    )
  } else if (visibleInfo) {
    return (
      <div className="taskGrid" key={index}>
        <div className="description">
          Recently Completed by: {completedBy} <br></br>
          Times Completed: {totalCompleted}
        </div>
        <button className="back" onClick={() => setVisibilityInfo(false)}>Back</button>
      </div>
    )
  } else {
    return (
      <div className="taskGrid" key={index}>
        <div className="taskName">{task[0]}</div>
        <button className="confirm" onClick={() => { setVisibilityComp(true); console.log(confetti) }}>Complete</button>
        <button className="deny" onClick={() => setVisibilityDel(true)}>Delete</button>
        <div className="info" onClick={() => setVisibilityInfo(true)}>i</div>
        <div className="pnts">{task[1]}</div>
        <ConfettiTime confetti={confetti} />
      </div>
    )
  }
}



function completeTask(task, points, db, groupID, setTotalCompleted, setPointsDisplay, setCompletedBy, setVisibilityComp, setConfetti, confetti) {
  //get the amount of times completed from firebase and update it +1
  db.collection("Groups")
    .doc(groupID)
    .collection("Tasks")
    .doc(task)
    .get()
    .then(taskDB => {
      let totalTimesCompleted = taskDB.get("completedCount");
      let total = totalTimesCompleted + 1; 
      setTotalCompleted(total);
      setCompletedBy(sessionStorage.getItem("user"));
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
    .then(function (doc) {
      let total = doc.get("totalPoints") + points;

      let totalLeaderBoardPoints = doc.get("leaderBoardPoints") + points;


      db.collection("Groups") //points are updated in Groups Collection for the specific user
        .doc(groupID)
        .collection("Users")
        .doc(sessionStorage.getItem("user"))
        .update({
          totalPoints: total,
          leaderBoardPoints: totalLeaderBoardPoints
        });
      setPointsDisplay(true);
    });

  setVisibilityComp(false);
  setConfetti(true);
  setTimeout(() => { setConfetti(false) }, 5000)
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

function ConfettiTime(props) {
  if (props.confetti == true) {
    return (
      <Confetti />
    );
  } else {
    return (<div></div>);
  }
}

export default Task;

// function getCompCount(db, groupID, task, setTotalCompleted){
//   db.collection("Groups")
//   .doc(groupID)
//   .collection("Tasks")
//   .doc(task)
//   .get()
//   .then(taskDB => {
//     let totalTimesCompleted = taskDB.get("completedCount"); 
//     setTotalCompleted(totalTimesCompleted)

//     }
//   )
// }
