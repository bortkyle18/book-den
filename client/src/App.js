import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Navigation from "./components/Navigation"

import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [ authUser, setAuthUser ] = useState(null)

  const checkForValidUser = async() => {
    const authCheck = await fetch("/api/user/lookup")
    const checkResult = await authCheck.json()
    if( checkResult && checkResult.result === "success" ){
      setAuthUser(checkResult.payload)
    }
  }
  
  useEffect(() => {
    checkForValidUser()
  }, [])

  return (
    <div>
      <Navigation />
      <Container>
        <Router>
          <Routes>
            {/* To Do */}
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
