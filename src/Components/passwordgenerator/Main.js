import React from "react";
import Header from "./header/Header";
import Display from "./display/Display";
import DisplayStrength from "../passwordstrengthchecker/DisplayStrength";
import { Tabs, Tab } from "react-bootstrap";

const Main = () => {
  const contStyle = {
    display: "flex",
    // alignItems:"center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  return (
    <div style={contStyle}>
      <div style={{maxWidth:"1200px"}}>
        <Tabs defaultActiveKey="generatepassword" id="uncontrolled-tab-example">
          <Tab eventKey="generatepassword" title="Generate Password">
            <Header />
            <Display />
          </Tab>
          <Tab eventKey="passwordchecker" title="Password Checker">
            <DisplayStrength />
          </Tab>
        </Tabs>
        
      </div>
    </div>
  );
};

export default Main;
