import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import {useFirestore} from "../context/FirebaseContext"
import { Link, useHistory } from "react-router-dom"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
 
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const { signup } = useAuth()

  // const {useFirestore} = createUserData()

   async function handleSubmit(e) {
    e.preventDefault()
     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
       return setError("Passwords do not match")
     }


  //   try {
  //     setError("")
  //     setLoading(true)
  //     await signup(emailRef.current.value, passwordRef.current.value)
  //     // .then(cred=>{
  //     //   createUserData(cred.uid,{
  //     //     secQuestion1 : '',
  //     //     answer1: '',
  //     //     secQuestion2 : '',
  //     //     answer2: '',
  //     //   })
  //     // })
  history.push({
    pathname:'/security-questions',
    state : {email : emailRef.current.value,
            password:passwordRef.current.value}
  })
  //   } catch {
  //     setError("Failed to create an account")
  //   }

  //   setLoading(false)
  }

  const contStyle={
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    minHeight:"100vh"
  }

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
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Next
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
      </div>
    </div>
  )
}