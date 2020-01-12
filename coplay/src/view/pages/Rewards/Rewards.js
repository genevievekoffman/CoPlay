import React from "react";
import "./Rewards.css";
import firebase from "firebase";

function Rewards(props) {
  const [showForm, setShowForm] = React.useState(false);
  const {db} = props;
  return (
    <div>
      This is the Rewards Page lorem This is the Rewards Page lorem This is the
      Rewards Page lorem This is the Rewards Page lorem This is the Rewards Page
      lorem This is the Rewards Page lorem This is the Rewards Page lorem This
      is the Rewards Page loremThis is the Rewards Page lorem This is the
      Rewards Page lorem This is the Rewards Page lorem This is the Rewards Page
      lorem This is the Rewards Page lorem This is the Rewards Page lorem This
      is the Rewards Page lorem This is the Rewards Page loremThis is the
      Rewards Page lorem This is the Rewards Page lorem This is the Rewards Page
      lorem This is the Rewards Page lorem This is the Rewards Page lorem This
      is the Rewards Page lorem This is the Rewards Page lorem This is the
      Rewards Page lorem This is the Rewards Page lorem This is the Rewards Page
      lorem This is the Rewards Page lorem This is the Rewards Page lorem This
      is the Rewards Page lorem This is the Rewards Page lorem This is the
      Rewards Page lorem This is the Rewards Page lorem
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
  );
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
          Cancel
        </button>
      </div>
    </div>
  );
}

function addReward(event, db) {
  event.preventDefault();

  console.log("saved my G");
  let title = event.target.elements.title.value;
  let points = parseInt(event.target.elements.points.value);
  if (title == "") {
    alert("Must enter a title");
  } else if (points == "") {
    alert("Must enter points");
  } else {
    console.log(title);
    console.log(points);
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

export default Rewards;
