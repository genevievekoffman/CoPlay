import React, { useState } from "react";
import "./Groups.css";
import Group from "../../Group/Group";

function Groups(props) {
  const { db, setGroupID, setHomePage, setName } = props;
  const [groupsList, setGroupsList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [visibleJOIN, setVisibleJOIN] = useState(false);
 

  if (counter < 1) {
    fetchMyGroups(db, setGroupsList, setCounter);
  }

  return (
    <div>
      <header className="groupPageTitle">My Groups</header>

      <div className="groupButtons">
         
        {
          <AddGroupForm
            db={db}
            setGroupsList={setGroupsList}
            setCounter={setCounter}
          />
        }

        <button className = "joinBtn"
          onClick={() => {
            joinClicked(setVisibleJOIN);
          }}
        >
          Join 
        </button>
      </div>

      {visibleJOIN ? (
        <div className = "joinScreen">
          <form
          className="joinGroupForm"
          onSubmit={event => {
            joinGroup(event, db, setGroupsList, setCounter);
          }}
        >
          <div className="groupIDlabel">Group ID</div>
           
          <input type="text" className = "groupID"  name="groupID"></input> 
          <br></br>
          <input type="submit" className = "submitBtn" value="Submit"></input>
          
        </form>
        <button className = "cancelJoinBtn"
            onClick={() => {
              cancelJoin(setVisibleJOIN);
            }}
          >
            Cancel
          </button>

        </div>
         
      ) : (
        ""
      )}

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

function cancelJoin(setVisibleJOIN) {
  setVisibleJOIN(false);
}
function joinClicked(setVisibleJOIN) {
  setVisibleJOIN(true);
}

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
        name: title,
        ID: ID
      });
    addGroupUser(db, title, ID);
    addUserToGroup(db, sessionStorage.getItem("user"), ID);
  }

  event.target.elements.title.value = "";
  fetchMyGroups(db, setGroupsList, setCounter);
}

function AddGroupForm(props) {
  const { db, setGroupsList, setCounter } = props;

  return (
    <div> 
      <button className = "createBtn"
        data-toggle="modal"
        data-target="#myModal"
        id="plus"
        // className="addGroupButton"
      >
        Create
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
                    <button
                      className="btn btn-primary btn-sm"
                      type="submit"
                      id="savee"
                      value="Save"
                      name="save"
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      id="cancell"
                      value="Cancel"
                      type="button"
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

async function joinGroup(e, db, setGroupsList, setCounter) {
  e.preventDefault();

  let groupID = e.target.elements.groupID.value;

  //go into Groups and see if groupID exists

  if (groupID === "") {
    alert("Must enter a group ID");
  } else {
    const exists = await checkGroup(groupID, db);
    if (exists) {
      //if the group exists

      await db //adds the current user into the Groups collection
        .collection("Groups")
        .doc(groupID)
        .collection("Users")
        .doc(sessionStorage.getItem("user"))
        .set({
          admin: false,
          totalPoints: 0,
          username: sessionStorage.getItem("user")
        });
      await updateInUsers(db, groupID);
    } else {
      alert("Sorry this group does not exist");
    }
    console.log("information has been saved");

    fetchMyGroups(db, setGroupsList, setCounter);
  }
}

async function updateInUsers(db, groupID) {
  // console.log(getName(groupID));
  const name = await getName(groupID, db);
  db.collection("Users")
    .doc(sessionStorage.getItem("user"))
    .collection("Groups")
    .doc(groupID)
    .set({
      ID: groupID,
      name
    });
}
async function checkGroup(groupID, db) {
  //returns true if the groupID exists
  let exists = false;
  const IDgroupsDB = await db.collection("Groups").get();
  IDgroupsDB.forEach(groupDB => {
    if (groupDB.get("ID") == groupID) {
      exists = true;
    }
  });
  return exists;
}

async function getName(groupID, db) {
  //returns the name of groupID
  let name;
  const IDgroupsDB = await db.collection("Groups").get();
  IDgroupsDB.forEach(groupDB => {
    if (groupDB.get("ID") == groupID) {
      name = groupDB.get("name");
    }
  });
  return name;
}
