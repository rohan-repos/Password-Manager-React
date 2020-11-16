import React, {useRef,useState} from 'react'
import {Card , Form, Button, Alert} from 'react-bootstrap'
import {useAuth} from "../context/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function ResetPassword(props) {
    const passwordRef = useRef()
    const history= useHistory()
    const passwordConfirmRef = useRef()
    const {confirmPassword} = useAuth()
    const [error,setError]=useState("")
    const [loading,setLoading]=useState(false)
    const [message,setMessage]=useState('')
    // console.log(props.location.state.emailData)
    async function handleSubmit(e) {
      e.preventDefault()
  
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
      }
      try {
        setError("")
        setLoading(true)
          await confirmPassword(props.location.state.code,passwordRef.current.value)
         setMessage("New Password Set")
         history.push('/login')
    } catch {
        setError("Failed to set new password")
      }
  
      setLoading(false)
    }

    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Reset Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required />
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
       
      </>
    )
  }