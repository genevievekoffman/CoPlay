import React, {useState} from 'react';
import './SignUp.css';

function SignUp(props){
    const {db, setIsRegistering} = props;
    return (
        <div className = "grid"> 
            <div id="leftCol"></div>
            <div id="LogIn">Coplay</div>
            <div id="slogan">Coexisting sounds hard but<br></br>CoPlay sounds like fun</div>
            
             
            <form id="createUserForm" onSubmit={event => { registerUser(event, db, setIsRegistering); }}>
                <div id = "formFlex">
                    <div id="userLabel">Username</div>
                    <input type="text" name="username" id="name"></input>
                    <br></br>
                    <div id="passwordLabel">Password</div>
                    <input type="text" name="password" id="password"></input>
                    <br></br>
                    <input type="submit" id="submitLogin" value="Create Account"></input> 
                </div>
                 
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