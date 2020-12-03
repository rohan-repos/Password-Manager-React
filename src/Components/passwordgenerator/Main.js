import React,{useEffect} from "react";
import Header from "./header/Header";
import Display from "./display/Display";
import DisplayStrength from "../passwordstrengthchecker/DisplayStrength";
import { Tabs, Tab,Container,Card } from "react-bootstrap";

const Main = () => {
  const contStyle = {
    display: "flex",
    // alignItems:"center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  
  useEffect(() => {
    window.scrollTo(0,0)
   
  }, [])

  return (
    <Container style={contStyle}>
      <Card>
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
      </Card>
    </Container>
  );
};

export default Main;
