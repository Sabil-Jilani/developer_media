import { SET_ALERT,REMOVE_ALERT } from "../reducer/types";
const uuid=require("uuid")

export const setAlert=(msg,type)=>dispatch=>{
const id=uuid.v4();
dispatch({
    type:SET_ALERT,
    payload:{
        massge:msg,
        type:type,
        id:id,
    }
})

setTimeout(()=>dispatch({type:REMOVE_ALERT,payload:id}),10000)
}