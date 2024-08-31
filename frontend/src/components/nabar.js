import  PropTypes  from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


function nabar({isAuthenticated}) {
  return (
    <nav className="navbar bg-dark">
    <h1>
      <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
    </h1>
 {isAuthenticated ? <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link  to="/dashboard">dashboard</Link></li>
      <li><Link  to="/posts">posts</Link></li>  
       <li><Link  to="/logout">Logout</Link></li>
    </ul>    :
    <ul>
    <li><Link  to="/posts">posts</Link></li>  
       <li><Link to="/profiles">Developers</Link></li>
      <li><Link  to="/register">Register</Link></li>
      <li><Link  to="/login">Login</Link></li>
   
    </ul>  }
   
  </nav>
  )
}
nabar.propTypes={
isAuthenticated:PropTypes.bool.isRequired
}
const mapStateToPropes=(state)=>({
  isAuthenticated:state.authReducer.isAuthenticated
})
export default connect(mapStateToPropes)(nabar) 