import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { addExperience } from '../../action/addExperience';
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import Alert from "../alert"
const AddExperience = ({addExperience}) => {
  const navigate=useNavigate();
   const [data,setData]=useState({title:"",
                                 company:"",
                                 location:"",
                                  from:"",
                                current:false,
                                to:"",
                                description:""});

 const {title,
 company,
 location,
 from,
 current,
 to,
 description}=data;

const onChange=(ev)=>{
const {name,value}=ev.target; 
setData((pv)=>{
   
return{
    ...pv,
    [name]:value
}
})
}
const onSubmit=((ev)=>{
ev.preventDefault();
    addExperience(data,navigate);
    setData({title:"",
    company:"",
    location:"",
     from:"",
   current:false,
   to:"",
   description:""})
})
  return (<section class="container">
  <Alert/>
          <h1 class="large text-primary">
           Add An Experience
          </h1>
          <p class="lead">
            <i class="fas fa-code-branch"></i> Add any developer/programming
            positions that you have had in the past
          </p>
          <small>* = required field</small>
          <form class="form" onSubmit={onSubmit}>
            <div class="form-group">
              <input type="text" placeholder="* Job Title" name="title" value={title} onChange={onChange} required />
            </div>
            <div class="form-group">
              <input type="text" placeholder="* Company" name="company" value={company}  onChange={onChange} required />
            </div>
            <div class="form-group">
              <input type="text" placeholder="Location" name="location" value={location}  onChange={onChange} />
            </div>
            <div class="form-group">
              <h4>From Date</h4>
              <input type="date" name="from"  value={from}  onChange={onChange} />
            </div>
             <div class="form-group">
              <p><input type="checkbox" name="current" value={current} checked={current} onChange={()=>{
                setData(pv=>({
                    ...pv,
                    current:!current
                }))
              }} /> Current Job</p>
            </div>
            <div class="form-group">
              <h4>To Date</h4>
              <input type="date" name="to" value={to} disabled={current} onChange={onChange} />
            </div>
            <div class="form-group">
              <textarea
               onChange={onChange}
               value={description} 
                name="description"
                cols="30"
                rows="5"
                placeholder="Job Description"
              ></textarea>
            </div>
            <input type="submit" onSubmit={onSubmit} class="btn btn-primary my-1" />
            <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
          </form>
        </section>)
}

AddExperience.propTypes = {
    addExperience:PropTypes.func.isRequired
}
// const mapStateToPrope=state=>({
//     AddExperience
// })
export default connect(null,{addExperience})(AddExperience)