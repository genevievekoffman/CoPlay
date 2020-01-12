import React from 'react';
import './Rewards.css';



function Rewards(props) {
    const{reward, index, db} = props;

    return (
        <div>
            This is the Rewards Page
            <button className="purchase" onClick={() => deductPoints(reward[1], db)} class>Purchase</button>
        </div>
    )
}

function deductPoints(points, db) {
    db.collection("Users").doc("user").get().then(function (doc) {

        let balance = doc.getItem("totalPoints") - points;


        db.collection("Users").doc(sessionStorage.getItem("user")).update({
            totalPoints: balance
        });
    });
}

export default Rewards;