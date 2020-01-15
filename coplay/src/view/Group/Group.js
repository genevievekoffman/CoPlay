import React, {useState} from 'react';
import './Group.css'; 

 
 

function Group(props){
    const {group, index, setGroupID, setHomePage} = props;
    //group should be ["name", "ID"]
    console.log(group)
    return(
        <div className = "group" key = {index} onClick = { () => {
            setGroupID(group[1]);
            setHomePage(true); //changes screen
            }}>
            {group[0]}
        </div>
    )
}

export default Group;

 