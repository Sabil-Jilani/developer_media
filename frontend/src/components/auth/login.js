import React,{useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { GetUser } from '../../action/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Alert from '../alert';


const Login = ({GetUser,isAuthenticated}) => {
const navigate=useNavigate();
  const [detail,setData]=useState({
username:"",
    password:""
  });

const changeHandler=data=>{
  const {name,value} = data.target;
setData(pv=>{
  return{
    ...pv,
    [name]:value
  }
}
)
}

    const submit=ev => { 
      ev.preventDefault();
 
GetUser(detail,navigate)
    setData({
      username:"",
      password:""
           }); 
    }

if (isAuthenticated) {
  return <Navigate to="/dashboard"/>
}

  return (
        <section className="container">
    <Alert/>
          <h1 className="large text-primary">Sign In</h1>
          <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
          <form className="form" onSubmit={submit} >
            <div className="form-group">
              <input
                onChange={changeHandler}
                type="email"
                placeholder="Email Address"
                name="username"
        value={detail.username}
                required
              />
            </div>
            <div className="form-group">
              <input
              onChange={changeHandler}
                type="password"
                placeholder="Password"
                name="password"
                value={detail.password}
              />
            </div>
            <input onSubmit={submit} type="submit" className="btn btn-primary" value="Login" />
          </form>
          <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </section>
      
  )
}

Login.propTypes = {
  GetUser:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool.isRequired
  }
  const mapStateToPropes=state=>({
    isAuthenticated:state.authReducer.isAuthenticated
  })
export default connect(mapStateToPropes,{GetUser}) (Login)
