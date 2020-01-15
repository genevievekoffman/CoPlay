import React, {useState} from 'react';
import './Group.css'; 

 
 

function Group(props){
    const {group, index, setHome, setHomePage} = props;
    //group should be ["name", "ID"]
    console.log(group)
    return(
        <div className = "group" key = {index} onClick = { () => {
            setHome(group[1]);
            setHomePage(true); //changes screen
            }}>
            {group[0]}
        </div>
    )
}

export default Group;

 