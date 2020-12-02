import React, { useState,useEffect } from "react";
import { Link ,useHistory} from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdFingerprint } from "react-icons/md";
import { Button } from "../Button";
import "./Navbar.css";
import { IconContext } from "react-icons/lib";
import { useAuth } from "../../context/AuthContext"

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [error,setError]=useState('')
  const {currentUser,logout} = useAuth() 
  const history = useHistory()
  
  async function handleLogout() {
    setError("")
    try {
      setClick(false);
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  function handleClick() {
    setClick(!click);
  }
  function closeMobileMenu() {
    setClick(false);
  }
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton)
    return()=> {
      window.removeEventListener('resize', showButton)
    }
  }, []);

  if(!currentUser){
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navsbar">
          <div className="navsbar-container container">
            <Link to="/" className="navsbar-logo" onClick={closeMobileMenu}>
              <MdFingerprint className="navsbar-icon" />
              OneId
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "navs-menu active" : "navs-menu"}>
              <li className="navs-item">
                <Link to="/" className="navs-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
             
                <li className="navs-btn">
                {button ? (
                  <Link to="/password-generator" className="btns-link">
                    <Button buttonStyle="btns--outline">Password Generator/ Password Checker</Button>
                  </Link>
                ) : (
                  <Link to="/password-generator" className="btns-link">
                    <Button
                      buttonStyle="btns--ouline"
                      buttonSize="btns--mobile"
                      onClick={closeMobileMenu}
                    >
                      Password Generator/ Password Checker
                    </Button>
                  </Link>
                )}
              </li>
              <li className="navs-btn">
                {button ? (
                  <Link to="/login" className="btns-link">
                    <Button buttonStyle="btns--outline">LogIn / SignUp</Button>
                  </Link>
                ) : (
                  <Link to="/login" className="btns-link">
                    <Button
                      buttonStyle="btns--ouline"
                      buttonSize="btns--mobile"
                      onClick={closeMobileMenu}
                    >
                      LogIn / SignUp
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );}
  else{
    return (
      <>
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className="navsbar">
            <div className="navsbar-container container">
              <Link to="/" className="navsbar-logo" onClick={closeMobileMenu}>
                <MdFingerprint className="navsbar-icon" />
                OneId
              </Link>
              <div className="menu-icon" onClick={handleClick}>
                {click ? <FaTimes /> : <FaBars />}
              </div>
              <ul className={click ? "navs-menu active" : "navs-menu"}>
                <li className="navs-item">
                  <Link to="/home" className="navs-links" onClick={closeMobileMenu}>
                    Dashboard
                  </Link>
                </li>
               
                  <li className="navs-btn">
                  {button ? (
                    <Link to="/update-profile" className="btns-link">
                      <Button buttonStyle="btns--outline">Profile</Button>
                    </Link>
                  ) : (
                    <Link to="/update-profile" className="btns-link">
                      <Button
                        buttonStyle="btns--ouline"
                        buttonSize="btns--mobile"
                        onClick={closeMobileMenu}
                      >
                        Profile
                      </Button>
                    </Link>
                  )}
                </li>
                <li className="navs-btn">
                  {button ? (
                    // <Link to="/login" className="btns-link">
                      <Button buttonStyle="btns--outline" onClick={handleLogout}>Log Out</Button>
                    // </Link>
                  ) : (
                    <Link to="/logout" className="btns-link">
                      <Button
                        buttonStyle="btns--ouline"
                        buttonSize="btns--mobile"
                        onClick={handleLogout}
                      >
                        LogOut
                      </Button>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
}

export default Navbar;

 {/* <li className="nav-item">
                <Link
                  to="/features"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/how" className="nav-links" onClick={closeMobileMenu}>
                  How it works?
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </li> */}
