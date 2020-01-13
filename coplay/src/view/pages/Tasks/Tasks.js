import React, { useState } from "react";
import "./Tasks.css";
import Task from "../../Task/Task";

function Tasks(props) {
  const { db } = props;
  const [counter, setCounter] = useState(0);
  const [tasksLists, setTasksList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  if (counter == 0) {
    updateTasks(setTasksList, setCounter, db);
  }

  return (
    <div className="App2">
      <div>
        <h4>
          {tasksLists.map((task, index) => {
            return <Task task={task} key={index} db={db} />;
          })}
        </h4>
      </div>

      <div className="AddTask" name="AddTask">
        {showForm && <AddTaskForm db = {db} onCancel={() => setShowForm(false)} />}

        <button
          className="addTaskBtn"
          id="PopUp"
          onClick={() => setShowForm(!showForm)}
        >
          +
        </button>
      </div>

      <div id="points" className="points"></div>
      <img
        className="profileIcon"
        src="sketchImages/blackprofileicon.png"
        onClick={displayPoints(db)}
      ></img>
    </div>
  );
}

export default Tasks;

function updateTasks(setTasksList, setCounter, db) {
  var list = new Array();
  //let list = [];

  db.collection("Tasks")
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

      setCounter(1);
    });
}

function AddTaskForm(props) {
  const { db } = props;
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="modal fade" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h3>Add Task</h3>
                </div>
                <form
                  onSubmit={event => {
                    addTask(event, db);
                  }}
                >
                  <div class="modal-body">
                    <input
                      type="text"
                      placeholder="Title"
                      id="Title"
                      name="title"
                    />
                    <input
                      type="text"
                      placeholder="Points"
                      id="Points"
                      name="points"
                    />
                  </div>
                  <div class="modal-footer">
                    <input
                      type="submit"
                      class="btn btn-primary"
                      id="Save"
                      value="Save"
                      name = "save"
                    />
                    <input
                      class="btn btn-primary"
                      id="Cancel"
                      value="Cancel"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <a href="#" data-toggle="modal" data-target="#myModal" id="plus">
            +
          </a>
        </div>
      </div>
    </div>
  );
}

function addTask(event, db) {
  event.preventDefault();

  console.log("saved my G");
  let title = event.target.elements.title.value;
  let points = event.target.elements.points.value;
  if (title == "") {
    alert("Must enter a title");
  } else if (points == "") {
    alert("Must enter points");
  } else {
    parseInt(points);
    console.log(
      "The task " + title + "has been added with a reward of" + points
    );
    db.collection("Tasks")
      .doc(title)
      .set({
        points: points,
        completed: false,
        task: title
      });
  }

  event.target.elements.title.value = "";
  event.target.elements.points.value = "";
}

function displayPoints(db) {
  db.collection("Users")
    .doc(sessionStorage.getItem("user"))
    .get()
    .then(userDB => {
      let points = userDB.get("totalPoints");
      console.log(points);
      document.getElementById("points").style.visibility = "visible";
      document.getElementById("points").innerHTML = "Points: " + points;
      wait();
    });
}

function wait() {
  setTimeout(
    () => (document.getElementById("points").style.visibility = "hidden"),
    3000
  );
}
