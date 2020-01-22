import React, { useState } from "react";
import "./Rewards.css";
import Reward from "../../Reward/Reward";

import star from "../../../Sketches/Star.svg";
import plus from "../../../Sketches/Plus.svg"; 


function Rewards(props) {
  const [rewardsLists, setRewardsList] = useState([]);
  const [counter, setCounter] = useState(0);
  const { db, groupID } = props;
  const [points, setPoints] = useState(" ");
  const [pointsDisplay, setPointsDisplay] = useState(false);

  if (counter === 0) {
    updateRewards(setRewardsList, setCounter, db, groupID);
  }

  if(pointsDisplay){
    displayPoints(db, setPoints, groupID, setPointsDisplay)
    setPointsDisplay(false);
  }

  return (
    <div >
      <div className="rewardsTitle">Rewards</div>
       

      <div className = "rewardsContainer">
        {rewardsLists.map((reward, index) => { 
          return <Reward reward={reward} key={index} db={db} groupID={groupID} setPointsDisplay={setPointsDisplay} />;
        })}
      </div>

      <div className="AddReward" name="AddReward">
        <AddRewardForm
          db={db}
          setRewardsList={setRewardsList}
          setCounter={setCounter}
          groupID={groupID}
        />
      </div>

      <div className="pointsHolder">
        <img src={star} className="star" alt="star" className="star" />
        {displayPoints(db, setPoints, groupID)}
        <div id="points" className="points"> {points} </div>
      </div>

    </div>
  );
}

export default Rewards;

function updateRewards(setRewardsList, setCounter, db, groupID) {
  var list = new Array();
  //let list = [];

  db.collection("Groups")
    .doc(groupID)
    .collection("Rewards")
    .orderBy('time', 'asc')
    .get()
    .then(RewardsDB => {
      RewardsDB.forEach(RewardDB => {
        let RewardInfo = [];
        RewardInfo.push(RewardDB.get("reward"));
        RewardInfo.push(RewardDB.get("points"));

        list.push(RewardInfo);
      });
      setRewardsList(list);
      //console.log(list);

      setCounter(1);
    });
}

function AddRewardForm(props) {
  const { db, setRewardsList, setCounter, groupID } = props;
  return (
    <div>  

      <button 
        className = "plusBtn"
        data-toggle="modal"
        data-target="#myModal"
        id="plus"
        className=".btn-default"
      >
        {<img src={plus} alt="plus" />}
      </button>
      <div className="row">
        <div className="col-md-12">
          <div className="modal fade" id="myModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Add Reward</h3>
                </div>
                <form
                  onSubmit={event => {
                    addReward(event, db, setRewardsList, setCounter, groupID);
                  }}
                >
                  <div className="modal-body">
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      id="Title"
                      className="m-1"
                    />
                    <input
                      type="text"
                      name="points"
                      placeholder="Points"
                      id="Points"
                      className="m-1"
                    />
                  </div>
                  <div className="modal-footer">

                    <button
                      data-toggle="modal"
                      data-target="#myModal"
                      type="button submit"
                      className="btn btn-primary btn-sm"
                      id="savee"

                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      id="cancell"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function addReward(event, db, setRewardsList, setCounter, groupID) {
  event.preventDefault();

  console.log("saved my G");
  let title = event.target.elements.title.value;
  let points = event.target.elements.points.value;
  console.log(groupID);

  if (title === "") {
    alert("Must enter a title");
  } else if (points === "") {
    alert("Must enter points");
  } else if (parseInt(points) <= 0) {
    alert("Invalid Input. Stay Positive!")
  } else {

    points = parseInt(points);
    console.log(
      "The Reward " + title + " has been added with a reward of " + points
    );
    db.collection("Groups")
      .doc(groupID)
      .collection("Rewards")
      .doc(title)
      .set({
        points: points,
        reward: title,
        time: Date.now()
      });
  }

  event.target.elements.title.value = "";
  event.target.elements.points.value = "";

  updateRewards(setRewardsList, setCounter, db, groupID);
}

function displayPoints(db, setPoints, groupID, setPointsDisplay) {
  db.collection("Groups")
    .doc(groupID)
    .collection("Users")
    .doc(sessionStorage.getItem("user"))
    .get()
    .then(userDB => {
      let points = userDB.get("totalPoints");

      setPoints(points);

    });
}
