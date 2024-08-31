import { GET_PROFILE,DELETE_EDUCATION, CLEAR_PROFILE,GET_ALL_PROFILE, ADD_EXPERIENCE, ADD_EDUCATION, DELETE_EXPERIENCE } from "./types";


const initialState={
    profile:null,
    profiles:[],
    isloading:true,
}

 const profileReducer=(state=initialState,action)=>{
    const {type,payload}=action;
    switch (type) {
        case GET_PROFILE:
         return{
            ...state,
            isloading:false,
                profile:payload
         } 
         case CLEAR_PROFILE:
         return{
            ...state,
            isloading:false,
             profile:null
         } 
         case GET_ALL_PROFILE:
         return{
            ...state,
            isloading:false,
             profiles:payload
         }  
         case ADD_EXPERIENCE:
            return{
               ...state,
               isloading:false,
                profile:payload
            } 
            case DELETE_EDUCATION:
            return{
               ...state,
               isloading:false,
                profile:{
                    ...state.profile,
                   education: state.profile.education.filter(data=>data._id!==payload)}
            }   
              case DELETE_EXPERIENCE:
            return{
               ...state,
               isloading:false,
                profile:{
                    ...state.profile,
                   experience: state.profile.experience.filter(data=>data._id!==payload)}
            }  
            case ADD_EDUCATION:
            return{
               ...state,
               isloading:false,
                profile:{
                    ...state.profile,
                education:[...state.profile.education,payload]
            }
            }
    
        default:
         return state
    }
}

export default profileReducer;