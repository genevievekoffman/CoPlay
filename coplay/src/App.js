import React from 'react';
import './App.css';
import firebase from 'firebase';

//Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAQrMqvW5LWBc2rXz-ve-jdgUnwXGtT9Gk",
  authDomain: "coplay-85fcb.firebaseapp.com",
  databaseURL: "https://coplay-85fcb.firebaseio.com",
  projectId: "coplay-85fcb",
  storageBucket: "coplay-85fcb.appspot.com",
  messagingSenderId: "665171121143",
  appId: "1:665171121143:web:26c80d193d2c122876d4f2",
  measurementId: "G-FY38M8DQM6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const DB = firebase.firestore();
 
 

function App() {
  return (
    <div className="App">
      <form onSubmit = {(event) => {
        checkUser(event)
      }}>
        <input type = 'text'name='username' placeholder="username"></input>
        <input type = 'text'name='password' placeholder="password"></input>
        <input type = 'submit'value='Verify Credentials'></input>
      </form>
                
         
    </div>
  );
}
 

function checkUser(e){
  e.preventDefault();
  console.log("function called")
  let username = e.target.elements.username.value;
  let password = e.target.elements.password.value;

  //DB.collection('Users').doc('Adin').set({username:'alien'})
  var docRef = DB.collection('Users').doc(username);
  docRef.get().then(function(doc){
      if(doc.exists){
        //console.log("Exist: Document data: ", doc.data());
        if(password === doc.data().password) {
          console.log("passwords match")
          DB.collection('Users').doc(username).update({isLogged:true})
          checkLogged(username);
        } else {
          console.log("passwords dont match")
        }
        
      } else {
        console.log("no info found")
  }
})
}

function checkLogged(username){
  DB.collection('Users').doc(username).get().then(function(doc){
    if(doc.data().isLogged === true){
      console.log(doc.data().isLogged)
    }
  })
}

export default App;
