import { api } from "../../utils";
import { showAlertMessage } from "./alerts";

const REGISTER_SUCCESS = "users/REGISTER_SUCCESS";
const REGISTER_FAIL = "users/REGISTER_FAIL";
const USER_LOADED = "users/USER_LOADED";
const USER_ERROR = "users/USER_ERROR";

export const loadUser = () => async (dispatch) => {
    try{
        const res = await api.get("/users");
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch(error){
        dispatch({
            type: USER_ERROR
        })
    }
}

export function register(formData) {
    return async function registerThunk(dispatch){
        try{
            //call api /users/register
            const res = await api.post("/users/register", formData);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            dispatch(loadUser());
        }catch(error){
            const errors = error.response.data.errors;
            if(errors){
                errors.forEach(error => {
                    dispatch(showAlertMessage(error.msg, "error"));
                });
            }
            dispatch({
                type: REGISTER_FAIL
            });
        }
    }
}

const initialState = {
    token: localStorage.getItem("token"),
    isAuth: null,
    loading: true,
    user: null
}

export default function reducer(state = initialState, action){
    const { type, payload} = action;
    switch(type) {
        case USER_LOADED:
            return {
                ...state,
                isAuth: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                token: payload.token,
                isAuth: true,
                loading: false
            }
        case REGISTER_FAIL:
            localStorage.setItem("token", null);
            return {
                ...state,
                token: null,
                isAuth: false,
                loading: false
            }
        case USER_ERROR:
            localStorage.setItem("token", null);
            return{
                ...state,
                token: null,
                isAuth: false,
                loading: false,
                user: null
            }
        default: 
        return state;
    }
}