import React, { useRef, useState,useEffect } from "react";
import { Form, Button, Card, Alert,Container } from "react-bootstrap";
import { useAuth } from "../../../context/AuthContext";
import { useFirestore } from "../../../context/FirebaseContext";
import { Link, useHistory } from "react-router-dom";
import MustContainItem from "../../../Utils/MustContainItem"
import "./Signup.css"

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

    // form inputs
  const [passwordState, setPasswordState] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // set error for alerts
  const [error, setError] = useState("");

  //block submit once it is clicked till async function is completed
  const [loading, setLoading] = useState(false);

  const [containsUL, setContainsUL] = useState(false) // uppercase letter
  const [containsLL, setContainsLL] = useState(false) // lowercase letter
  const [containsN, setContainsN] = useState(false) // number
  const [containsSC, setContainsSC] = useState(false) // special character
  const [contains8C, setContains8C] = useState(false) // min 8 characters
  const [passwordMatch, setPasswordMatch] = useState(false) // passwords match

  // checks all validations are true
  const [allValid, setAllValid] = useState(false)

  const mustContainData = [
    ["An uppercase letter (a-z)", containsUL],
    ["A lowercase letter (A-Z)", containsLL],
    ["A number (0-9)", containsN],
    ["A special character (!@#$)", containsSC],
    ["At least 8 characters", contains8C],
  ]

  const history = useHistory();

  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
  

    history.push({
      pathname: "/security-questions",
      state: {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    });
  }

useEffect(() => {
  window.scrollTo(0,0)
}, [])

  function validatePassword() {
    // has uppercase letter
    if (passwordState.toLowerCase() !== passwordState) {setContainsUL(true)}
    else {setContainsUL(false)}

    // has lowercase letter
    if (passwordState.toUpperCase() !== passwordState) {setContainsLL(true)}
    else {setContainsLL(false)}

    // has number
    if (/\d/.test(passwordState)) {setContainsN(true)}
    else {setContainsN(false)}

    // has special character
    if (/[~`!#$%\^&*@+=\-\[\]\\';,/{}|\\":<>\?]/g.test(passwordState)) {setContainsSC(true)}
    else {setContainsSC(false)}

    // has 8 characters
    if (passwordState.length >= 8) {setContains8C(true)}
    else {setContains8C(false)}


    // all validations passed
    if (containsUL && containsLL && containsN && containsSC && contains8C ) {setAllValid(true)}
    else {setAllValid(false)}
  }

  const contStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  return (
    <div style={contStyle}>
      <div>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  value={passwordState}
                  onChange={(e) => setPasswordState(e.target.value)}
                  onKeyUp={validatePassword}
                  required
                />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyUp={validatePassword}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Next
              </Button>
            </Form>
            <h4>Must contain:</h4>
            <Container>
              {mustContainData.map(data=> <MustContainItem data={data}/>)}
            </Container>

          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}
