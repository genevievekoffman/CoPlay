import React, { useState } from "react";
import "./Reward.css";

function Reward(props) {
    //passed an array of rewards
    const { reward, index, db } = props;
    return (
        <div className="reward" key={index}>
            <div>
                <button className = "checkBox" onClick={() => deductPoints(reward[1], db)}> </button>
            </div>
            <div>
                <div className = "rewardBig">
                    {reward[0]} <br />
                </div>
                <div className = "rewardSmall">
                {reward[1]}
                </div>
                 
            </div>
        </div>
    )
}

function deductPoints(points, db) {
    console.log(points)
    db.collection("Users").doc(sessionStorage.getItem("user")).get().then(function (doc) {

        if (doc.get("totalPoints") >= points) {
            doc.get("totalPoints")

            let balance = doc.get("totalPoints") - points;
            console.log(balance)

            db.collection("Users").doc(sessionStorage.getItem("user")).update({
                totalPoints: balance
            });
        } else{
            console.log("You do not have enough points to claim this reward. Keep working!")
        }
    });
}

export default Reward;