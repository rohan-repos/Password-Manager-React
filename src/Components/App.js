import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { FirestoreProvider } from "../context/FirebaseContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Login from "./Login";
import Signup from "./signup/Signup";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import RedirectPrivateRoute from "./RedirectPrivateRoute";
import VerifyPass from "./VerifyPass";
import ResetPassword from "./forgotpassword/ResetPassword";
import "./App.css";
import Navbar from "./pages/Navbar";
import Home from "./pages/HomePage/Home";
import Footer from "./pages/Footer/Footer";
import Main from "./passwordgenerator/Main";
import SecurityQuestions from "./SecurityQuestions";

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
