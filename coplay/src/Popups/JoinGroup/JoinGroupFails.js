import React from "react"; 
import "./JoinGroupFails.css";

import JoinGroupFail1 from "../../Sketches/JoinGroupFail1.svg";

function JoinGroupFails(props){
    const{isShowingFails, setIsShowingFails} = props;

    if(isShowingFails){
        console.log("true")
        return(
            <div className = "backgrnd" onClick = {() => {
                setIsShowingFails(false) 
                }}>
                <div className = "message">
                <img src={JoinGroupFail1}  alt="JoinGroupFail1" />
                </div>
            </div>
        )
    } else{
        return null
    }
     
}

export default JoinGroupFails;