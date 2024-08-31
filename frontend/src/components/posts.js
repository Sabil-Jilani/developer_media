import moment from 'moment/moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { deletePost, get_all_posts, post } from '../action/post';
import { SHOW_POST } from '../reducer/types';
import Alert from "./alert";
import Spinner from "./spinner";


const Posts =({post,get_all_posts,profile,deletePost,postReducer:{isLoading,posts}}) => {
const dispatch=useDispatch();
const navigate=useNavigate();
  useEffect(() => {
get_all_posts();

  }, [])


  const [text, setText] = useState({
    text:""
  });
  const onChangeHandler=(ev)=>{
    const {name,value}=ev.target;
    setText({[name]:value})
  }
  const onsubmit=(ev)=>{
    ev.preventDefault();
    post(text);
     setText({text:""})
  }


  return (
        <section className="container">
        <Alert/>
          <h1 className="large text-primary">
            Posts
          </h1>
          <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
    
          <div className="post-form">
            <div className="bg-primary p">
              <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={onsubmit}>
              <textarea
              onChange={onChangeHandler}
                name="text"
                cols="30"
                rows="5"
                value={text.text}
                placeholder="Create a post"
                required
              ></textarea>
              <input type="submit" className="btn btn-dark my-1" onSubmit={onsubmit} />
            </form>
          </div>
    
          <div className="posts">
           {isLoading ? <Spinner/> : posts.length>0 ? posts.map(post=><div 
           className="post bg-white p-1 my-1" 
         >
            
              <div>
                <a href="profile.html">
                  <img
                    className="round-img"
                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                    alt=""
                  />
                  <h4>{post.username}</h4>
                </a>
              </div>
              <div>
                <p className="my-1"   onClick={async ()=>{
            dispatch({type:SHOW_POST,payload:post})
            return navigate("/post")}}>
         {post.post}
                </p>
                 <p className="post-date">
                    Posted on {moment(post.date).format("D MMM YY")}
                </p>
                <button type="button" className="btn btn-light">
                  <i className="fas fa-thumbs-up"></i>
                  <span>4</span>
                </button>
                <button type="button" className="btn btn-light">
                  <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={"/post"} className="btn btn-primary">
                  Discussion <span className='comment-count'>2</span>
                </Link>
              { profile  && (profile._id === post.profileId) ? <button   
                type="button"
                className="btn btn-danger"
                onClick={()=>deletePost(post._id)}
              >
                <i className="fas fa-times"></i>
              </button> : ""}
              </div>
            </div>) :<h1>NO POSTS AVAIABLE</h1> 
    }
          
          </div>
        </section>
   
  )
}

Posts.propTypes = {
  post:PropTypes.func.isRequired,
  get_all_posts:PropTypes.func.isRequired,
  deletePost:PropTypes.func.isRequired
}
const mapStateToProps=state=>({
  profile:state.profileReducer.profile,
  postReducer:state.postReducer,

})

export default connect(mapStateToProps,{post,deletePost,get_all_posts})(Posts) 