import React, {useState, useEffect} from "react";
import "./AddReward.css";


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
                        YOU HAVE ENOUGH POINTS 
                         
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

 
 
 