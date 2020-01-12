import React, { useState } from "react";
import "./Reward.css";

function Reward(props){
    //passed an array of rewards
    const { reward, index, db } = props;
    return( 
        <div className = "reward" key = {index}>
            <div>
                <button>
                    Claim Reward
                </button>
            </div>
            <div>
                {reward[0]} <br/>
                {reward[1]}  
            </div>
        </div>
    )
}

export default Reward;