import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useFirestore } from "../context/FirebaseContext";
import { Link, useHistory } from "react-router-dom";
import Bcrypt from "bcryptjs";

function SecurityQuestions(props) {
  const secQuestion1Ref = useRef();
  const answer1Ref = useRef();
  const [salt, setSalt] = useState("");
  const [hash, setHash] = useState("");
  const [secQuestion, setSecQuestion] = useState("");
  const [secAnswer, setSecAnswer] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { signup } = useAuth();

  const { createUserData } = useFirestore();

  const contStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    signup(props.location.state.email, props.location.state.password).then(
      (cred) => {
        console.log("SecAnswer", secAnswer);
        const userSaltData = {
          saltObj: "",
          hashObj: "",
        };
        Bcrypt.genSalt(10, function (err, salts) {
          if (err) {
            console.log(err);
          }
          if (!err) {
            userSaltData.saltObj = salts;
          }
          Bcrypt.hash(secAnswer, salts, function (err, hashs) {
            if (err) {
              console.log(err);
            }
            if (!err) {
              userSaltData.hashObj = hashs;
              createUserData(cred.user.uid, {
                secQuestion1: secQuestion,
                answer1: userSaltData.saltObj,
                key1: userSaltData.hashObj,
              });
            }
          });
        });
      },
      (err) => {
        setError(err);
      }
    );

    setLoading(false);
  }

  return (
    <div style={contStyle}>
      <div>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            Please keep this question noted as you will need it later to
            retrieve your password
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Security Question 1</Form.Label>
                <Form.Control
                  type="text"
                  value={secQuestion}
                  onChange={(e) => setSecQuestion(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={secAnswer}
                  onChange={(e) => setSecAnswer(e.target.value)}
                  required
                />
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
              <Link
                to="/signup"
                style={{ minWidth: "100%", textAlign: "center" }}
              >
                Back
              </Link>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default SecurityQuestions;
