import React from "react"
import {Container, Navbar,Nav} from "react-bootstrap"
import {AuthProvider} from '../context/AuthContext'
import {BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import Dashboard from "./Dashboard"
import Login from "./Login"
import Signup from "./Signup"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import RedirectPrivateRoute from "./RedirectPrivateRoute"
import VerifyPass from "./VerifyPass"
import ResetPassword from "./ResetPassword"
import HomePage from "./HomePage"
import "./App.css"

function App() {
  return (
    <>
    <AuthProvider>
        <Container style={{margin:0,padding:0,maxWidth:"100%"}}>
          {/* className="d-flex align-items-center m-top-10
        justify-content-center" style={{minHeight:"100vh"}}> */}
          <div >
              <Router>
                <AuthProvider>
                  <Switch>
                    <PrivateRoute exact path="/home" component={Dashboard}/>
                    <PrivateRoute path="/update-profile" component={UpdateProfile}/>
                    <RedirectPrivateRoute exact path="/" component={HomePage}/>
                    <RedirectPrivateRoute path="/login" component={Login}/>
                    <RedirectPrivateRoute path="/signup" component={Signup}/>
                    <RedirectPrivateRoute path="/forgot-password" component={ForgotPassword}/>
                    <RedirectPrivateRoute path="/verify" component={VerifyPass}/>
                    <RedirectPrivateRoute path="/reset-password" component={ResetPassword}/>
                  </Switch>
                </AuthProvider>
              </Router>
          </div>
        </Container>
    </AuthProvider>
    </>
  );
}

export default App;
