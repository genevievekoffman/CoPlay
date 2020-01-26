import React, { useState } from "react";
import "./Groups.css";
import Group from "../../Group/Group";

//joining groups components
import JoinGroup from "../../../Popups/JoinGroup/JoinGroup";


//component
import twoCircles from "../../../Sketches/Twocircles.svg";

function Groups(props) {
  const { db, setGroupID, setHomePage, setName } = props;
  const [groupsList, setGroupsList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [circlesClicked, setCirclesClicked] = useState(0);
 

  //for joinGroup popup
  const [isShowing, setIsShowing] = useState(false);

  if (counter < 1) {
    fetchMyGroups(db, setGroupsList, setCounter);
  }

  return (
    <div>
      <img
        src={twoCircles}
        className="twoCircles"
        alt="twoCircles"
        onClick={() => {
          twoCirclesClicked(setCirclesClicked, circlesClicked);
        }}
      />

      <header className="groupPageTitle">My Groups</header>
      <div className="groupButtons">
        {
          <AddGroupForm
            db={db}
            setGroupsList={setGroupsList}
            setCounter={setCounter} 
             
          />
        }
        <JoinGroup
          isShowing={isShowing} 
          setIsShowing={setIsShowing}
          setCounter = {setCounter}
          db = {db}
        />
        <div className = "join_div" onClick = { () => {setIsShowing(true)}}>
          Join
        </div>       
         
        {/* <JoinGroupForm
          db={db}
          setGroupsList={setGroupsList}
          setCounter={setCounter}
        /> */}
      </div>
      
      {circlesClicked === 1 ? ( //1->they clicked it (group ID's are shown)
        <div className="groupContainer">
          {groupsList.map((group, index) => {
            return (
              <Group
                group={group}
                key={index}
                setGroupID={setGroupID}
                setHomePage={setHomePage}
                setName={setName}
                ids = {true}
              />
            );
          })}
        </div>
      ) : (
        <div className="groupContainer">
          {groupsList.map((group, index) => {
            return (
              <Group
                group={group}
                key={index}
                setGroupID={setGroupID}
                setHomePage={setHomePage}
                setName={setName}
                ids = {false}
              />
            );
          })}
        </div>
      )}

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
      totalPoints: 0,
      leaderBoardPoints: 0 //this is the total points the user has ever earned(can only increase)
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
      <button
        className="createBtn"
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
                    //xxx
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
                  <div className="modal-footer" id = "BottomButtons">
                    <button
                      className="btn btn-secondary btn-sm"
                      // id="cancell"
                      value="Cancel"
                      type="button"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      type="submit"
                      // id="savee"
                      value="Save"
                      name="save"
                      data-toggle="modal"
                      data-target="#myModal"
                    >
                      Save
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


function twoCirclesClicked(setCirclesClicked, circlesClicked) {
  if (circlesClicked === 0){
    setCirclesClicked(1);
  } else {
    setCirclesClicked(0);
  }  
}
