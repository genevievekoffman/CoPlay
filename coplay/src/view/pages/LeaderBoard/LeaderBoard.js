import React, {useState} from 'react';
import './LeaderBoard.css';
import Leader from "../../Leader/Leader";

function LeaderBoard(props) {  
    const { db } = props; 
    const [usersLists, setUsersLists] = useState([]);
    const [counter, setCounter] = useState(0);

    if (counter == 0) {
        updateLeaderBoard(setUsersLists, db, setCounter);
    }
     
    return(
        <div> 

            {usersLists.map((user, index) => {
                return <Leader user={user} key={index} />
            })}
            
            
         </div>
    )
}

export default LeaderBoard;

function updateLeaderBoard(setUsersLists, db, setCounter){
     
    var list = new Array();
    db.collection("Users").get().then(usersDB => {
        usersDB.forEach(userDB => {
            let userInfo = [];
            userInfo.push(userDB.get("name"));
            userInfo.push(userDB.get("totalPoints"));

            list.push(userInfo);
        })
        console.log("users list: " + list);
        list.sort((a,b) => a[1] - b[1]) //will return pos number if a>b 
        setUsersLists(list);
        setCounter(1);
    })
}
 