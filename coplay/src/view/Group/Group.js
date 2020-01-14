import React, {useState} from 'react';
import './Group.css';

function Group(props){
    const {group, index, db} = props;

    return(
        <div className = "group" key = {index}>
            {group[0]}
        </div>
    )
}

export default Group;