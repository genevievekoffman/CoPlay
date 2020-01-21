import React, { useState } from "react";
import "./Tasks.css";
import Task from "../../Task/Task";

//component
import plus from "../../../Sketches/Plus.svg"; 
import star from "../../../Sketches/Star.svg";

function Tasks(props) {
  const { db, groupID, name } = props;
  const [counter, setCounter] = useState(0);
  const [tasksLists, setTasksList] = useState([]);
  const [points, setPoints] = useState(" ");
  const [taskDeleted, setTaskDeleted] = useState(false);
  const [pointsDisplay, setPointsDisplay] = useState(false);

  if (counter === 0) {
    updateTasks(setTasksList, setCounter, db, groupID);
  }

  if (taskDeleted) {
    //Can we delete this since we reload the window ?? ?
    updateTasks(setTasksList, setCounter, db, groupID);
  }

  if(pointsDisplay){
    displayPoints(db, setPoints, groupID, setPointsDisplay)
    setPointsDisplay(false);
  }

  return (
    <div className="App2">
      <div className = "taskTitle">
          {name}
      </div>
        
      <div className = "tasksMappedContainer">
         
        <h4>
          {tasksLists.map((task, index) => {
            return (
              <Task
                task={task}
                key={index}
                db={db}
                groupID={groupID}
                setTaskDeleted={setTaskDeleted}
                setPointsDisplay={setPointsDisplay}
              />
            );
          })}
        </h4>
      </div>

      <div className="AddTask" name="AddTask">
        <AddTaskForm
          db={db}
          setTasksList={setTasksList}
          setCounter={setCounter}
          groupID={groupID}
        />
      </div>

       
       
        <div className = "pointsHolder">  
          <img src={star} className="star" alt="star" className = "star" />
          {displayPoints(db, setPoints, groupID)}
          <div id="points" className="points"> {points} </div> 
        </div>
    
         
     
    </div>
  );
}

export default Tasks;

function updateTasks(setTasksList, setCounter, db, groupID) {
  var list = new Array();
  //let list = [];

  db.collection("Groups")
    .doc(groupID)
    .collection("Tasks")
    .orderBy("time", "asc")
    .get()
    .then(tasksDB => {
      tasksDB.forEach(taskDB => {
        let taskInfo = [];
        taskInfo.push(taskDB.get("task"));
        taskInfo.push(taskDB.get("points"));
        taskInfo.push(taskDB.get("completed"));
        taskInfo.push(taskDB.get("completedBy"));

        list.push(taskInfo);
      });
      setTasksList(list);
      //console.log(list);

      setCounter(1);
    });
}

function AddTaskForm(props) {
  const { db, setTasksList, setCounter, groupID } = props;

  return (
    <div>
       
      <button className="plusBtn" data-toggle="modal" data-target="#myModal">
        {<img src={plus} alt="plus" />}
      </button>
      <div className="row">
        <div className="col-md-12">
          <div className="modal fade" id="myModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Add Task</h3>
                </div>
                <form
                  onSubmit={event => {
                    addTask(event, db, setTasksList, setCounter, groupID);
                  }}
                >
                  <div className="modal-body">
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      id="Title"
                      className="m-1"
                    />
                    <input
                      type="text"
                      name="points"
                      placeholder="Points"
                      id="Points"
                      className="m-1"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      data-toggle="modal"
                      data-target="#myModal"
                      type="button submit"
                      className="btn btn-primary btn-sm"
                      id="savee"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      id="cancell"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function addTask(event, db, setTasksList, setCounter, groupID) {
  event.preventDefault();

  console.log("saved my G");
  let title = event.target.elements.title.value;
  let points = event.target.elements.points.value;
  console.log(groupID);

  if (title === "") {
    alert("Must enter a title");
  } else if (points === "") {
    alert("Must enter points");
  } else if (parseInt(points) <= 0) {
    alert("Invalid Input. Stay Positive!")
  } else {
    points = parseInt(points);
    console.log(
      "The task " + title + " has been added with a reward of " + points
    );
    db.collection("Groups")
      .doc(groupID)
      .collection("Tasks")
      .doc(title)
      .set({
        points: points,
        completed: false,
        task: title,
        time: Date.now(),
        completedBy: null
      });
  }

  event.target.elements.title.value = "";
  event.target.elements.points.value = "";
  updateTasks(setTasksList, setCounter, db, groupID);
}

function displayPoints(db, setPoints, groupID) {
  db.collection("Groups")
    .doc(groupID)
    .collection("Users")
    .doc(sessionStorage.getItem("user"))
    .get()
    .then(userDB => {
      let points = userDB.get("totalPoints");
       
      setPoints(points);
       
    });
}
