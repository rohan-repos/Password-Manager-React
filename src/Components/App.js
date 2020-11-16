import React from "react"
import {Container} from "react-bootstrap"
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

function App() {
  return (
    <AuthProvider>
        <Container className="d-flex align-items-center m-top-10
        justify-content-center" style={{minHeight:"100vh"}}>
          <div className="w-100" style={{maxWidth:"400px"}}>
              <Router>
                <AuthProvider>
                  <Switch>
                    <PrivateRoute exact path="/" component={Dashboard}/>
                    <PrivateRoute path="/update-profile" component={UpdateProfile}/>
                    <RedirectPrivateRoute path="/login" component={Login}/>
                    <RedirectPrivateRoute path="/signup" component={Signup}/>
                    <RedirectPrivateRoute path="/forgot-password" component={ForgotPassword}/>
                    <RedirectPrivateRoute path="/verify" component={VerifyPass}/>
                  </Switch>
                </AuthProvider>
              </Router>
          </div>
        </Container>
    </AuthProvider>
  );
}

export default App;
