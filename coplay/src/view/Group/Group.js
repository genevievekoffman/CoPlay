import React, {useState} from 'react';
import './Group.css'; 

 
 

function Group(props){
    const {group, index, setTask, setTaskPage} = props;
    //group should be ["name", "ID"]
    console.log(group)
    return(
        <div className = "group" key = {index} onClick = { () => {
            setTask(group[1]);
            setTaskPage(true); //changes screen
            }}>
            {group[0]}
        </div>
    )
}

export default Group;

 