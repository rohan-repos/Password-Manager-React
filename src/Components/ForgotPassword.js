import React, {useRef,useState} from 'react'
import {Card , Form, Button, Alert} from 'react-bootstrap'
import {useAuth} from "../context/AuthContext"
import { Link } from "react-router-dom"

export default function FotgotPassword() {
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error,setError]=useState("")
    const [loading,setLoading]=useState(false)
    const [message,setMessage]=useState('')

    async function handleSubmit(e) {
      e.preventDefault()

  
      try {
        setError("")
        setLoading(true)
         await resetPassword(emailRef.current.value)
         setMessage("Check your inbox for further instructions")
    } catch {
        setError("Failed to reset password")
      }
  
      setLoading(false)
    }

    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Forgot Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{setMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Password Reset
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
                <Link to="/login">Login</Link>
                </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Do not have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </>
    )
  }