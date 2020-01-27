import React from "react";
import "./Leader.css";

//component
import crown from "../../Sketches/Crown.svg";

function Leader(props) {
    const { user, index } = props;

    if (sessionStorage.getItem("user") === user[0]) { //current user
        return(
            <div className = "leaderMe" key={index}> 
            {user[0]} :
            {user[1]}
            <img src={crown} className="crown" alt="crown" />
        </div>
        )
    } else {
        return(
            <div className = "leader" key={index}> 
                {user[0]} : 
                {user[1]}
                <img src={crown} className="crown" alt="crown" />
            </div>
        ) 
    }

     
}
export default Leader