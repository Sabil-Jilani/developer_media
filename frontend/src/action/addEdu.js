
import Axios from "axios";
import {setAlert} from "./alert";
import { ADD_EDUCATION,DELETE_EDUCATION } from "../reducer/types";

const URL="https://developer-media.onrender.com";

export const addEdu=(data,navigate)=>async dispatch=>{
try {
 await Axios.post(`${URL}/addEducation`,data,{withCredentials:true});

    dispatch(setAlert("education updated successfully","success"));
dispatch({
    type:ADD_EDUCATION,
    payload:data
});
navigate("/dashboard");
    
} catch (error) {
    const err=error.response.data;
    console.log(error)
    if(err.errors && err.errors.length>0){
        err.errors.map(err=> dispatch(setAlert(err.message,"danger"))
        )
    }else{
        dispatch(setAlert(err.errors.message,"danger"))
        }
}
}
export const deleteEducation=(data)=>async dispatch=>{
    try {
       const res= await Axios.get(`${URL}/deleteEducation/${data}`,{withCredentials:true})
        dispatch(setAlert(res.data,"success"));
        dispatch({
            type:DELETE_EDUCATION,
            payload:data
           })
    } catch (error) {

        dispatch(setAlert(error.data,"danger"))
    }
}