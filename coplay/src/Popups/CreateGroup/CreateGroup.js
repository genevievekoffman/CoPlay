import React from "react";
import "./CreateGroup.css";

import creategrouptop from "../../Sketches/CreateGroupTop.svg";  

function CreateGroup(props){ 
    const{isShowing2, setIsShowing2, db, setCounter, setGroupsList} = props;

    if(isShowing2){
        return(
            <div>
                <div className = "backgrnd" onClick = {() => {setIsShowing2(false)}}></div>
                <div className = "inner_msg">
                    <form onSubmit = {event => {
                        addGroup(event, db, setGroupsList, setCounter, db);
                        setIsShowing2(false)
                    }}>
                        <img src={creategrouptop} className="creategrouptop" alt="creategrouptop" />
                        <br></br>
                        <h5>Group Title</h5>
                        <input type="text" name="title" className = "createGroupText"></input>
                        <br></br>
                        <input type="submit" value="Add" className = "create_btn"></input>
                    </form>
                </div>

            </div>
             
        )

    } else {
        return null
    }
     
}

export default CreateGroup;

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
  setCounter(0);
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