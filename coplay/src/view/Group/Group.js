import React, { useState } from 'react';
import './Group.css';

//component
import rightarrow from  '../../Sketches/Rightarrow.svg';
import logo from '../../Sketches/logo.svg';

function Group(props) {
    const { group, index, setGroupID, setHomePage, setName } = props;
    //["name", "ID"]

    return (





        <div className="groupName" onClick={() => {
            setGroupID(group[1]);
            setName(group[0])
            setHomePage(true); //changes screen 
        }}>
            <div className='left_box'>
                {group[0]}
            </div>
            <div className='right_box'>
                <img src={logo} alt='rightarrow' />
            </div>

        </div>


        //     {/* <div className = "subInfo">
        //        {group[1]}
        //  </div>  */}

    )
}

export default Group;

