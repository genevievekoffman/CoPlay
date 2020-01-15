import React, {useState} from 'react';
import './Group.css'; 

 
 

function Group(props){
    const {group, index, setGroupID, setHomePage, setName} = props;
    //["name", "ID"]
     
    return(
        <div className = "group" key = {index} onClick = { () => {
            setGroupID(group[1]);
            setName(group[0])
            setHomePage(true); //changes screen 
            }}>
            {group[0]}
        </div>
    )
}

export default Group;

 