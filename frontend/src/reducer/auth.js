import {LOGGEDIN,LOGGEDOUT} from "./types";
const initialState={
    loading:true,
    isAuthenticated:false,
    profile:null,
}
 const authReducer=(state=initialState,action)=>{
    console.log(action.type);
    switch (action.type) {
        case LOGGEDIN:  localStorage.setItem("name",JSON.stringify(action.payload.username))
            return{
                ...state,
                isAuthenticated:true,
                profile:action.payload,
                loading:false
            }

        case LOGGEDOUT:
            localStorage.removeItem("name")
            return{
                ...state,
                isAuthenticated:false,
                profile:null,
                loading:false,
            }
    
        default:
           return state;
    }
}
 export default authReducer;