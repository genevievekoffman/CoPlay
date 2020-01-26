import React,  {useState, useEffect} from "react";
import "./JoinGroup.css";

function JoinGroup(props){ 
    const {isShowing, setIsShowing, db, setCounter} = props;
    if (isShowing) {
        return(
            <div>
                <div className = "background" onClick = {() => {setIsShowing(false)}}> </div>

                <div className = "message"> 
                    <form onSubmit={event => { 
                        joinGroup(event, db, setCounter); 
                        setIsShowing(false)
                        }}>
                        Group ID: 
                        <input type="text" name="groupID" className = "joinGroupText"></input>
                        <br></br>
                        <input type="submit" value="Join"></input>
                    </form>
                </div> 

            </div>
             
        )
    } else {
        return null;
    } 
}
 
export default JoinGroup;

async function joinGroup(e, db, setCounter) {
    console.log("Join group called")
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
            leaderBoardPoints: 0,
            username: sessionStorage.getItem("user")
          });
        await updateInUsers(db, groupID);
      } else {
        alert("Sorry this group does not exist");
      }
      console.log("information has been saved");
  
       
      setCounter(0);
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
    if (groupDB.get("ID") === groupID) {
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
    if (groupDB.get("ID") === groupID) {
      name = groupDB.get("name");
    }
  });
  return name;
}

 


 