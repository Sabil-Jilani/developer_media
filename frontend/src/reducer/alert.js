import { SET_ALERT,REMOVE_ALERT } from "./types";
const initialState=[];
export const alertReducer= (state=initialState,action)=>{
switch (action.type) {
    case SET_ALERT:
      return[...state,
     action.payload]
        
      case REMOVE_ALERT:
      return state.filter(e=>e.id !==action.payload)

    default:
        return state;
}
}
