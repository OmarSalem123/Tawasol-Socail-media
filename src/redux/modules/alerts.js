/*
Redux elements
1. Define Action
2. Action creator function
3. Reducer function
*/
// Define Action
const SHOW_ALERT_MESSAGE = "alerts/SHOW_ALERT_MESSAGE";

//Action creator function
export function showAlertMessage(msg, type = "info"){
    return function showAlertMessageThunk(dispatch){
        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: {
                show: true,
                msg,
                type
            }
        })
    }
}
//reducer function
const initialState = {
    show: false,
    msg: "",
    type: "info"
}
export default function reducer(state = initialState, action){
    switch(action.type){
        case SHOW_ALERT_MESSAGE:
            return{
                ...state,
                show: true,
                msg: action.payload.msg,
                type: action.payload.type
            };
            default:
                return state;
    }
}