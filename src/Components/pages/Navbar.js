import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdFingerprint } from "react-icons/md";
import { Button } from "../Button";
import "./Navbar.css";
import { IconContext } from "react-icons/lib";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
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
                <li className="navs-btn">
                {button ? (
                  <Link to="/password-generator" className="btns-link">
                    <Button buttonStyle="btns--outline">Password Generator</Button>
                  </Link>
                ) : (
                  <Link to="/password-generator" className="btns-link">
                    <Button
                      buttonStyle="btns--ouline"
                      buttonSize="btns--mobile"
                      onClick={closeMobileMenu}
                    >
                      Password Generator
                    </Button>
                  </Link>
                )}
              </li>
              <li className="navs-btn">
                {button ? (
                  <Link to="/login" className="btns-link">
                    <Button buttonStyle="btns--outline">SignUp</Button>
                  </Link>
                ) : (
                  <Link to="/login" className="btns-link">
                    <Button
                      buttonStyle="btns--ouline"
                      buttonSize="btns--mobile"
                      onClick={closeMobileMenu}
                    >
                      SignUp
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

export default Navbar;
