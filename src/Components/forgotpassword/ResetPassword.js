import React, { useRef, useState, useEffect } from "react";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import MustContainItem from "../MustContainItem";

export default function ResetPassword(props) {
  const passwordRef = useRef();
  const history = useHistory();
  const passwordConfirmRef = useRef();
  const { confirmPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [passwordState, setPasswordState] = useState("");
  const [passwordStateConfirm, setPasswordStateConfirm] = useState("");

  const [containsUL, setContainsUL] = useState(false); // uppercase letter
  const [containsLL, setContainsLL] = useState(false); // lowercase letter
  const [containsN, setContainsN] = useState(false); // number
  const [containsSC, setContainsSC] = useState(false); // special character
  const [contains8C, setContains8C] = useState(false); // min 8 characters
  const [passwordMatch, setPasswordMatch] = useState(false); // passwords match

  const [allValid, setAllValid] = useState(false);

  const mustContainData = [
    ["An uppercase letter (a-z)", containsUL],
    ["A lowercase letter (A-Z)", containsLL],
    ["A number (0-9)", containsN],
    ["A special character (!@#$)", containsSC],
    ["At least 8 characters", contains8C],
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (!allValid) {
      return setError("All conditions for password not met");
    }
    try {
      setError("");
      setLoading(true);
      await confirmPassword(
        props.location.state.code,
        passwordRef.current.value
      );
      setMessage("New Password Set");
      history.push("/login");
    } catch {
      setError("Failed to set new password");
    }

    setLoading(false);
  }

  function validatePassword() {
    // has uppercase letter
    if (passwordState.toLowerCase() != passwordState) {
      setContainsUL(true);
    } else {
      setContainsUL(false);
    }

    // has lowercase letter
    if (passwordState.toUpperCase() != passwordState) {
      setContainsLL(true);
    } else {
      setContainsLL(false);
    }

    // has number
    if (/\d/.test(passwordState)) {
      setContainsN(true);
    } else {
      setContainsN(false);
    }

    // has special character
    if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(passwordState)) {
      setContainsSC(true);
    } else {
      setContainsSC(false);
    }

    // has 8 characters
    if (passwordState.length >= 8) {
      setContains8C(true);
    } else {
      setContains8C(false);
    }

    // all validations passed
    if (containsUL && containsLL && containsN && containsSC && contains8C) {
      setAllValid(true);
    } else {
      setAllValid(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <h2 className="text-center mb-4">Reset Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
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
                  value={passwordStateConfirm}
                  onChange={(e) => setPasswordStateConfirm(e.target.value)}
                  onKeyUp={validatePassword}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Password Reset
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login</Link>
            </div>
            <h4>Must contain:</h4>
            <Container>
              {mustContainData.map((data) => (
                <MustContainItem data={data} />
              ))}
            </Container>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
