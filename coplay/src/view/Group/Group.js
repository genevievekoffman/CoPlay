import React, {useState} from 'react';
import './Group.css'; 

 
 

function Group(props){
    const {group, index, setGroupID, setHomePage, setName} = props;
    //group should be ["name", "ID"]
    console.log(group)
    return(
        <div className = "group" key = {index} onClick = { () => {
            setGroupID(group[1]);
            setHomePage(true); //changes screen
            setName(group[0])
            }}>
            {group[0]}
        </div>
    )
}

export default Group;

 