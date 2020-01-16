import React, { useState } from "react";
import "./Groups.css";
import Group from "../../Group/Group";

function Groups(props) {
  const { db, setGroupID, setHomePage, setName } = props;
  const [groupsList, setGroupsList] = useState([]);
  const [counter, setCounter] = useState(0);

  if (counter < 1) {
    fetchMyGroups(db, setGroupsList, setCounter);
  }

  return (
    <div>
      <header className="groupPageTitle">Your Groups</header>
      {<AddGroupForm db={db} setGroupsList = {setGroupsList}  setCounter = {setCounter} />}
      <div className="groupContainer">
        {groupsList.map((group, index) => {
          return (
            <Group
              group={group}
              key={index}
              setGroupID={setGroupID}
              setHomePage={setHomePage}
              setName={setName}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Groups;

function fetchMyGroups(db, setGroupsList, setCounter) {
  let list = [];

  db.collection("Users")
    .doc(sessionStorage.getItem("user"))
    .collection("Groups")
    .get()
    .then(groupsDB => {
      groupsDB.forEach(groupDB => {
        let groupInfo = [];
        groupInfo.push(groupDB.get("name"));
        groupInfo.push(groupDB.get("ID"));
        list.push(groupInfo);
      });
      //console.log("GROUPS LIST: " + list) //[ ["name", "ID"] , index]
      setGroupsList(list);
      setCounter(1);
    });
}

function addGroupUser(db, title, ID) {
  db.collection("Users")
    .doc(sessionStorage.getItem("user"))
    .collection("Groups")
    .doc(ID)
    .set({
      name: title,
      ID: ID
    });
}

function addUserToGroup(db, username, groupID) {
  db.collection("Groups")
    .doc(groupID)
    .collection("Users")
    .doc(username)
    .set({
      username: username,
      admin: true,
      totalPoints: 0
    });
}

function addGroup(event, db, setGroupsList, setCounter) {
  event.preventDefault();
  let ID;

  console.log("Group added");
  let title = event.target.elements.title.value;
  if (title === "") {
    alert("Must enter a title");
  } else {
    console.log("The Group " + title + " has been added");
    ID = "a" + Date.now();
    db.collection("Groups")
      .doc(ID)
      .set({
        name: title
      });
    addGroupUser(db, title, ID);
    addUserToGroup(db, sessionStorage.getItem("user"), ID);
  }

  event.target.elements.title.value = "";
  fetchMyGroups(db, setGroupsList, setCounter);
}

function AddGroupForm(props) {
  const { db, setGroupsList, setCounter } = props;
  console.log("form opened");
  return (
    <div className="container">
      {" "}
      <button
        data-toggle="modal"
        data-target="#myModal"
        id="plus"
        className="addGroupButton"
      >
        +
      </button>
      <div className="row">
        <div className="col-md-12">
          <div className="modal fade" id="myModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Add a Group</h3>
                </div>
                <form
                  onSubmit={event => {
                    addGroup(event, db, setGroupsList, setCounter);
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
                  </div>
                  <div className="modal-footer">
                    <input
                      className="btn btn-primary btn-sm"
                      type="submit"
                      id="savee"
                      value="Save"
                      name="save"
                    />
                    <input
                      className="btn btn-secondary btn-sm"
                      id="cancell"
                      value="Cancel"
                      type="button"
                      data-dismiss="modal"
                    />
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
