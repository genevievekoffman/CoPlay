import React, { useState } from "react";
import "./Rewards.css";
import Reward from "../../Reward/Reward";

function Rewards(props) {
  const [rewardsLists, setRewardsList] = useState([]);
  const [counter, setCounter] = useState(0);
  const { db, groupID } = props;

  if (counter == 0) {
    updateRewards(setRewardsList, setCounter, db, groupID);
  }

  return (
    <div>
      <div className="AddReward" name="AddReward">
        <AddRewardForm
          db={db}
          setRewardsList={setRewardsList}
          setCounter={setCounter}
          groupID={groupID}
        />
      </div>

      <h4>
        {rewardsLists.map((reward, index) => {
          return <Reward reward={reward} key={index} db={db} />;
        })}
      </h4>
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
    <div class="container">
      {" "}
      <button
        data-toggle="modal"
        data-target="#myModal"
        id="plus"
        className=".btn-default"
      >
        +
      </button>
      <div class="row">
        <div class="col-md-12">
          <div class="modal fade" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h3>Add Reward</h3>
                </div>
                <form
                  onSubmit={event => {
                    addReward(event, db, setRewardsList, setCounter, groupID);
                  }}
                >
                  <div class="modal-body">
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
                  <div class="modal-footer">
                  <button type="button" class="btn btn-primary btn-sm" id="savee" data-dismiss="modal">Save</button>
                  <button type="button" class="btn btn-secondary btn-sm" id="cancell" data-dismiss="modal">Cancel</button>
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

  if (title == "") {
    alert("Must enter a title");
  } else if (points == "") {
    alert("Must enter points");
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
        reward: title
      });
  }

  event.target.elements.title.value = "";
  event.target.elements.points.value = "";

  updateRewards(setRewardsList, setCounter, db, groupID);
}
