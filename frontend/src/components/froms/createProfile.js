import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { create_profile } from '../../action/profile'
import Alert from '../alert'


const CreateProfile = ({Profile,isLoading,create_profile}) => {
const navigate=useNavigate();
  const [profile,setProfile]=useState({
    status:"",
company:"",
website:"",
location:"",
skills:"",
githubusername:"",
bio:"",
facebook:"",
twitter:"",
youtube:"",
linkedIn:"",
instagram:""
  });


  const {status,company,website,location,skills,githubusername,bio,
    facebook,twitter,youtube,linkedIn,instagram}=profile;


  useEffect(() => {
  if(!isLoading && Profile){
  setProfile({status:!isLoading && Profile.status,
  company:!isLoading && Profile.company ? Profile.company : "",
  website:!isLoading && Profile.website ? Profile.website : "",
  location:!isLoading && Profile.location ? Profile.location : "",
  skills:!isLoading && Profile.skills ? Profile.skills.toString() : "",
  githubusername:!isLoading && Profile.githubusername ? Profile.githubusername : "",
  bio:!isLoading && Profile.bio ? Profile.bio : "",
  facebook :!isLoading && Profile.social ? Profile.social.facebook : "",
  twitter:!isLoading && Profile.social ? Profile.social.twitter : "",
  youtube:!isLoading && Profile.social ? Profile.social.youtube : "",
  linkedIn:!isLoading && Profile.social? Profile.social.linkedIn : "",
  instagram:!isLoading && Profile.social? Profile.social.instagram : ""
    })
  
}
  }, [isLoading])


  const onChangeHandler=(ev)=>{
   const {name,value}=ev.target;
   setProfile(pv=>{
    return{
      ...pv,
      [name]:value
    }
   })
  } 
  const onSubmit=(ev)=>{
    ev.preventDefault();
    if (Profile) {
      create_profile({
        profile:profile,term:"update",navigate:navigate});
    } else {
           create_profile({
    profile:profile,term:"create",navigate:navigate});
    }
  
setProfile(pv=>{
  return{status:"",
company:"",
website:"",
location:"",
skills:"",
githubusername:"",
bio:"",
facebook:"",
twitter:"",
youtube:"",
linkedIn:"",
instagram:""
  }}
)
  }
  return (
 
        <section className="container">
        <Alert/>
          <h1 className="large text-primary">
            Create Your Profile
          </h1>
          <p className="lead">
            <i className="fas fa-user"></i> Let's get some information to make your
            profile stand out
          </p>
          <small>* = required field</small>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <select name="status" value={status} onChange={onChangeHandler}>
                <option value="0">* Select Professional Status</option>
                <option value="Developer">Developer</option>
                <option value="Junior Developer">Junior Developer</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Manager">Manager</option>
                <option value="Student or Learning">Student or Learning</option>
                <option value="Instructor">Instructor or Teacher</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
              </select>
              <small className="form-text"
                >Give us an idea of where you are at in your career</small
              >
            </div>
            <div className="form-group">
              <input type="text" placeholder="Company" name="company" value={company}  onChange={onChangeHandler}/>
              <small className="form-text"
                >Could be your own company or one you work for</small
              >
            </div>
            <div className="form-group">
              <input type="text" placeholder="Website" name="website" value={website} onChange={onChangeHandler}/>
              <small className="form-text"
                >Could be your own or a company website</small
              >
            </div>
            <div className="form-group">
              <input type="text" placeholder="Location" name="location" value={location} onChange={onChangeHandler}/>
              <small className="form-text"
                >City & state suggested (eg. Boston, MA)</small
              >
            </div>
            <div className="form-group">
              <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={onChangeHandler}/>
              <small className="form-text"
                >Please use comma separated values (eg.
                HTML,CSS,JavaScript,PHP)</small
              >
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Github Username"
                name="githubusername"
                value={githubusername}
                onChange={onChangeHandler}
              />
              <small className="form-text"
                >If you want your latest repos and a Github link, include your
                username</small
              >
            </div>
            <div className="form-group">
              <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChangeHandler}></textarea>
              <small className="form-text">Tell us a little about yourself</small>
            </div>
    
            <div className="my-2">
              <button type="button" className="btn btn-light">
                Add Social Network Links
              </button>
              <span>Optional</span>
            </div>
    
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input type="text" placeholder="Twitter URL" name="twitter" value={twitter}  onChange={onChangeHandler}/>
            </div>
    
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input type="text" placeholder="Facebook URL" name="facebook" value={facebook}  onChange={onChangeHandler}/>
            </div>
    
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChangeHandler} />
            </div>
    
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input type="text" placeholder="Linkedin URL" name="linkedIn" value={linkedIn} onChange={onChangeHandler} />
            </div>
    
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChangeHandler} />
            </div>
            <input type="submit" onSubmit={onSubmit} className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
          </form>
        </section>
    
  )
}

CreateProfile.propTypes = {
  Profile:PropTypes.object.isRequired,
  create_profile:PropTypes.func.isRequired
}
const mapStateToPropes=state=>({
  Profile:state.profileReducer.profile,
  isloading:state.profileReducer.isLoading
})
export default connect(mapStateToPropes,{create_profile})( CreateProfile)