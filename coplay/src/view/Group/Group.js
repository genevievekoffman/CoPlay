import React from "react";
import "./Group.css";

//component
import rightarrow from "../../Sketches/Rightarrow.svg";


function Group(props) {
  const {
    group,
    setGroupID,
    setHomePage,
    setName,
    ids //if true: show IDS, if not: don't show IDS
  } = props; 

   if (ids){
    return (
      <div
        className="groupName"
        onClick={() => {
          setGroupID(group[1]);
          setName(group[0]);
          setHomePage(true); //changes screen
        }}
      >
        <div className="left_box">{group[0]} <br></br> 
        <h5>ID: {group[1]}</h5> 
        </div>
        <div className="right_box">
          <img src={rightarrow} className="rightarrow" alt="rightarrow" />
        </div>
      </div>
 
    );
     
   } else {
    return (
      <div
        className="groupName"
        onClick={() => {
          setGroupID(group[1]);
          setName(group[0]);
          setHomePage(true); //changes screen
        }}
      >
        <div className="left_box">{group[0]}</div>
        <div className="right_box">
          <img src={rightarrow} className="rightarrow" alt="rightarrow" />
        </div>
      </div>
    )

   }
     
  }
 

export default Group;
 
