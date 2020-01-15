import React, { useState } from "react";
import "./Tasks.css";
import Task from "../../Task/Task";

function Tasks(props) {
  const { db } = props;
  const [counter, setCounter] = useState(0);
  const [tasksLists, setTasksList] = useState([]);
  const [showForm, setShowForm] = useState(true);
  

  if (counter == 0) {
    updateTasks(setTasksList, setCounter, db);
  }

  return (
    <div className="App2">
      <div className="AddTask" name="AddTask">
        {showForm && (
          <AddTaskForm db={db} setTasksList = {setTasksList} setCounter = {setCounter} onCancel={() => setShowForm(false)} />
        )}
      </div>
      
      <div>
        
        <h4>
          {tasksLists.map((task, index) => {
            return <Task task={task} key={index} db={db} />;
          })}
        </h4>
      </div>

      <div id="points" className="points"></div>
      {/* <img
        className="profileIcon"
        src="sketchImages/blackprofileicon.png"
        onClick={displayPoints(db)}
      ></img> */}
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
      console.log(list);

      setCounter(1);
    });
}


function AddTaskForm(props) {
  const [counter, setCounter] = useState(0);
  const [tasksLists, setTasksList] = useState([]);
  const { db }= props;
  
  return(
    <div class="container"> <button data-toggle="modal" data-target="#myModal" id="plus" className=".btn-default">+</button>
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
                    addTask(event, db, setTasksList, setCounter);
                  }}
                >
                <div class="modal-body">
                  <input type="text" name = "title" placeholder="Title" id="Title"  className="m-1" />
                  
                  <input type="text" name = "points"  placeholder="Points"  id="Points" className="m-1"/>
                    
                  
                </div>
                <div class="modal-footer">
              
                 
                  <button type="button" class="btn btn-primary btn-sm" id="fdp">Save</button>
                  <button type="button" class="btn btn-secondary btn-sm" id="pd">Cancel</button>
                  
                
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



    /*<div class="container"> <button data-toggle="modal" data-target="#myModal" id="plus" className=".btn-default">+</button>
    <div class="row">
      <div class="col-md-12">

        <div class="modal fade" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">

              <div class="modal-header">
                <h3>Add Task</h3>
                </div>
                <div class="modal-body">
                    <input type="text" placeholder="Title" id="Title" className="m-1"></input>
                    <input type="text" placeholder="Points" id="Points" className="m-1"></input>
                    </div>
                    <div class="modal-footer">
                      <input class="btn brn-primary" id="Save" data-dismiss="modal" value="Save"></input>
                      <input class="btn brn-primary" id="Cancel" data-dismiss="modal" value="Cancel"></input>
                      </div>

                      </div>
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>
                      
                     */
                      
                      
 // );
//}

function addTask(event, db, setTasksList, setCounter) {
  event.preventDefault();

  console.log("saved my G");
  let title = event.target.elements.title.value;
  let points = event.target.elements.points.value;
  if (title == "") {
    alert("Must enter a title");
  } else if (points == "") {
    alert("Must enter points");
  } else {
    points = parseInt(points);
    console.log(
      "The task " + title + " has been added with a reward of " + points
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
  updateTasks(setTasksList, setCounter, db);
}

// function displayPoints(db, setVisible) {
//   db.collection("Users")
//     .doc(sessionStorage.getItem("user"))
//     .get()
//     .then(userDB => {
//       let points = userDB.get("totalPoints");
//       console.log(points);
//       setVisible(true);
//       // document.getElementById("points").style.visibility = "visible";
//       // document.getElementById("points").innerHTML = "Points: " + points;
//       wait(setVisible);
//     });
// }

// function wait(setVisible) {
//   setTimeout(
//     () => (setVisible(false)),
//     3000
//   );
// }
