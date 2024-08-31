import Axios from "axios";
import { CLEAR_PROFILE, GET_ALL_PROFILE, GET_PROFILE } from "../reducer/types";
const URL="https://developer-media.onrender.com";
const {setAlert}=require("./alert")
export const get_user_profile = (id) =>async dispatch=>{
    try {
         const res=await Axios.get(`${URL}/user/${id}`,{withCredentials:true});
          if(res.data.profile._id){
            dispatch({
    type:GET_PROFILE,
    payload:res.data.profile
})
          }

    } catch (error) {
        console.log(error)
        dispatch({
            type:CLEAR_PROFILE,
        })
    }


}

export const get_profiles=()=>async dispatch=>{
    const profiles=await Axios.get(`${URL}/profiles`);
    dispatch({
        type:GET_ALL_PROFILE,
        payload:profiles.data
    })
}

export const get_A_profile=(username)=>async dispatch=>{
  dispatch({
    type:CLEAR_PROFILE
  })
    const res=await Axios.get(`${URL}/profile/${username}`);
 if(res){
      dispatch({
    type:GET_PROFILE,
    payload:res.data
   })}
}


export const create_profile=({profile,term,navigate})=>async dispatch=>{
    try {
     if (term==="create") {
   const res=await Axios.post(`${URL}/createProfile`,profile,{withCredentials:true})
   
   if(res){
dispatch(setAlert("profile created successfully","success"))
dispatch({
    type:GET_PROFILE,
    payload:res.data.profile
})
   }
   } else {
    const res=await Axios.post(`${URL}/updateProfile`,profile,{withCredentials:true})
       if(res){
    dispatch(setAlert("profile updated successfully","success"))
    dispatch({
        type:GET_PROFILE,
        payload:res.data.profile
    })
       }
   }  
   navigate("/")
    } catch (error) {
        console.log(error);
        const err=error.response.data;

        if(err.errors && err.errors.length>0){
            err.errors.map(masage=>dispatch(setAlert(masage.msg,"danger")))
        }else{
              dispatch(setAlert(err.error.message,"danger"))
            }
        dispatch({
            type:CLEAR_PROFILE
        });
 
    }

}
export const deleteAccount=(id)=>async dispatch=>{
    if (window.confirm("this process is irreverseable !!")) {
        try {
        const res=await Axios.get(`${URL}/deleteAccount/${id}`,{withCredentials:true})
       dispatch({
type:CLEAR_PROFILE
       })
       dispatch(setAlert(res.data,"success"))
    } catch (error) {
  
       dispatch(setAlert(error.response.data.errors.messege,"danger"))
    }
    }
    
}