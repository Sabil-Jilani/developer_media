import React,{useState} from 'react'
import { Link,  useNavigate,Navigate } from 'react-router-dom'
import { register } from '../../action/auth';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import {setAlert} from '../../action/alert';
import Alert from '../alert';

function Register({register,setAlert,isAuthenticated}) {

  const navigate=useNavigate();
  const [data,setData]=useState({
    name:"",
  username:"",
    password:"",
  confirm_password:""
  });

  const changeHandler=data=>{
const {name,value,}=data.target;
setData(pv=>{return{
  ...pv,
  [name]:value
}})
  }

  const submit=(ev)=>{
    ev.preventDefault();
  if(data.password===data.confirm_password){
    
    register(data,navigate)
  }else{
    setAlert(
    "password & confirm password doesn't match",
    "danger"
  )
navigate("/register")
  }


    setData({            
      name:"",
      username:"",
      password:"",
    confirm_password:""
    })
  }
  if (isAuthenticated) {
    return <Navigate to="/dashboard"/>
  }
  return (
    <div>
        <section className="container">
        <Alert/>
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
          <form className="form" onSubmit={submit}>
            <div className="form-group">
              <input type="text" value={data.name} placeholder="Name" name="name" onChange={changeHandler} required />
            </div>
            <div className="form-group">
              <input type="email" value={data.username} placeholder="Email Address" name="username" onChange={changeHandler}/>
              <small className="form-text"
                >This site uses Gravatar so if you want a profile image, use a
                Gravatar email</small
              >
          </div>
          <div className="form-group">
              <input
               value={data.password}
               onChange={changeHandler}
                type="password"
                placeholder="Password"
                name="password"
                minLength="5"
              />
            </div> <div className="form-group">
              <input
               value={data.confirm_password}
               onChange={changeHandler}
                type="password"
                placeholder="Confirm Password"
                name="confirm_password"
                minLength="5"
              />
            </div>
         
            <input onSubmit={submit} type="submit" className="btn btn-primary" value="Register" />
          </form>
          <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </section>
     </div>
  )
}
Register.propTypes={
  register:PropTypes.func.isRequired,
  setAlert:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool.isRequired
}
const mapStateToProps=state=>({
  isAuthenticated:state.authReducer.isAuthenticated
})

export default connect(mapStateToProps,{register,setAlert})(Register)