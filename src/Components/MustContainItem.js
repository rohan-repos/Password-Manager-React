import React from "react";
import { ListGroup } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import "./signup/Signup.css";

function MustContainItem(props) {
  const { data } = props;
  const label = data[0];
  const meetsReq = data[1];

  const setClass = () => {
    const classArr = ["must-line"];
    if (meetsReq) classArr.push("cross-out");
    return classArr.join(" ");
  };
  return (
    // <div className="MustContainItem">
    //   <div className="must-item">
    //     <li className="must-text">{label}</li>
    //     <div className={setClass()}></div>
    //   </div>
    // </div>
    <div className="MustContainItem">
      <div className="must-item">
        <ListGroup className="">
          <ListGroup.Item as="li" className="must-item" >
            <span className="pr-2">{meetsReq ? 
            <IconContext.Provider value={{color:"green"}}>
                <FaCheckCircle />
            </IconContext.Provider> : 
             <IconContext.Provider value={{color:"red"}}>
                <FaTimesCircle />
             </IconContext.Provider>
            }</span>
            {label}
          </ListGroup.Item>
        </ListGroup>
        {/* <li className="must-text">{label}</li> */}
        {/* <div className={setClass()}></div> */}
      </div>
    </div>
  );
}

export default MustContainItem;
