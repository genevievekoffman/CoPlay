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
            {
                <AddGroupForm db = {db}/>
            }
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

function addGroupUser(db, title){
    db.collection("Users")
    .doc(sessionStorage.getItem("user")).collection("Groups").doc(title)
    .set({
      myGroup: title
    });
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

