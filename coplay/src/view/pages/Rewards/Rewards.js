
import React, {useState} from 'react';
import './Rewards.css';
import Reward from '../../Reward/Reward';



function Rewards(props) {   
    const [rewardsLists, setRewardsList] = useState([]);
    const [counter, setCounter] = useState(0);
    const [showForm, setShowForm] = React.useState(false);
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
    <div className="AddReward" name="AddReward">
        {showForm && <AddRewardForm db = {db} onCancel={() => setShowForm(false)} />}

        <button
          className="addRewardbtn"
          id="PopUp"
          onClick={() => setShowForm(!showForm)}
        >
          +
        </button>
      </div>
        </div>
 
    )
}

export default Rewards;

function updateRewards(setRewardsList, setCounter, db){
    let list = [];

    db.collection("Rewards")
    .get()
    .then(rewardsdb => {
        rewardsdb.forEach(rewarddb => {
            let rewardInfo = [];
            rewardInfo.push(rewarddb.get("name"));
            rewardInfo.push(rewarddb.get("value"));

            list.push(rewardInfo);
        });
        setRewardsList(list);

        setCounter(1);
    });
}
 
function addReward(event, db) {
  event.preventDefault();

  console.log("saved my G");
  let title = event.target.elements.title.value;
  let points = event.target.elements.points.value;
  if (title == "") {
    alert("Must enter a title");
  } else if (points == "") {
    alert("Must enter points");
  } else {
    parseInt(points)
    console.log("The Reward" + title + "has been added with a cost of" + points);
    db.collection("Rewards")
      .doc(title)
      .set({
        value: points,
        name: title
      });
  }

  event.target.elements.title.value = "";
  event.target.elements.points.value = "";
}


function AddRewardForm(props) {
  const { db } = props;
  console.log("form opened");
  return (
    <div name="PopUp" className="PopUp">
      <div id="grid">
        <form
          onSubmit={event => {
            addReward(event, db);
          }}
        >
          <div id="TitleAddReward">Add Reward</div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            id="Title"
          ></input>
          <input
            type="text"
            name="points"
            placeholder="Points"
            id="Points"
          ></input>
          <div className="button">
            <input type="submit" name="save" id="Save" value="Save"></input>
          </div>
        </form>

        <button
          name="cancel"
          className="Cancel"
          value="Cancel"
          onClick={props.onCancel}
        >
        X
        </button>
      </div>
    </div>
  );
}


