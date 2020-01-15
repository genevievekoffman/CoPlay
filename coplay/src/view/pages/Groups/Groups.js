import React, { useState } from 'react';
import './Groups.css'
import Group from '../../Group/Group'


function Groups(props) {
    const { db, setGroupID, setHomePage, setName } = props;
    const [groupsList, setGroupsList] = useState([])
    const [counter, setCounter] = useState(0);

    if (counter < 1) {
        fetchMyGroups(db, setGroupsList, setCounter)
    }

    return (
        <div>
            <header className="groupPageTitle" >Your Groups</header>
            {
                <AddGroupForm db = {db}/>
            }
            <div className="groupContainer">
                {groupsList.map((group, index) => {
                    return <Group group={group} key={index} setGroupID={setGroupID} setHomePage ={setHomePage} setName = {setName} />
                })}
            </div>
        </div>
    )
}

export default Groups;

function fetchMyGroups(db, setGroupsList, setCounter) {
    let list = [];

    db.collection("Users").doc(sessionStorage.getItem('user')).collection("Groups").get().then(groupsDB => {
        groupsDB.forEach(groupDB => {
            let groupInfo = [];
            groupInfo.push(groupDB.get("name"))
            groupInfo.push(groupDB.get("ID"))
            list.push(groupInfo)
        });
        //console.log("GROUPS LIST: " + list) //[ ["name", "ID"] , index]
        setGroupsList(list);
        setCounter(1);
    });
}

function addGroupUser(db, title, ID){
    db.collection("Users")
    .doc(sessionStorage.getItem("user")).collection("Groups").doc(ID)
    .set({
      name: title,
      ID: ID
    });
  }
  
  function addGroup(event, db) {
    event.preventDefault();
    let ID;
  
    console.log("Group added");
    let title = event.target.elements.title.value;
    if (title == "") {
      alert("Must enter a title");
    } else {
      console.log("The Group " + title + " has been added");
      ID = "a" + Date.now()
      db.collection("Groups")
        .doc(ID)
        .set({
          name: title
        }) 
        addGroupUser(db, title, ID)
    }
  
    event.target.elements.title.value = "";
  }
  
  
  function AddGroupForm(props) {
    const { db } = props;
    console.log("form opened");
    return (
      <div className="container"> <button data-toggle="modal" data-target="#myModal" id="plus" className="addGroupButton">+</button>
      <div className="row">
  
          <div className="col-md-12">
            <div className="modal fade" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3>Add a Group</h3>
                  </div>
                  <form
                    onSubmit={event => {
                      addGroup(event, db);
                    }}
                  >
                  <div className="modal-body">
                    <input
                      type="text"
                      name = "title"
                      placeholder="Title"
                      id="Title"
                      className="m-1"
                    />
                  
                  </div>
                  <div className="modal-footer">
                    <input
                      className="btn btn-primary"
                      type = "submit"
                      id="Save"
                      value="Save"
                      name = "save"
                    />
                    <input
                      className="btn btn-primary"
                      id="Cancel"
                      value="Cancel"
                      type = "button"
                      // onClick = {props.onCancel}
                    />
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }