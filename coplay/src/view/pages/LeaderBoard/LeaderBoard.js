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
        list = mergeSort(list)  
        console.log("post merge: " + list)
        setUsersLists(list);
        setCounter(1);
    })

}

function mergeSort(arr){ //given a list of arrays formatted (name, #)
    if(arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length/2);

    const left = arr.slice(0, mid); 
    console.log("left: " + left) 
    const right = arr.slice(mid)
    console.log("right: " + right) 

    return merge(
        mergeSort(left), 
        mergeSort(right)
    );
}

function merge(left, right){
    console.log("merging " + left + " and " + right)
    let newArr = [], leftIndex = 0, rightIndex = 0;

    while(leftIndex < left.length && rightIndex < right.length){
        if(left[leftIndex[1]] < right[rightIndex[1]]){ //left is smaller 
            newArr.push(left[leftIndex]);
            leftIndex++;
        } else {
            newArr.push(right[rightIndex]);
            rightIndex++;
        }
    }
    console.log("merged to: " + newArr);
    return newArr
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
}