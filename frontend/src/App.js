import React,{useEffect} from "react";
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import './App.css';
import Landing from "./components/landing"
import Nabar from "./components/nabar";
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import Register from "./components/auth/register";

import store from "./store";
import { Provider} from "react-redux";
import PrivateRoutes from "./components/privateRoutes";
import Profiles from "./components/profiles";
import Profile from "./components/profile";
import Dashboard from "./components/dashboard";

import { autoLogIn } from "./action/auth";
import PropTypes  from "prop-types";
import CreateProfile from "./components/froms/createProfile";
import AddExperience from "./components/froms/addExperience";
import AddEducation from "./components/froms/addEducation";
import Posts from "./components/posts";
import Post from "./components/post";


function App() {
 useEffect(() => {
 store.dispatch(autoLogIn())
 }, [])
 
  return (<Provider store={store}>
  <BrowserRouter>

<Nabar/>


      <Routes>
      <Route element={<PrivateRoutes/>}>
      
      <Route  path="/dashboard" element={<Dashboard/>}></Route>
      <Route  path="/logout" element={<Logout/>}></Route>
      <Route  path="/updateProfile" element={<CreateProfile/>}></Route>
      <Route  path="/addExperience" element={<AddExperience/>}></Route>
      <Route  path="/addEducation" element={<AddEducation/>}></Route>
    
      </Route> 
      <Route  path="/register" element={<Register/>}></Route>
      <Route  path="/profiles" element={<Profiles/>}></Route>
      <Route  path="/profile/:userName" element={<Profile/>}></Route>
      <Route  path="/" element={<Landing/>}></Route> 
      <Route  path="/posts" element={<Posts/>}></Route> 
      <Route  path="/post" element={<Post/>}></Route> 
      <Route  path="/login" element={<Login/>}></Route>
      </Routes>

 
  </BrowserRouter></Provider>
   
  );
}

App.prototypes={
autoLogIn:PropTypes.func.isRequired
}
export default App;
