import React, { useState, useEffect, useRef, createRef } from "react";
import Bcrypt from "bcryptjs";
import {
  Card,
  Button,
  Alert,
  Modal,
  Container,
  Row,
  Col,
  Form,
  Accordion,
} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useFirestore } from "../../context/FirebaseContext";
import { Link, useHistory } from "react-router-dom";
import { FaToggleOff, FaToggleOn, FaLock } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import CryptoJS from "crypto-js";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [coData, setCoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passwordVal, setPasswordval] = useState([]);
  const [showPass, setShowPass] = useState([]);
  const [arrLength, setArrLength] = useState(0);
  const [delConfirmShow, setDelConfirmShow] = useState(false);
  const [profilePassRef, setProfilePassRef] = useState("");
  const [showUserDetail, setShowUserDetail] = useState(false);

  const { currentUser, logout, verifyEmail } = useAuth();
  const {
    getCollectionData,
    addCollectionData,
    deleteCollectionData,
    getUserKey,
  } = useFirestore();
  const history = useHistory();

  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const valFormRef = useRef();
  const tablePassRef = useRef([]);
  const [salt, setSalt] = useState("");
  const [hash, setHash] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelShow = () => setDelConfirmShow(true);
  const handleDelClose = () => setDelConfirmShow(false);
  const handleUserDetailShow = () => setShowUserDetail(true);
  const handleUserDetailClose = () => setShowUserDetail(false);

  function handleUserData(e) {
    e.preventDefault();
    if (currentUser) {
      getUserKey(currentUser.uid)
        .get()
        .then((snapshot) => {
          const snapdocs = snapshot.docs[0];
          const ciphertext = CryptoJS.AES.encrypt(
            passwordRef.current.value,
            snapdocs.data()["key1"]
          ).toString();
          addCollectionData(
            {
              username: userNameRef.current.value,
              email: emailRef.current.value,
              password: ciphertext,
            },
            currentUser.uid
          ).then(() => {
            valFormRef.current.reset();
            console.log("complete");
          });
        });
    }
    handleUserDetailClose();
  }

  function handleToggle(index) {
    if (showPass[index]) {
      setShowPass({ [index]: false });
    } else {
      setShowPass({ [index]: true });
    }
  }

  function decryptPass(index) {
    if (currentUser) {
      setShowPass({ [index]: true });
      getUserKey(currentUser.uid)
        .get()
        .then((snapshot) => {
          const snapdocs = snapshot.docs[0];
          const userSaltData = {
            hashObj: "",
          };
          const profilepassPrompt = prompt("enter profile password");
          Bcrypt.hash(
            profilepassPrompt,
            snapdocs.data()["answer1"],
            function (err, hashs) {
              if (err) {
                console.log(err);
              }
              if (!err) {
                if (hashs === snapdocs.data()["key1"]) {
                  const plainPass = CryptoJS.AES.decrypt(
                    tablePassRef.current[index].current.value,
                    snapdocs.data()["key1"]
                  ).toString(CryptoJS.enc.Utf8);
                  tablePassRef.current[index].current.value = plainPass;
                } else {
                  alert(
                    "incorrect profile password please try again with correct password"
                  );
                }
              }
            }
          );
        });
    }
  }

  function handleDelete(docId, userEmail) {
    if (currentUser) {
      const deleteAccept = window.confirm(
        `are you sure you want to delete the user with the email ${userEmail}`
      );
      if (deleteAccept) {
        deleteCollectionData(currentUser.uid, docId).then(() =>
          console.log("delete complete")
        );
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentUser) {
      const dbRef = getCollectionData(currentUser.uid);
      dbRef.onSnapshot((snapshot) => {
        setCoData(snapshot.docs);
        setArrLength(+snapshot.docs.length);

        if (tablePassRef.current.length !== arrLength) {
          tablePassRef.current = Array(arrLength)
            .fill()
            .map((_, i) => tablePassRef.current[i] || createRef());
        }

        if (showPass.length !== arrLength) {
          setShowPass(Array(arrLength).fill(false));
        }
      });
    }
  }, [arrLength, getCollectionData]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ float: "right", margin: "10px 10px 0px 0px" }}>
        <Button variant="primary" onClick={handleShow}>
          Profile
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {currentUser.email}
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                Update Profile
              </Link>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Container fluid style={{ paddingTop: "80px", maxWidth: "1200px" }}>
        <Form onSubmit={handleUserData} ref={valFormRef}>
          <Row>
            <Col sm={4} xs="12">
              <Form.Group id="user-name">
                <Form.Control
                  placeholder="Username"
                  type="text"
                  ref={userNameRef}
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={4} xs="12">
              <Form.Group id="email">
                <Form.Control
                  placeholder="Email address"
                  type="email"
                  ref={emailRef}
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={4} xs="12">
              <Form.Group id="password">
                <Form.Control
                  placeholder="password"
                  type="password"
                  className="thisone"
                  ref={passwordRef}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <div className=" d-flex justify-content-center pt-3 pb-5">
            <Button type="submit">Add user details</Button>
          </div>
        </Form>
        <p className="pl-3">
          User Details (click on the user accounts below to view data)
        </p>
        <Accordion>
          {coData &&
            coData.map((item, index) => {
              const dataItem = item.data();
              return (
                <Form key={index}>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Card.Header}
                        variant="text"
                        eventKey={index + 1}
                      >
                        {index + 1}. {dataItem.username}
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={index + 1}>
                      <Container>
                        <Card.Body>
                          <Row>
                            <Col
                              lg={2}
                              md={3}
                              sm={3}
                              xs={4}
                              style={{ padding: "0" }}
                            >
                              <i> UserName:</i>
                            </Col>
                            <Col>{dataItem.username}</Col>
                          </Row>
                          <Row>
                            <Col
                              lg={2}
                              md={3}
                              sm={3}
                              xs={4}
                              style={{ padding: "0" }}
                            >
                              <div>
                                <i>Email:</i>
                              </div>
                            </Col>
                            <Col>
                              <div>{dataItem.email}</div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={2} sm="3" style={{ padding: "0" }}>
                              <Form.Label>
                                <i>Password</i>
                              </Form.Label>
                            </Col>
                            <Col sm="6">
                              <Form.Control
                                placeholder="password"
                                type={showPass[index] ? "text" : "password"}
                                // name={`form${index+1}`.toString()}
                                value={dataItem.password}
                                readOnly
                                ref={tablePassRef.current[index]}
                              />
                            </Col>
                            <Col xs="0" className="m-0 pt-1 pl-3">
                              <div onClick={() => handleToggle(index)}>
                                {showPass[index] ? (
                                  <FaToggleOn />
                                ) : (
                                  <FaToggleOff />
                                )}
                              </div>
                            </Col>
                            <Col xs="0" className="m-0 pt-1">
                              <div
                                onClick={() =>
                                  handleDelete(item.id, dataItem.email)
                                }
                                className="pl-2"
                              >
                                <AiTwotoneDelete />
                              </div>
                            </Col>
                            <Col xs="0" className="m-0 pt-1">
                              <div
                                onClick={() => decryptPass(index)}
                                className="pl-2"
                              >
                                <FaLock />
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Container>
                    </Accordion.Collapse>
                  </Card>
                </Form>
              );
            })}
        </Accordion>
      </Container>
    </div>
  );
}
