import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { FirestoreProvider } from "../context/FirebaseContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import PrivateRoute from "./Routes/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import RedirectPrivateRoute from "./Routes/RedirectPrivateRoute";
import VerifyPass from "../Utils/VerifyPass";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import "./App.css";
import Navbar from "./pages/Navbar/Navbar";
import Home from "./pages/HomePage/Home";
import Footer from "./pages/Footer/Footer";
import Main from "./passwordgenerator/Main";
import SecurityQuestions from "./pages/SecurityQuestions/SecurityQuestions";

function App() {
  return (
    <>
      <div>
        <Router>
          <div
            className="custom-container"
            styles={{ margin: "0px", padding: "0px", minWidth: "100%" }}
          >
            <div>
              <AuthProvider>
                {/*Auth context provider to access firebase authentication services*/}
                <FirestoreProvider>
                  {/*Firestore context provider to access firebase authentication services*/}
                  <Navbar />
                  <Switch>
                    {/* <PrivateRoute/> Component- Route accessible to user after logging in
                    <RedirectPrivateRoute/> Component- Route accessible to user before logging in */}
                    <RedirectPrivateRoute exact path="/" component={Home} />
                    <RedirectPrivateRoute path="/login" component={Login} />
                    <RedirectPrivateRoute path="/signup" component={Signup} />
                    <RedirectPrivateRoute
                      path="/security-questions"
                      component={SecurityQuestions}
                    />
                    <RedirectPrivateRoute
                      path="/forgot-password"
                      component={ForgotPassword}
                    />
                    <RedirectPrivateRoute
                      path="/verify"
                      component={VerifyPass}
                    />
                    <RedirectPrivateRoute
                      path="/reset-password"
                      component={ResetPassword}
                    />
                    <Route path="/password-generator" component={Main} />
                    <PrivateRoute exact path="/home" component={Dashboard} />
                    <PrivateRoute
                      path="/update-profile"
                      component={UpdateProfile}
                    />
                  </Switch>
                </FirestoreProvider>
              </AuthProvider>
            </div>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
