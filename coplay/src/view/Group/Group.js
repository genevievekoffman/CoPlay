import React, {useState} from 'react';
import './Group.css'; 

 
 

function Group(props){
    const {group, index, setTask, setTaskPage} = props;

    return(
        <div className = "group" key = {index} onClick = { () => {
            setTask(group);
            setTaskPage(true); //changes screen
            }}>
            {group[0]}
        </div>
    )
}

export default Group;

 