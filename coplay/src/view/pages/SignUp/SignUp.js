import React, {useState} from 'react';
import './SignUp.css';

function SignUp(props){
    const {db, setIsRegistering} = props;
    return (
        <div> 
            <form onSubmit={event => { registerUser(event, db, setIsRegistering); }}>
                <input type="text" name="username" placeholder="username"></input>
                <br></br>
                <input type="text" name="password" placeholder="password"></input>
                <br></br>
                <input type="submit" value="continue"></input> 
            </form>
             
        </div>
 
    )
}

export default SignUp;

function registerUser(e, db, setIsRegistering){
    e.preventDefault();
   

    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value;

    console.log(username, password)


    if (username == "") {
        alert("Must enter a username");
      } else if (password == "") {
        alert("Must enter a password");
      } else {
        db.collection("Users").doc(username).set({
            name: username,
            password: password,
            totalPoints: 0
        }).then(function() {
            console.log("Document successfully written!");
            setIsRegistering(false)
        }); 
      }
}