 
 import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addEdu } from "../../action/addEdu";
import Alert from "../alert";

const AddEducation = ({addEdu}) => {
  const navigate=useNavigate()
  const [data,setData]=useState({
    institution:"",
    degree:"",
    fieldOfStudy:"",
    from:"",
to:"",
current:false,
description:""  })
const {institution,degree,fieldOfStudy,from,to,current,description }=data;

const onChange=(ev)=>{
const {name,value}=ev.target;
setData((pv)=>({...pv,[name]:value}))
}
const onSubmit=(event)=>{
event.preventDefault();
addEdu(data,navigate)
setData({
  institution:"",
  degree:"",
  fieldOfStudy:"",
  from:"",
to:"",
current:false,
description:""  })
}
  return (<section className="container">
  <Alert/>
          <h1 className="large text-primary">
            Add Your Education
          </h1>
          <p className="lead">
            <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
            you have attended
          </p>
          <small>* = required field</small>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="* School or Bootcamp"
                name="institution"
                onChange={onChange}
                value={institution}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="* Degree or Certificate"
                name="degree"
                onChange={onChange}
                value={degree}
                required
              />
            </div>
            <div className="form-group">
              <input 
              type="text" 
              placeholder="Field Of Study" 
              name="fieldOfStudy" 
              onChange={onChange}
                value={fieldOfStudy}
              />
            </div>
            <div className="form-group">
              <h4>From Date</h4>
              <input 
              type="date" 
              name="from" 
              onChange={onChange}
                value={from}
              />
            </div>
            <div className="form-group">
              <p>
                <input 
                checked={current}
                type="checkbox" 
                name="current"       
                onChange={()=>{
                  setData((pv)=>({
                         ...pv,
                         current:!current
                  }))
                }}
                value={current} /> Current School or Bootcamp
              </p>
            </div>
            <div className="form-group">
              <h4>To Date</h4>
              <input 
              disabled={current}
              type="date" 
              name="to" 
              onChange={onChange}
                value={to}
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                onChange={onChange}
                value={description}
                cols="30"
                rows="5"
                placeholder="Program Description"
              ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" onSubmit={onSubmit}/>
            <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
          </form>
        </section>)
}

AddEducation.propTypes = {
  addEdu:PropTypes.func.isRequired
}

export default connect(null,{addEdu})(AddEducation)