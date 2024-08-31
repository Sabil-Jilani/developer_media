import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Alert from './alert'
import { deleteAccount, get_user_profile } from '../action/profile'
import { connect } from 'react-redux'
import CreateProfiole from './froms/createProfile'
import Spinner from "./spinner"
import { Link } from 'react-router-dom'
import { deleteEducation } from '../action/addEdu'
import { deleteExperience } from '../action/addExperience'

 const Dashboard = ({username,profileReducer:{profile,isLoading},deleteAccount,deleteExperience,deleteEducation,get_user_profile})=> {
  useEffect(() => {
    console.log(username)
   get_user_profile(username)
    }
  , [])
 
  const DeleteAccount=(ev)=>{
deleteAccount(ev)
  };
  const DeleteExperience=(ev)=>{
deleteExperience(ev)
  };
  const DeleteEducation=(ev)=>{
 deleteEducation(ev)
  }

  return (isLoading ?<Spinner/>:
   !profile?<CreateProfiole/>:  <div className='container'>
    <Alert/>
    <section className="container">
      <h1 className="large text-primary">
        Dashboard
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome {profile.username && profile.username}</p>
      <div className="dash-buttons">
        <Link to="/updateProfile" className="btn btn-light"
          ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
        <Link to="/addExperience" className="btn btn-light"
          ><i className="fab fa-black-tie text-primary"></i> Add Experience</Link>
        <Link to="/addEducation" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
      </div>

      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
           <tbody>
       { profile.experience && profile.experience.map(data=>{

     return (
   
          <tr key={data._id}>
            <td>{data.company}</td>
            <td className="hide-sm">{data.title}</td>
            <td className="hide-sm">
              02-03-2009 - 01-02-2014
            </td>
            <td>
              <button className="btn btn-danger" onClick={()=>DeleteExperience(data._id)}>
                Delete
              </button>
            </td>
          </tr>
    
      )
       })}
       </tbody>
      </table>

      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Degree</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
          {profile.education && profile.education.map(data =>{
            return  <tr key={data._id}>
              <td>{data.institution}</td>
              <td className="hide-sm">{data.degree}</td>
              <td className="hide-sm">
                02-03-2007 - 01-02-2009
              </td>
              <td>
                <button className="btn btn-danger" onClick={()=>DeleteEducation(data._id)}>
                  Delete
                </button>
              </td>
            </tr>}
            )
          }
           
          </tbody>
        </table>

        <div className="my-2">
            <button className="btn btn-danger" onClick={()=>DeleteAccount(profile._id)}>
                <i className="fas fa-user-minus"></i>

                Delete My Account
            </button>
          </div>
    </section>
</div>
  )
}

Dashboard.propTypes = {
  get_user_profile:PropTypes.func.isRequired,
  deleteEducation:PropTypes.func.isRequired,
  deleteExperience:PropTypes.func.isRequired,
  deleteAccount:PropTypes.func.isRequired,
 
}
const mapStateToPropes=state=>({
  username:state.authReducer.profile.username,
 profileReducer:state.profileReducer,

})
export default connect(mapStateToPropes,{get_user_profile,deleteAccount,deleteExperience,deleteEducation})(Dashboard) 