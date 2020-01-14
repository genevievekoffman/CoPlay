import React from "react";
import "./Leader.css";

function Leader(props) {
    const { user, index } = props;

    return(
        <div className = "leader" key={index}> 
            {user[0]}
            <br></br>
            {user[1]}
        </div>
    )
}
export default Leader