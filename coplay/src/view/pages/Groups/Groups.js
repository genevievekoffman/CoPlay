import React, { useState } from "react";
import "./Groups.css";
import Group from "../../Group/Group";

//joining groups components
import JoinGroup from "../../../Popups/JoinGroup/JoinGroup";
import JoinGroupFails from "../../../Popups/JoinGroup/JoinGroupFails"

import CreateGroup from "../../../Popups/CreateGroup/CreateGroup";


//component
import twoCircles from "../../../Sketches/Twocircles.svg";

function Groups(props) {
  const { db, setGroupID, setHomePage, setName } = props;
  const [groupsList, setGroupsList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [circlesClicked, setCirclesClicked] = useState(0);
  const [isShowingFails, setIsShowingFails] = useState(false)
 

  //for joinGroup and CreateGroup popup
  const [isShowing, setIsShowing] = useState(false);
  const [isShowing2, setIsShowing2] = useState(false);

  if (counter < 1) {
    fetchMyGroups(db, setGroupsList, setCounter);
  }

  return (
    <div>
      <img
        src={"https://secure.webtoolhub.com/static/resources/icons/set113/8042a445.png"}
        className="twoCircles"
        alt="twoCircles"
        onClick={() => {
          twoCirclesClicked(setCirclesClicked, circlesClicked);
        }}
      />

      <header className="groupPageTitle">My Groups</header>
      <div className="groupButtons">
        <CreateGroup
          isShowing2 = {isShowing2}
          setIsShowing2 = {setIsShowing2}
          db = {db}
          setCounter = {setCounter}
          setGroupsList = {setGroupsList}
        />

        <JoinGroup
          isShowing={isShowing} 
          setIsShowing={setIsShowing}
          setCounter = {setCounter}
          db = {db}
          setIsShowingFails = {setIsShowingFails}
        />
        <JoinGroupFails
        isShowingFails = {isShowingFails}
        setIsShowingFails={setIsShowingFails}
        />
        <div className = "create_div" onClick = { () => {setIsShowing2(true)}}>
          Create
        </div>    
        
        <div className = "join_div" onClick = { () => {setIsShowing(true)}}>
          Join
        </div>       
        
         
         
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
 

function twoCirclesClicked(setCirclesClicked, circlesClicked) {
  if (circlesClicked === 0){
    setCirclesClicked(1);
  } else {
    setCirclesClicked(0);
  }  
}
