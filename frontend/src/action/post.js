import  Axios from "axios";
import { GET_ALL_POSTS, NOT_POSTED,POST_DELETED, POSTED,ERROR_POST, SHOW_POST } from "../reducer/types";
import { setAlert } from "./alert";
const URL="https://developer-media.onrender.com";

 export const post=(post)=>async dispatch=>{
try {
   const res=await Axios.post(`${URL}/posts`,post,{withCredentials:true})
    if(res){
        dispatch({
            type:POSTED,
            payload:res.data
        }) ;
      return   dispatch(setAlert("posted","success"))
    }
    dispatch({
        type:NOT_POSTED
    });
    dispatch(setAlert("posted failed try again","danger"))

} catch (error) {
    console.log(error)
    dispatch({
        type:NOT_POSTED,
    })
    dispatch(setAlert(error.response.data.errors.messege,"danger"))

}
 };
 export const get_all_posts=()=>async dispatch=>{
    try {
       const res=await Axios.get(`${URL}/posts/all`,{withCredentials:true});
       console.log(res.data)
       if(res){
        dispatch({
            type:GET_ALL_POSTS,
            payload:res.data
                 })
            }
    }catch(error){
   console.log(error) ; 
      dispatch({
            type:ERROR_POST,
                 })

       }
    };

    export const deletePost=(id)=>async dispatch=>{
        try {
await Axios.get(`${URL}/posts/${id}`,{withCredentials:true});
dispatch(setAlert("post deleted","success"))
dispatch({
    type:POST_DELETED,
    payload:id
})
        }catch(error){
dispatch(setAlert(error.response.data.errors.messege,"danger"))
console.log(error.response.data.errors.messege)
        }
    }

