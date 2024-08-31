import React from 'react'
import { connect } from 'react-redux'
import { Link,  Navigate } from 'react-router-dom'
import Alert from './alert'

function Home({isAuthenticated}) {  
console.log(isAuthenticated)
if (isAuthenticated) {
  return <Navigate to="/dashboard"/>
}
  
 
  return (
    <div>
        <section className="landing">
       
          <div className="dark-overlay">
            <div className="landing-inner"> <Alert/>
              <h1 className="x-large">Developer Connector</h1>
              <p className="lead">
                Create a developer profile/portfolio, share posts and get help from
                other developers
              </p>
              <div className="buttons">
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
                <Link to="/login" className="btn btn-light">Login</Link>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
const mapStateTOPrope=state=>({
  isAuthenticated:state.authReducer.isAuthenticated
})
export default connect(mapStateTOPrope)(Home) 