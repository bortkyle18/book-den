import { useState } from "react"
import Cookie from "js-cookie"
import { Alert, Button, Container, Form } from 'react-bootstrap'
import Auth from "../utils/auth"


const LoginPage = (props) => {
  const [ loginCreds, setLoginCreds ] = useState({ email: "", password: "" })
  const [ formMessage, setFormMessage ] = useState({ type: "", msg: "" })

  const handleLogin = async (e) => {
    e.preventDefault()
    setFormMessage({ type: "", msg: "" })
    const authCheck = await fetch("/api/user/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginCreds)
    })
    const authResult = await authCheck.json()
    
    // If the login was good, save the returned token as a cookie
    if( authResult.result === "success" ){
      Auth.login(authResult.token);
      Cookie.set("auth-token", authResult.token);
      setFormMessage({ type: "success", msg: "Your login was successful. Proceed!" })
    } else {
      setFormMessage({ type: "danger", msg: "We could not log you in with the credentials provided." })
    }
    setLoginCreds({ email: "", password: "" })
  }

  return (
    <Container style={{ padding: "50px 200px"}}>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            name="email"
            placeholder="Enter email" 
            value={ loginCreds.email }
            onChange={ (e) => setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password"
            placeholder="Password" 
            value={ loginCreds.password }
            onChange={ (e) => setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
      
      { formMessage.msg.length > 0 && (
        <Alert variant={formMessage.type} style={{ marginTop: "2em" }}>
          { formMessage.msg }
        </Alert>
      )}
    </Container>
  )
}

export default LoginPage