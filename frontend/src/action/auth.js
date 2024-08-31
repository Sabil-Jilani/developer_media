import Axios from "axios"
import { CLEAR_PROFILE, LOGGEDIN, LOGGEDOUT } from "../reducer/types";
import { setAlert } from "./alert";


const URL="http://localhost:8000";

export const GetUser= ({username,password},navigate)=>{
    return async dispatch=>{ 
  
        try {
            const res=await Axios.post(`${URL}/login`,{username:username,password:password},{withCredentials:true})
       
           dispatch( setAlert("logedin successfully","success"))
                dispatch({
                    type:LOGGEDIN,
                    payload:res.data.user
                });
              navigate("/dashboard");
            
                } catch (error) {
                    const err=error.response.data;
                    dispatch({
                        type:LOGGEDOUT
                    })
                    if(err.errors && err.errors.length>0){
        
                        err.errors.map(massage=>{ 
                            console.log(massage.msg)
                            return dispatch(setAlert(massage.msg,"danger"));
                      }
                        )  
                    }else{  dispatch(setAlert(err,"danger"))}

                   
                }
            
            
            }
            
    }
    export const register= ({username,name,password},navigate)=>{

         return async dispatch=>{ 
        try {
            const res=await Axios.post(`${URL}/register`,{username,password,name},{withCredentials:true})
       
            if(res.status===400){
                dispatch(setAlert("unAuthoraised ","danger"))
                dispatch({
                    type:LOGGEDOUT
                })
            }else{
                dispatch(setAlert("logedin successfully","success"))
                dispatch({
                    type:LOGGEDIN,
                    payload:res.data.user
                });
              navigate("/dashboard");
            }
                } catch (error) {
                     dispatch({
                        type:LOGGEDOUT
                    })
                    const err=error.response.data;
                    if(err.error && err.error.length>0){
                        err.error.map(masage=>dispatch(setAlert(masage.msg,"danger")))
                    }else{
                        console.log(error)
                          dispatch(setAlert(err.error.message,"danger"))
                        }
                  
                   
                
            
            
                    }
            
                }}
  export const autoLogIn=()=>async dispatch=>{
    try {
            const username=JSON.parse(localStorage.getItem("name"));
   
const res=await Axios.post(`${URL}/getUser`,{username},{withCredentials:true});

if (res) {
    console.log(res.data)
    dispatch({
        type:LOGGEDIN,
        payload:res.data.user
    })
} else {
    dispatch({
        type:LOGGEDOUT,
    })
}
    } catch (error) {
        dispatch({
            type:LOGGEDOUT,
        })  ;
         dispatch({
            type:CLEAR_PROFILE,
        }) 
    }

  }
  export const logout=(navigate)=>async dispatch=>{
const response=await Axios.get(`${URL}/logout`);

if (response.data.massge) {
   
    dispatch(setAlert(response.data.massge,"success"))
    dispatch({type:LOGGEDOUT})
} else {
    dispatch(setAlert("server error","danger"))
}

navigate("/")
  }