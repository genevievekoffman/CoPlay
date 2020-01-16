import React, { useState } from "react";
import "./Tasks.css";
import Task from "../../Task/Task";

function Tasks(props) {
  const { db, groupID } = props;
  const [counter, setCounter] = useState(0);
  const [tasksLists, setTasksList] = useState([]);
  const [visible, setVisible] = useState(false)
  const [points, setPoints] = useState(" ")

  if (counter == 0) {
    updateTasks(setTasksList, setCounter, db, groupID);
  }

  return (
    <div className="App2">
      <div className="AddTask" name="AddTask">
        <AddTaskForm
          db={db}
          setTasksList={setTasksList}
          setCounter={setCounter}
          groupID={groupID}
        />
      </div>

      <div>
        <h4>
          {tasksLists.map((task, index) => {
            return <Task task={task} key={index} db={db} groupID = {groupID}/>;
          })}
        </h4>
      </div>
      
      {visible ? (
        <div>
          <div id="points" className="points"> {points} </div>
          
          <img
      className="profileIcon"
      src="sketchImages/blackprofileicon.png"
      onClick={() => {displayPoints(db, setVisible, visible, setPoints, groupID)}}
      
    ></img>
          </div>
        ) : (
       <div>   
         <div id="points" className="points"></div>
      <img
      className="profileIcon"
      src="sketchImages/blackprofileicon.png"
      onClick={() => {displayPoints(db, setVisible, visible, setPoints, groupID)}}
      
    ></img>
    </div>
          )}

      
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
    .orderBy('time', 'asc')
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
      //console.log(list);

      setCounter(1);
    });
}

function AddTaskForm(props) {
  const { db, setTasksList, setCounter, groupID } = props;

  return (
    <div className="container">
      {" "}
      <button
        data-toggle="modal"
        data-target="#myModal"
        id="plus"
        className=".btn-default"
      >
        +
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

  if (title == "") {
    alert("Must enter a title");
  } else if (points == "") {
    alert("Must enter points");
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
        time: Date.now()
      });
  }

  event.target.elements.title.value = "";
  event.target.elements.points.value = "";
  updateTasks(setTasksList, setCounter, db, groupID);
}

function displayPoints(db, setVisible, visible, setPoints, groupID) {
  db.collection("Groups")
  .doc(groupID)
  .collection("Users")
    .doc(sessionStorage.getItem("user"))
    .get()
    .then(userDB => {
      let points = userDB.get("totalPoints");
      console.log(userDB.get("totalPoints"))
      setPoints(points);
      console.log(points);
      setVisible(!visible);
    });
}
