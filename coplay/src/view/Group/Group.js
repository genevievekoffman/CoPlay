import React, {useState} from 'react';
import './Group.css'; 
import Orangegroupbtn from '../../Sketches/Orangegroupbtn.svg'; 

function Group(props){
    const {group, index, setGroupID, setHomePage, setName} = props;
    //["name", "ID"]
     
    return(
        
        
        <div className = "group" key = {index} onClick = { () => {
            setGroupID(group[1]);
            setName(group[0])
            setHomePage(true); //changes screen 
            }}>
                

                
            <Orangegroupbtn />
            <div className = "groupName">
                {group[0]}
            </div>
            <div className = "rightBox">
                >
            </div>
             
            {/* <div className = "subInfo">
                {group[1]}
            </div>  */}
        </div>
    )
}

export default Group;

 