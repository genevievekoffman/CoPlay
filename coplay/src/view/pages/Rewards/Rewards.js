import React, {useState} from 'react';
import './Rewards.css';
import Reward from '../../Reward/Reward';




function Rewards(props) {   
    const [rewardsLists, setRewardsList] = useState([]);
    const [counter, setCounter] = useState(0);
    const {db} = props;

    if (counter == 0) {
        updateRewards(setRewardsList, setCounter, db);
    }
     
    return (
        <div> 
            <h4>
            {rewardsLists.map((reward, index) => {
                return <Reward reward = {reward} key = {index} db={db} />;
            })}
            </h4>
        </div>
 
    )
}

export default Rewards;

function updateRewards(setRewardsList, setCounter, db){
    let list = [];

    db.collection("Rewards")
    .get()
    .then(rewardsDB => {
        rewardsDB.forEach(rewardDB => {
            let rewardInfo = [];
            rewardInfo.push(rewardDB.get("name"));
            rewardInfo.push(rewardDB.get("value"));

            list.push(rewardInfo);
        });
        setRewardsList(list);

        setCounter(1);
    });
}
 