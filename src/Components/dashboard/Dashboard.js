import React, { useState, useEffect, useRef, createRef } from "react";
import Bcrypt from "bcryptjs"
import {
  Card,
  Button,
  Alert,
  Modal,
  Container,
  Row,
  Col,
  Form,
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
  const [salt,setSalt] =useState('')
  const [hash,setHash] = useState('')

  // console.log(currentUser.emailVerified)
  // function handleClick(){
  //   setError("")
  //     verifyEmail().then(()=>{setMessage("sent email successfully")})
  //   .catch(()=>{setError("Could not send email")})
  //   }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelShow = () => setDelConfirmShow(true);
  const handleDelClose = () => setDelConfirmShow(false);
  

  function handleUserData(e) {
    e.preventDefault();
    if(currentUser)
    {
    addCollectionData({
      username: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    },currentUser.uid).then(() => {
      valFormRef.current.reset();
      // resetformdata()
      console.log("complete");
    });
  }
  console.log(currentUser)
  }

  function handleToggle(index) {
    if (showPass[index]) {
      setShowPass({ [index]: false });
    } else {
      console.log(tablePassRef.current[index])
      setShowPass({ [index]: true });
    }
  }

  function handleGenSalt(){
    Bcrypt.genSalt(10, function(err, salt) {
      if(err){
        setError(err)
      }
      else{
      setSalt(salt)}
      Bcrypt.hash("B4c0/\/", salt, function(err, hash) {
        if(err){
          setError(err)
        }
        else{
          setHash(hash)}
          
      });
  });
  }

  function handleDelete(docId) {
    if(currentUser){
    deleteCollectionData(currentUser.uid,docId).then(() => console.log("delete complete"));
    handleDelClose()
    }
  }

  // const handleGetData = (() => {
  //   getCollectionData().then((snapshot) => {
  //     setCoData(snapshot.docs);
  //     setArrLength(+snapshot.docs.length)
  //     console.log(arrLength)
  //     if (tablePassRef.current.length !== arrLength) {
  //       // add or remove refs
  //       tablePassRef.current = Array(arrLength)
  //         .fill()
  //         .map((_, i) => tablePassRef.current[i] || createRef());
  //     }

  //     if (showPass.length !== arrLength) {
  //       // add or remove refs
  //       setShowPass(
  //         Array(arrLength)
  //           .fill(false)
  //       );
  //     }
  //     console.log(showPass)
  //   });
  // });

  useEffect(() => {
    
    if(currentUser){
    const dbRef= getCollectionData(currentUser.uid)
    dbRef.onSnapshot((snapshot) => {
      setCoData(snapshot.docs);
      // console.log("gere")
      // console.log(snapshot.docs)
      setArrLength(+snapshot.docs.length);
      
      if (tablePassRef.current.length !== arrLength) {
        // add or remove refs
        tablePassRef.current = Array(arrLength)
          .fill()
          .map((_, i) => tablePassRef.current[i] || createRef());
      }

      if (showPass.length !== arrLength) {
        // add or remove refs
        setShowPass(Array(arrLength).fill(false));
      }
      // console.log(showPass);
    });
  }
  }, [arrLength, getCollectionData]);
  

  // console.log(coData)
  // return(
  //   <div style={contStyle}>
  //   <div>
  //   <Card>
  //     <Card.Body>

  //       <h2 className="text-center mb-4">Profile</h2>
  //       {error && <Alert variant="danger">{error}</Alert>}
  //       <strong>Email:</strong> {currentUser.email}
  //       <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
  //         Update Profile
  //       </Link>
  //     </Card.Body>
  //   </Card>
  //   <div className="w-100 text-center mt-2">
  //     <Button variant="link" onClick={handleLogout}>
  //       Log Out
  //     </Button>
  //   </div>
  //   <div>
  //     {coData && coData.map(item=>{
  //       const dataItem = item.data()
  //     return(  <>
  //       <p>{dataItem.name}</p>
  //       <p>{dataItem.city}</p>
  //       </>)
  //     })}
  //   </div>
  //   </div>
  // </div>
  // )

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
            <Col xs="4">
              <Form.Group id="user-name">
                <Form.Control
                  placeholder="Username"
                  type="text"
                  ref={userNameRef}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs="4">
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
            <Col xs="4">
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
        <Row>
          <Col xs="1"></Col>
          <Col>Username</Col>
          <Col>Email</Col>
          <Col>Password</Col>
        </Row>
        <Form>
          {/* <Row> */}
          {coData &&
            coData.map((item, index) => {
              const dataItem = item.data();
              return (
                <Row className="py-3" key={item.id} id={item.id}>
                  {/* // <div key={item.id} id={item.id}> */}

                  <Col xs="1">{index + 1}</Col>
                  <Col sm="3"> {dataItem.username}</Col>
                  <Col sm="3"> {dataItem.email}</Col>
                  <Col sm="3">
                    <Form.Control
                      placeholder="password"
                      type={showPass[index] ? "text" : "password"}
                      // name={`form${index+1}`.toString()}
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
                            {/* <h2 className="text-center mb-4">Profile</h2> */}
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

                        {/* <Button variant="primary" >Understood</Button> */}
                      </Modal.Footer>
                    </Modal>
                  </Col>
                </Row>
              );
            })}
        </Form>
      </Container>
    </div>
  );
}
