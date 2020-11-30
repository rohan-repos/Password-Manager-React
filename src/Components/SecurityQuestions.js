import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import {useFirestore} from "../context/FirebaseContext"
import { Link, useHistory } from "react-router-dom"

function SecurityQuestions(props) {

    const secQuestion1Ref = useRef()
    const answer1Ref = useRef()
    const SecQuestion2Ref = useRef()
    const answer2Ref = useRef()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const { signup } = useAuth()

    const { createUserData} = useFirestore()

    const contStyle={
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        minHeight:"100vh"
      }

      function handleSubmit(e) {
        e.preventDefault()
        
          setError("")
          setLoading(true)
          console.log(props.location.state.email)
          console.log(props.location.state.password)
          signup(props.location.state.email, props.location.state.password)
          .then(cred=>{
            createUserData(cred.user.uid,{
              secQuestion1 : secQuestion1Ref.current.value,
              answer1: answer1Ref.current.value,
              secQuestion2 : SecQuestion2Ref.current.value,
              answer2: answer2Ref.current.value,
            })
          },err=>{
              setError(err)
          })
        //   history.push("/security-questions")

    
        setLoading(false)
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
                <Form.Label>security Question 1</Form.Label>
                <Form.Control type="text" ref={secQuestion1Ref} required />
                </Form.Group>
                <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={answer1Ref} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                <Form.Label>Security Question 2</Form.Label>
                <Form.Control type="text" ref={SecQuestion2Ref} required />
                </Form.Group>
                <Form.Group id="email">
                <Form.Label>Answer 2</Form.Label>
                <Form.Control type="password" ref={answer2Ref} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                Sign Up
                </Button>
                <Link to="/signup" style={{minWidth:"100%",textAlign:"center"}}>Back</Link>
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

export default SecurityQuestions
