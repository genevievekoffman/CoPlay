import React, { useState } from 'react';
import './Groups.css'
import Group from '../../Group/Group'

function Groups(props) {
    const { db } = props;
    const [groupsList, setGroupsList] = useState([])
    const [counter, setCounter] = useState(0);

    if (counter < 1) {
        fetchMyGroups(db, setGroupsList, setCounter)
    }

    return (
        <div>
            <header className="groupPageTitle" >Your Groups</header>
            <AddGroupForm db = {db}/>


            <div className="groupContainer">
                {groupsList.map((group, index) => {
                    return <Group group={group} key={index} db={db} />
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

            list.push(groupInfo)
        });
        setGroupsList(list);
        setCounter(1);
    });
}

function AddGroupForm(props) {
    const { db } = props;
    console.log("form opened");
    return (
      <div class="container"> <button data-toggle="modal" data-target="#myModal" id="plus" className=".btn-default">+</button>
      <div class="row">
  
          <div class="col-md-12">
            <div class="modal fade" id="myModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3>Add a Group</h3>
                  </div>
                  <form
                    onSubmit={event => {
                      addGroup(event, db);
                    }}
                  >
                  <div class="modal-body">
                    <input
                      type="text"
                      name = "title"
                      placeholder="Title"
                      id="Title"
                      className="m-1"
                    />
                  
                  </div>
                  <div class="modal-footer">
                    <input
                      class="btn btn-primary"
                      type = "submit"
                      id="Save"
                      value="Save"
                      name = "save"
                    />
                    <input
                      class="btn btn-primary"
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

function addGroup(event, db) {
  event.preventDefault();

  console.log("Group added");
  let title = event.target.elements.title.value;
  if (title == "") {
    alert("Must enter a title");
  } else if (title == "") {
    alert("Must enter points");
  } else {
    console.log("The Group " + title + " has been added");
    db.collection("Groups")
      .doc(title)
      .set({
        name: title
      });
      addGroupUser(db, title)
  }

  event.target.elements.title.value = "";
}

function addGroupUser(db, title){
    //find current user
    console.log("Adding the group " + title + " to user " + sessionStorage.getItem("user"))
    db.collection("Users")
    .doc(sessionStorage.getItem("user")).collection("Groups").doc(title)
    .set({
      name: title
    });
    //add to their doc name, myGroup:
  }


