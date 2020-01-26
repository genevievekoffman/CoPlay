import React, { useState } from "react";
import "./Reward.css"; 

//component
import star from "../../Sketches/Star.svg";
import Addreward from "../../Popups/AddReward/AddReward";

function Reward(props) {
  //passed an array of rewards
  const { reward, index, db, groupID, setPointsDisplay } = props;
  // const [showModal, setShowModal] = useState(false);
  // const [failModal, setFailModal] = useState(false);

  //for popup
  const [isShowing, setIsShowing] = useState(false);
  const [enoughPoints, setEnoughPoints] = useState(false);

 

  return (
    <div>
      <Addreward 
      isShowing={isShowing} 
      setIsShowing={setIsShowing} 
      enoughPoints = {enoughPoints}
      setEnoughPoints = {setEnoughPoints} 
      />

      <div
        className="reward"
        key={index}
        onClick={() => {
          checkEnoughPoints(db, groupID, reward, setEnoughPoints, setIsShowing,setPointsDisplay);
        }}
      >
        <div className="rewardBig">
          {reward[0]} <br />
        </div>
        <div className="rewardSmall">
          {reward[1]}{" "}
          <img src={star} className="star" alt="star" className="star" />
        </div> 
         
      </div>
    </div>
  );
}

function checkEnoughPoints(db, groupID, reward, setEnoughPoints, setIsShowing,setPointsDisplay){ //returns true(if they have enough points) or false (if they dont)
    db.collection("Groups")
    .doc(groupID)
    .collection("Users")
    .doc(sessionStorage.getItem("user"))
    .get()
    .then(function(doc){
        if (doc.get("totalPoints") >= reward[1]) { //they have enough points to buy reward
            setEnoughPoints(true) 
            deductPoints(db, groupID, reward, setPointsDisplay)
        } else {
            setEnoughPoints(false)
        }
        setIsShowing(true);
         
    })
}


function deductPoints(db, groupID, reward, setPointsDisplay){ //only called if they have enough points
  db.collection("Groups")
  .doc(groupID)
  .collection("Users")
  .doc(sessionStorage.getItem("user"))
  .get()
  .then(function(doc){
      console.log("deducting" + reward[1] + "points")
      let balance = doc.get("totalPoints") - reward[1];

      db.collection("Groups") //deducts points in Groups collection for current user
          .doc(groupID)
          .collection("Users")
          .doc(sessionStorage.getItem("user"))
          .update({
              totalPoints: balance
          });
          setPointsDisplay(true);
           
  })

}

  

export default Reward;
