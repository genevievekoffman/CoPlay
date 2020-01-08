import React from 'react';
import './Task.css'

function Task(props){ //passed an array of tasks
     
    console.log("props: ", props.task[0]);
    
    //console.dir(props.task)
    // let arr = props.task
    // console.dir(arr)
    // console.dir(arr[0])
     
     

    return(
        <div className = 'task' key = {props.index}>
              {props.task[0]} <br></br>
              {props.task[1]}
        </div>
 
    )
}

export default Task;