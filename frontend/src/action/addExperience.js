import {setAlert} from "./alert";
import Axios from "axios";
import { ADD_EXPERIENCE, DELETE_EXPERIENCE } from "../reducer/types";
const URL="http://localHost:8000";


export const addExperience=(data,navigate)=>async dispatch=>{
try {
    const res=await Axios.post(`${URL}/addExperience`,data,{withCredentials:true});
dispatch({
type:ADD_EXPERIENCE,
payload:res.data
})
dispatch(setAlert("experience add successfully","success"))
navigate("/dashboard")
} catch (error) {
    console.log(error);
    const err=error.response.data;

    if(err.errors && err.errors.length>0){
        err.errors.map(masage=>dispatch(setAlert(masage.msg,"danger")))
    }else{
          dispatch(setAlert(err.errors.message,"danger"))
        }
}
}

export const deleteExperience=(data)=>async dispatch=>{
    try {
           const result=await Axios.get(`${URL}/deleteExperience/${data}`,{withCredentials:true})
if(result){
    dispatch(setAlert(result.data,"success"));
    dispatch({
        type:DELETE_EXPERIENCE,
        payload:data
    })
}
    } catch (error) {        console.log(error.response.data.errors.message)
        dispatch(setAlert(error.response.data.errors.message,"success"));

    }
 
}