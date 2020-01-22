import React, {useState, useEffect} from "react";
import "./AddReward.css";

import successpopup from "../../Sketches/Successpopup.svg";

function Addreward(props){
    const {isShowing, setIsShowing, setEnoughPoints, enoughPoints} = props;
    //const[enoughPoints, setEnoughPoints] = useState(false)

     
    if (isShowing) {
        console.log(enoughPoints)
        return( 
            <div className = "background" onClick = {() => {
                setIsShowing(false); 
            }}>
                 
                {enoughPoints ? (
                    <div className = "message">
                        <img src={successpopup} className="successpopup" alt="successpopup" />
                         
                    </div>
                ):(
                    <div className = "message"> 
                    You dont have enough points 
                     
                    </div>
                )}  
            </div>
        )
    } else {
        return null
    } 
     
}


export default Addreward

 
 
 