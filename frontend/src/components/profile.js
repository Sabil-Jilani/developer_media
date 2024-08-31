import moment from "moment";
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { get_A_profile } from '../action/profile';
import Spinner from "./spinner";
const Profile =({profile:{isloading,profile},get_A_profile}) => {
    const {userName}=useParams();
    useEffect(() => {
        get_A_profile(userName)
    }, [])
    
  return (
   <div>{! isloading ? profile ?   <section class="container">
      <Link to="/profiles" class="btn btn-light">Back To Profiles</Link>
      <div class="profile-grid my-1">
    
        <div class="profile-top bg-primary p-2">
          <img
            class="round-img my-1"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <h1 class="large">{profile.username && profile.username}</h1>
          <p class="lead">{profile.status} at {profile.company && profile.company}</p>
          <p>{profile.location && profile.location}</p>
          <div class="icons my-1">
          { profile.website && <a href={`${profile.website}`} target="_blank" rel="noopener noreferrer">
              <i class="fas fa-globe fa-2x"></i>
            </a>}
            {profile.social && profile.social.twitter &&<a href={`https://${profile.social.twitter}`} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-twitter fa-2x"></i>
            </a>}
            {profile.social && profile.social.facebook &&<a href={`https://${profile.social.facebook}`} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-facebook fa-2x"></i>
            </a>}
           {profile.social && profile.social.linkedIn &&<a href={`https://${profile.social.linkedIn}`} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-linkedin fa-2x"></i>
            </a>}
            {profile.social && profile.social.youtube &&<a href={`https://${profile.social.youtube}`} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-youtube fa-2x"></i>
            </a>}
            {profile.social && profile.social.instagram &&<a href={`https://${profile.social.instagram}`} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-instagram fa-2x"></i>
            </a>}
          </div>
        </div>

        {/* <!-- About --> */}
        <div class="profile-about bg-light p-2">
          <h2 class="text-primary">{profile.username && profile.username}'s Bio</h2>
          <p>
            {profile.bio && profile.bio}
          </p>
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
          {profile.skills && profile.skills.map((skill,index)=>{console.log(skill)
        return<div class="p-1" key={index}><i class="fa fa-check"></i>{skill}</div>
          })}
          </div>
        </div>

        {/* <!-- Experience --> */}
        <div class="profile-exp bg-white p-2">
          <h2 class="text-primary">Experience</h2>
          {profile.experience.map((object,index)=><div key={index}>
            <h3 class="text-dark">{object.company}</h3>
            <p>{object.from && moment(object.from).format("D MMMM YYYY")} ---
            {object.current ? "NOW" : object.to && moment(object.to).format("D MMMM YYYY")}</p>
            <p><strong>Position: </strong>{object.title}</p>
            <p>
              <strong>Description: </strong>{object.description}
            </p>
          </div>
            
            
          
          )}
          
          </div>

        {/* <!-- Education --> */}
        <div class="profile-edu bg-white p-2">
          <h2 class="text-primary">Education</h2>
          {profile.education.map((object,index)=><div key={object._id}>
            <h3>{object.institution}</h3>
            <p>{object.from && moment(object.from).format("D MMMM YYYY")} ---
            {object.current ? "NOW" : object.to && moment(object.to).format("D MMMM YYYY")}</p>
            <p><strong>Degree: </strong>{object.degree}</p>
            <p><strong>Field Of Study: </strong>{object.fieldOfStudy}</p>
            <p>
              <strong>Description: </strong>{object.description}
            </p>
          </div>)}
          
        </div>


      </div>
    </section> :<h2>Profile isn't available</h2>:<Spinner/>}</div>
 
   

  )
}

Profile.propTypes = {
    profile:PropTypes.object.isRequired,
    get_A_profile:PropTypes.func.isRequired
};
const mapStateToProps=state=>({
    profile:state.profileReducer
})

export default connect(mapStateToProps,{get_A_profile})(Profile) 