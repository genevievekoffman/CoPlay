
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
         <button data-toggle="modal" data-target="#myModal" id="rewardPlus" className=".btn-default">+</button>
            <h4>
            {rewardsLists.map((reward, index) => {
                return <Reward reward = {reward} key = {index} db={db} />;
            })}
            </h4>
    <div className="AddReward" name="AddReward">
        {showForm && <AddRewardForm db = {db} setRewardsList = {setRewardsList} setCounter ={setCounter} onCancel={() => setShowForm(false)} />}

       
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
  const { db, setRewardsList, setCounter } = props;
  console.log("form opened");
  return (
    <div class="container"> 
    <div class="row">
        <div class="col-md-12">
       
           
           <div class="modal fade" id="myModal">
               <div class="modal-dialog">
                   <div class="modal-content">

                   <div class="modal-header">
                    <h3>Add Task</h3>
                   </div>
                   <div class="modal-body">
                       <input type="text" placeholder="Title" id="Title" className="m-1"/> 
                       <input type="text" placeholder="Points" id="Points" className="m-1"/>
                       
                   </div>
                   <div class="modal-footer">
                       <input class="btn btn-primary" id="Save" data-dismiss="modal" value="Save"/>
                       <input class="btn btn-primary" id="Cancel" data-dismiss="modal" value="Cancel"/>
                   </div>

               </div>
               </div>
           </div>


      
       
       
        </div>


     </div>

   </div>

  );
}


