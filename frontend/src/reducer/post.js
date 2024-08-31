
const {POSTED,NOT_POSTED,GET_ALL_POSTS, ERROR_POST, POST_DELETED, SHOW_POST}=require("./types")
const initialState={
    posts:[],
    post:null,
    isLoading:true,
}

export const postReducer=(state=initialState,action)=>{
    const {type,payload}=action;
    switch (type) {
        case POSTED: 
            return{
                ...state,
                isLoading:false,
                posts:[payload,...state.posts]
            }
            case GET_ALL_POSTS:
            return{
                ...state,
                isLoading:false,
                posts:payload
            } 
            case NOT_POSTED:
            return{
                ...state,
                isLoading:false,
            }  
            case ERROR_POST:
            return{
                ...state,
                posts:[],
             post:null,
                isLoading:false,
            }  
            case POST_DELETED:
            return{
                ...state,
                posts:state.posts.filter(post=>post._id!==payload),
             post:null,
                isLoading:false,
            }
             case SHOW_POST:
            return{
                ...state,
             post:payload,
                isLoading:false,
            }
    
        default:
        return state
    }
}