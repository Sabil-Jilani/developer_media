import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from './spinner'
import { get_profiles } from '../action/profile'
import { Link } from 'react-router-dom'

const Profiles = ({profileReducer:{profiles,isLoading},get_profiles }) => {

    useEffect(() => {
       get_profiles();
    }, [])
    
   
   
  return (<Fragment>{
   ! isLoading ? profiles.length >0 ? 
     <section className="container">
    <h1 className="large text-primary">Developers</h1>
    <p className="lead">
      <i className="fab fa-connectdevelop"></i> Browse and connect with developers
    </p>
    <div className="profiles">
    {profiles.map((profile,index)=>{
      const {username,
        company,
        website,
        location,
        status,
        skills,
        bio,
       githubusername,
       experince,
       social,
        date}=profile
 return<div className="profile bg-light" key={index}>
        <img
          className="round-img"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
          alt=""
        />
        <div>
          <h2>{username}</h2>
          <p>{status} at {company}</p>
          <p>{location}</p>
          <Link to={`/profile/${username}`} className="btn btn-primary">View Profile</Link>
        </div>

        <ul>
        {skills.map((skill,index)=>{
          return <li key={index} className="text-primary">
            <i className="fas fa-check"></i>{ skill}
          </li>
        })}
   
        </ul>
      </div>
    })}

    </div>
  </section>:<h2>no profiles found</h2>
  : <Spinner/>

  }</Fragment>)
}

 Profiles.propTypes = {
    profileReducer:PropTypes.object.isRequired,
   get_profiles:PropTypes.func.isRequired
 }

 const mapStateToPrope=(state)=>({
profileReducer:state.profileReducer,

 })
export default connect(mapStateToPrope,{ get_profiles})(Profiles)


    