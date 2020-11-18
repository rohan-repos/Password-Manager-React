import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const { currentUser, logout , verifyEmail } = useAuth()
  const history = useHistory()
  console.log(currentUser.emailVerified)
  function handleClick(){
    setError("")
      verifyEmail().then(()=>{setMessage("sent email successfully")})
    .catch(()=>{setError("Could not send email")})
    }

  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  const contStyle={
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    minHeight:"100vh"
  }
  if(!currentUser.emailVerified)
  {
  return (
    <div style={contStyle}>
    <div>
      <Card>
        <Card.Body>
        <p>Befire verifivation</p>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Button onClick={handleClick}>Verify Email</Button>
          <h2 className="text-center mb-4">Profile</h2>
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      </div>
    </div>
  )
  }
  else{
    return(
      <div style={contStyle}>
      <div>
      <Card>
        <Card.Body>
        <p>after verifivation</p>

          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      </div>
    </div>
    )
  }
}
