import React, { useState } from "react";
import "./LeaderBoard.css";
import Leader from "../../Leader/Leader";

function LeaderBoard(props) {
  const { db, groupID} = props;
  const [usersLists, setUsersLists] = useState([]);
  const [counter, setCounter] = useState(0);

  if (counter === 0) {
    updateLeaderBoard(setUsersLists, db, setCounter, groupID);
  }

  return (
    <div>
      <div className="leaderBoardTitle">LeaderBoard</div>
      
      {usersLists.map((user, index) => {
        return <Leader user={user} key={index} />;
      })}
    </div>
  );
}

export default LeaderBoard;

function updateLeaderBoard(setUsersLists, db, setCounter, groupID) {
  var list = new Array();
  db.collection("Groups")
    .doc(groupID)
    .collection("Users")
    .get()
    .then(usersDB => {
      usersDB.forEach(userDB => {
        let userInfo = [];
        userInfo.push(userDB.get("username"));
        userInfo.push(userDB.get("leaderBoardPoints"));

        list.push(userInfo);
      });
      console.log(list);
      list.sort((a, b) => b[1] - a[1]);
      setUsersLists(list);
      setCounter(1);
    });

  // db.collection("Users").get().then(usersDB => {
  //     usersDB.forEach(userDB => {
  //         let userInfo = [];
  //         userInfo.push(userDB.get("name"));
  //         userInfo.push(userDB.get("totalPoints"));

  //         list.push(userInfo);
  //     })
  //     list.sort((a,b) => b[1] - a[1])
  //     setUsersLists(list);
  //     setCounter(1);
  // })
}
