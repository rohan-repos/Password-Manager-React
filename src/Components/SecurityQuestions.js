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

  // const SecQuestion2Ref = useRef()
  // const answer2Ref = useRef()

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

  // async function handleSubmit(e) {

  //   e.preventDefault()

  //     setError("")
  //     setLoading(true)

  //     // console.log(props.location.state.email)
  //     // console.log(props.location.state.password)
  //     signup(props.location.state.email, props.location.state.password)
  //     .then(cred=>{
  //       console.log("SecAnswer",secAnswer)
  //       handleGenSalt(secAnswer).then(()=>{
  //         console.log("salt"+salt);
  //         // console.log("hash"+hash)
  //         console.log(cred)
  //         createUserData(cred.user.uid,{
  //           secQuestion1 : secQuestion,
  //           answer1: salt,
  //       })

  //         // secQuestion2 : SecQuestion2Ref.current.value,
  //         // answer2: answer2Ref.current.value,
  //       })
  //     },err=>{
  //         setError(err)
  //     })
  //   //   history.push("/security-questions")

  //   setLoading(false)
  // }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    // console.log(props.location.state.email)
    // console.log(props.location.state.password)
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
            console.log(salts);
            userSaltData.saltObj = salts;
          }
          Bcrypt.hash(secAnswer, salts, function (err, hashs) {
            if (err) {
              console.log(err);
            }
            if (!err) {
              console.log(hashs);
              userSaltData.hashObj = hashs;
              createUserData(cred.user.uid, {
                secQuestion1: secQuestion,
                answer1: userSaltData.saltObj,
              });
            }
          });
        });
      },
      (err) => {
        setError(err);
      }
    );
    //   history.push("/security-questions")

    setLoading(false);
  }

  function handleGenSaltCall(key) {
    Bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        setError(err);
      } else {
        setSalt(salt);
      }
      Bcrypt.hash(key + "", salt, function (err, hash) {
        if (err) {
          setError(err);
        } else {
          setHash(hash);
        }
      });
    });
  }

  async function handleGenSalt(key) {
    await handleGenSaltCall(key);
  }

  function ViewSalt() {
    console.log(salt);
    console.log(hash);
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
              {/* <Form.Group id="password-confirm">
                <Form.Label>Security Question 2</Form.Label>
                <Form.Control type="text" ref={SecQuestion2Ref} required />
                </Form.Group>
                <Form.Group id="email">
                <Form.Label>Answer 2</Form.Label>
                <Form.Control type="password" ref={answer2Ref} required />
                </Form.Group> */}
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
              <Button onClick={() => handleGenSalt(secAnswer)}>Gen Salt</Button>
              <Button onClick={ViewSalt}>View Salt</Button>
              {/* {console.log(salt)} */}
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
