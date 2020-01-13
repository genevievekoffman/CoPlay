import React, { useState } from "react";
import "./Reward.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Reward(props) {
  //passed an array of rewards
  const { reward, index, db } = props;
  const [showModal, setShowModal] = useState(false);

  const handleCheckboxClick = () =>
    deductPoints(reward[1], db, () => setShowModal(true));

  return (
    <div className="reward" key={index}>
      <div>
        <button className="checkBox" onClick={handleCheckboxClick}></button>
      </div>
      <div>
        <div className="rewardBig">
          {reward[0]} <br />
        </div>
        <div className="rewardSmall">{reward[1]}</div>
      </div>
      <PurchaseSuccess show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
}
//callback is the arrow function 13
function deductPoints(points, db, callback) {
  console.log(points);
  db.collection("Users")
    .doc(sessionStorage.getItem("user"))
    .get()
    .then(function(doc) {
      if (doc.get("totalPoints") >= points) {
        doc.get("totalPoints");

        let balance = doc.get("totalPoints") - points;
        console.log("Your balance is " + balance);

        db.collection("Users")
          .doc(sessionStorage.getItem("user"))
          .update({
            totalPoints: balance
          });
        console.log("Adin is gay");
        callback();
      } else {
        console.log(
          "You do not have enough points to claim this reward. Keep working!"
        );
      }
    });
}

function PurchaseSuccess(props) {
  return (
    <div>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>You have sucessfully purchased this reward</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Reward;
