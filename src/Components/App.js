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
import ResetPassword from "./ResetPassword"
import "./App.css"
import Navbar from "./pages/Navbar"
import Home from "./pages/HomePage/Home"
import Footer from "./pages/Footer/Footer"
import Services from "./pages/Services/Services"
import Products from "./pages/Products/Products"

function App() {
  return (
    <>
   
        
          {/* className="d-flex align-items-center m-top-10
        justify-content-center" style={{minHeight:"100vh"}}> */}
          <div >
              <Router>
                <Navbar/>
                <div className="custom-container" styles={{margin:"0px",padding:"0px",minWidth:"100%"}}>
        <div >
                <AuthProvider>
                  <Switch>
                    <PrivateRoute exact path="/home" component={Dashboard}/>
                    <PrivateRoute path="/update-profile" component={UpdateProfile}/>
                    <RedirectPrivateRoute exact path="/" component={Home}/>
                    <RedirectPrivateRoute exact path="/services" component={Services}/>
                    <RedirectPrivateRoute exact path="/products" component={Products}/>
                    <RedirectPrivateRoute exact path="/" component={Home}/>
                    <RedirectPrivateRoute path="/login" component={Login}/>
                    <RedirectPrivateRoute path="/signup" component={Signup}/>
                    <RedirectPrivateRoute path="/forgot-password" component={ForgotPassword}/>
                    <RedirectPrivateRoute path="/verify" component={VerifyPass}/>
                    <RedirectPrivateRoute path="/reset-password" component={ResetPassword}/>
                  </Switch>
                </AuthProvider>
                </div>
                </div>
                <Footer/>
              </Router>

          </div>
        

    </>
  );
}

export default App;
