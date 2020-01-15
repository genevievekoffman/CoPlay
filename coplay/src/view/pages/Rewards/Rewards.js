
import React, {useState} from 'react';
import './Rewards.css';
import Reward from '../../Reward/Reward';



function Rewards(props) {   
    const [rewardsLists, setRewardsList] = useState([]);
    const [counter, setCounter] = useState(0);
    const [showForm, setShowForm] = React.useState(true);
    const {db} = props;

    if (counter == 0) {
        updateRewards(setRewardsList, setCounter, db);
    }
     
    return (
        <div> 

    <div className="AddReward" name="AddReward">
        {showForm && <AddRewardForm db = {db} onCancel={() => setShowForm(false)} />}

      </div>

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
    .then(rewardsdb => {
        rewardsdb.forEach(rewarddb => {
            let rewardInfo = [];
            rewardInfo.push(rewarddb.get("name"));
            rewardInfo.push(rewarddb.get("value"));

            list.push(rewardInfo);
        });
        list.sort((a,b) => a[1] - b[1]) 
        setRewardsList(list);

        setCounter(1);
    });
}
 
function addReward(event, db, setRewardsList, setCounter) {
  event.preventDefault();

  console.log("saved my G");
  let title = event.target.elements.title.value;
  let points = event.target.elements.points.value;
  if (title == "") {
    alert("Must enter a title");
  } else if (points == "") {
    alert("Must enter points");
  } else {
    points = parseInt(points);
    console.log("The Reward " + title + " has been added with a cost of " + points);
    db.collection("Rewards")
      .doc(title)
      .set({
        value: points,
        name: title
      });
  }

  event.target.elements.title.value = "";
  event.target.elements.points.value = "";
  
  updateRewards(setRewardsList, setCounter, db);
}


function AddRewardForm(props) {

  const [counter, setCounter] = useState(0);
  const [tasksLists, setTasksList] = useState([]);
  const { db } = props;
  console.log("form opened");
  return (
    <div class="container"> <button data-toggle="modal" data-target="#myModal" id="plus" className=".btn-default">+</button>
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
                    addReward(event, db, setTasksList, setCounter);
                  }}
                >
                <div class="modal-body">
                  <input  type="text" name = "title" placeholder="Title" id="Title" className="m-1" />
                  <input type="text"  name = "points" placeholder="Points" id="Points"  className="m-1"/>
              
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


    

    /*<div class="container"> <button data-toggle="modal" data-target="#myModal" id="rewardPlus" className=".btn-default">+</button>
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
                    addReward(event, db, setTasksList, setCounter);
                  }}
                >
                <div class="modal-body">
                    <input type="text" placeholder="Title" id="Title" className="m-1"></input>
                    <input type="text" placeholder="Points" id="Points" className="m-1"></input>
                    </div>
                    <div class="modal-footer">
                      <input class="btn brn-primary" id="Save" data-dismiss="modal" value="Save"></input>
                      <input class="btn brn-primary" id="Cancel" data-dismiss="modal" value="Cancel"></input>
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
*/

