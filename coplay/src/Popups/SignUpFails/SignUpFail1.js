import React from "react";
import "./SignUpFail1.css";

import signupfail from "../../Sketches/SignUpFail1.svg"
import signupfail2 from "../../Sketches/SignUpFail2.svg"
import signupfail3 from "../../Sketches/SignUpFail3.svg"

function SignUpFail1(props){
    const{isShowing, setIsShowing, issue} = props;

    if(isShowing){
        return(
            <div onClick = {()=>{setIsShowing(false)}}>
                <div className = "bkrnd"> </div>
                <div className = "inMsg">
                    {issue === 1 ? (
                        <img src={signupfail} className="signupfail" alt="signupfail" />
                         
                    ):(
                        issue === 2 ? (
                            <img src={signupfail2} className="signupfail" alt="signupfail2" />
                        ):(
                            <img src={signupfail3} className="signupfail" alt="signupfail3" />
                        )
                    )}
                </div>

            </div>
             
        )
    } else {
        return null
    }
     
}

export default SignUpFail1;