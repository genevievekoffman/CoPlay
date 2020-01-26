import React from "react";
import "./CheckUser.css";

import loginfail from "../../Sketches/LoginFail.svg";  

function CheckUser(props){
    const{isShowing, setIsShowing} = props;

    if(isShowing){
        return(
            <div>
                <div className = "behind" onClick = {() => {setIsShowing(false)}}> 
                 </div>
                <div className = "mesg">
                    <img src={loginfail} className="loginfail" alt="loginfail" />
                </div>
            </div>
             
        )
    } else {
        return null
    }
     

}

export default CheckUser;