import React, { useState } from "react";
import "./Reward.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Reward(props) {
  //passed an array of rewards
  const { reward, index, db } = props;
  const [showModal, setShowModal] = useState(false);
  const [failModal, setFailModal] = useState(false);

  const revealSuccessTask = () => {
    setShowModal(true);
  };
  const revealFailTask = () => {
    setFailModal(true);
  };
  const handleCheckboxClick = () =>
    deductPoints(reward[1], db, revealSuccessTask, revealFailTask);

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
      <PurchaseSuccess
        showSuccess={showModal}
        hideSuccess={() => setShowModal(false)}
      />
      <PurchaseFail
        showFailure={failModal}
        hideFailure={() => setFailModal(false)}
      />
      {/* The functions above are the ones passed to the component PurchaseSuccess */}
    </div>
  );
}
//revealSuccessTask is the arrow function handleChecboxClick
function deductPoints(points, db, revealSuccessTask, revealFailTask) {
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
        revealSuccessTask();
        //this does setShowModal(true); as set in the function handleCheckboxClick
      } else {
        console.log(
          "You do not have enough points to claim this reward. Keep working!"
        );
        revealFailTask();
        //there should be a function here that sets a state that shows a different component
      }
    });
}

function PurchaseSuccess(props) {
  return (
    <div>
      <Modal show={props.showSuccess} onHide={props.hideSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>You have sucessfully purchased this reward</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hideSuccess}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
function PurchaseFail(props) {
  return (
    <div>
      <Modal show={props.showFailure} onHide={props.hideFailure}>
        <Modal.Header closeButton>
          <Modal.Title>Failure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You do not have enough points to purchase this reward
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hideFailure}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Reward;
