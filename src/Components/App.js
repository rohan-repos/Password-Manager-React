import React from "react"
import {Container} from "react-bootstrap"
import {AuthProvider} from '../context/AuthContext'
import {BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import Dashboard from "./Dashboard"
import Login from "./Login"
import Signup from "./Signup"


function App() {
  return (
    <AuthProvider>
        <Container className="d-flex align-tems-center m-top-10
        justify-content-center" style={{minHeight:"100vh"}}>
          <div className="w-100" style={{maxWidth:"400px"}}>
            <AuthProvider>
              <Switch>
                <Route exact path="/" component={Dashboard}/>
                <Route exact path="/" component={Login}/>
                <Route exact path="/" component={Signup}/>
              </Switch>
            </AuthProvider>
            <Signup/>
          </div>
        </Container>
    </AuthProvider>
  );
}

export default App;
