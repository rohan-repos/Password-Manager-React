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
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { get } from "jquery";

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

  const { currentUser, logout, verifyEmail } = useAuth();
  const {
    getCollectionData,
    addCollectionData,
    deleteCollectionData,
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

  function handleUserData(e) {
    e.preventDefault();
    if (currentUser) {
      addCollectionData(
        {
          username: userNameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        currentUser.uid
      ).then(() => {
        valFormRef.current.reset();
        // resetformdata()
        console.log("complete");
      });
    }
    console.log(currentUser);
  }

  function handleToggle(index) {
    if (showPass[index]) {
      setShowPass({ [index]: false });
    } else {
      console.log(tablePassRef.current[index]);
      setShowPass({ [index]: true });
    }
  }

  function handleGenSalt() {
    Bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        setError(err);
      } else {
        setSalt(salt);
      }
      Bcrypt.hash("B4c0//", salt, function (err, hash) {
        if (err) {
          setError(err);
        } else {
          setHash(hash);
        }
      });
    });
  }

  function handleDelete(docId) {
    if (currentUser) {
      deleteCollectionData(currentUser.uid, docId).then(() =>
        console.log("delete complete")
      );
      handleDelClose();
    }
  }

  useEffect(() => {
    window.scrollTo(0,0)
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
              {/* <h2 className="text-center mb-4">Profile</h2> */}
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
          {/* <Button variant="primary" >Understood</Button> */}
        </Modal.Footer>
      </Modal>

      {/* <div className="w-100 text-center mt-2">
      <Button variant="link" onClick={handleLogout}>
        Log Out
      </Button>
    </div> */}
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
                {/* <Form.Label>Email</Form.Label> */}
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
                {/* <Form.Label>Password</Form.Label> */}
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
            {/* <Button variant="primary" onClick={handleGenSalt}>
          click
        </Button> */}
          </div>
        </Form>
        {/* <Button onClick={handleGetData}>Get Data</Button> */}
         <p className="pl-3">User Details (click on the user accounts below to view data)</p>
        {/* <Form>
          {coData &&
            coData.map((item, index) => {
              const dataItem = item.data();
              return (
                <Row className="py-3" key={item.id} id={item.id}>

                  <Col xs="1">{index + 1}</Col>
                  <Col sm="3"> {dataItem.username}</Col>
                  <Col sm="3"> {dataItem.email}</Col>
                  <Col sm="3">
                    <Form.Control
                      placeholder="password"
                      type={showPass[index] ? "text" : "password"}
                      value={dataItem.password}
                      readOnly
                      ref={tablePassRef.current[index]}
                    />
                  </Col>
                  <Col xs="0" className="m-0 pt-1">
                    <div onClick={() => handleToggle(index)}>
                      {showPass[index] ? <FaToggleOn /> : <FaToggleOff />}
                    </div>
                  </Col>
                  <Col xs="0" className="m-0 pt-1">
                    <div onClick={handleDelShow} className="pl-2">
                      <AiTwotoneDelete />
                    </div>
                    <Modal
                      show={delConfirmShow}
                      onHide={handleDelClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Username/Password</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Card>
                          <Card.Body>
                           <Alert variant="danger">Please note that this is permanent!</Alert>
                            <p><strong>Username:</strong> {dataItem.username}</p>
                            <p><strong>email:</strong> {dataItem.email}</p>
                          </Card.Body>
                        </Card>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={()=>handleDelete(item.id)}>
                          Confirm Delete
                        </Button>
                        <Button variant="secondary" onClick={handleDelClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                </Row>
              );
            })}
        </Form> */}
        <Accordion>
          {/* <Row> */}
          {coData &&
            coData.map((item, index) => {
              const dataItem = item.data();
              return (
                
                <Form>
                <Card>
                  {/* <Row className="py-3" key={item.id} id={item.id}> */}
                  <Card.Header>
                    <Accordion.Toggle as={Card.Header} variant="text" eventKey={index+1}>
                    {/* <Col sm="3">  */}
                   {index+1}. {dataItem.username}
                    {/* </Col> */}
                    </Accordion.Toggle>
                  </Card.Header>
                  
                    {/* // <div key={item.id} id={item.id}> */}

                    <Accordion.Collapse eventKey={index+1}>
                      <Container>
                  <Card.Body >
                    
                    <Row>
                      <Col lg={2} md={3} sm={3} xs={4} style={{padding:"0"}}><i> UserName:</i></Col>
                      <Col> 
                    {dataItem.username}
                      </Col>
                    {/* <Col sm="3">  */}
                    </Row>
                    <Row>
                  <Col lg={2} md={3} sm={3} xs={4} style={{padding:"0"}}> 
                    <div><i>Email:</i></div>
                    </Col>
                    <Col> 
                    <div>{dataItem.email}</div>
                    </Col>

                    </Row>
                        <Row>
                        <Col lg={2} sm="3" style={{padding:"0"}}>
                        <Form.Label><i>Password</i></Form.Label></Col>
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
                        
                      
                    {/* </Col> */}
                    <Col xs="0" className="m-0 pt-1 pl-3">
                      <div onClick={() => handleToggle(index)}>
                        {showPass[index] ? <FaToggleOn /> : <FaToggleOff />}
                      </div>
                    </Col>
                    <Col xs="0" className="m-0 pt-1">
                      <div onClick={handleDelShow} className="pl-2">
                        <AiTwotoneDelete />
                      </div>
                      <Modal
                        show={delConfirmShow}
                        onHide={handleDelClose}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Delete Username/Password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Card>
                            <Card.Body>
                              {/* <h2 className="text-center mb-4">Profile</h2> */}
                              <Alert variant="danger">
                                Please note that this is permanent!
                              </Alert>
                              <p>
                                <strong>Username:</strong> {dataItem.username}
                              </p>
                              <p>
                                <strong>email:</strong> {dataItem.email}
                              </p>
                            </Card.Body>
                          </Card>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="primary"
                            onClick={() => handleDelete(item.id)}
                          >
                            Confirm Delete
                          </Button>
                          <Button variant="secondary" onClick={handleDelClose}>
                            Close
                          </Button>

                          {/* <Button variant="primary" >Understood</Button> */}
                        </Modal.Footer>
                      </Modal>
                      </Col>
                      </Row>
                    
                    </Card.Body>
                    </Container>
                    </Accordion.Collapse>
                  {/* </Row> */}
                </Card>
                </Form>
                
              );
            })}
        </Accordion>
      </Container>
    </div>
  );
}
