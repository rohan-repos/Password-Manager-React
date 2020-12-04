// import React, { Component, useState } from "react";
// import PasswordStrengthChecker from "./PasswordStrengthChecker";

// class DisplayStrength extends Component {
//   constructor() {
//     super();
//     this.state = {
//       password: "",
//     }
//   }
//   render() {
//     const { password } = this.state;
//     return (
//         <div className="DisplayStrength">
//       <div className="meter">
//         <input
//           autoComplete="off"
//           type="password"
//           onChange={(e) => this.setState({ password: e.target.value })}
//         />
//         <PasswordStrengthChecker pass={password} />
//       </div>
//       </div>
//     );
//   }
// }

// export default DisplayStrength;

import React, { useState } from "react";
import PasswordStrengthChecker from "./PasswordStrengthChecker";
import { FiEye, FiEyeOff } from "react-icons/fi";

function DisplayStrength() {
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  function handleChange(e) {
    setPass(e.target.value);
  }

  function handleToggle() {
    setShowPass(!showPass);
  }

  return (
    <div className="DisplayStrength p-4">
      <div className="meter">
        <h2>Enter the password to check the strength</h2>
        <div>
        {showPass ? (
          <input autoComplete="off" type="text" onChange={handleChange} placeholder="type here to check"/>
        ) : (
          <input autoComplete="off" type="password" onChange={handleChange} placeholder="type here to check"/>
        )}{
            <span onClick={handleToggle} className="pl-2">
              {showPass ? <FiEye /> : <FiEyeOff />}
            </span>
          }</div>
        
        <PasswordStrengthChecker pass={pass} />
      </div>
    </div>
  );
}

export default DisplayStrength;
