import { showAlertMessage } from "./alerts";
import { api, serverUrl } from "../../utils";

export const GET_PROFILE = "profile/GET_PROFILE";
export const UPDATE_PROFILE = "profile/UPDATE_PROFILE";
export const PROFILE_ERROR = "profile/PROFILE_ERROR";
export const UPLOAD_PROFILE_IMAGE = "profile/UPLOAD_PROFILE_IMAGE";


export const getCurrentProfile = () => async (dispatch) => {
    try{
        const res = await api.get("/profiles/me");
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}
    //Create or Update profile
export const createProfile = (formData, history, edit= false) => async (dispatch) => {
    try{
        const res = await api.post("/profiles", formData);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(showAlertMessage(edit ? "Profile Updated Successfully" : "Profile Created Successfully", "Success"));
        if(!edit){
            history.push("/home")
        }
    }catch(err){
        let errors = err.response && err.response.data && err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(showAlertMessage(error.msg, "error")));
        } else {
            // Fallback error handling if the expected error structure is not present
            dispatch(showAlertMessage("An unexpected error occurred", "error"));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: (err.response && err.response.statusText) || "Error", status: (err.response && err.response.status) || 500}
        });
    }
}
export const uploadProfileImage = data => async (dispatch) => {
    try{
        const res = await api.post(`${serverUrl}/api/profiles/upload`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        dispatch({
            type: UPLOAD_PROFILE_IMAGE,
            payload: res.data
        });
    }catch(err){
        console.log(err);
    }
}

export const addExp = (formData, history) => async (dispatch) => {
    try{
        const res = await api.put("/profiles/exp", formData);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(showAlertMessage("Experience added successfully", "success"));
        history.push("/home");
    }catch(err){
        let errors = err.response && err.response.data && err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(showAlertMessage(error.msg, "error")));
        } else {
            // Fallback error handling if the expected error structure is not present
            dispatch(showAlertMessage("An unexpected error occurred", "error"));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: (err.response && err.response.statusText) || "Error", status: (err.response && err.response.status) || 500}
        });
    }
}

export const addEdu = (formData, history) => async (dispatch) => {
    try{
        const res = await api.put("/profiles/edu", formData);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(showAlertMessage("Education added successfully", "success"));
        history.push("/home");
    }catch(err){
        let errors = err.response && err.response.data && err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(showAlertMessage(error.msg, "error")));
        } else {
            dispatch(showAlertMessage("An unexpected error occurred", "error"));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: (err.response && err.response.statusText) || "Error", status: (err.response && err.response.status) || 500}
        });
    }
}

export const deleteExp = (id) => async(dispatch) => {
    try{
        const res = await api.delete(`/profiles/exp/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(showAlertMessage("Experience removed", "success"));
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteEdu = (id) => async(dispatch) => {
    try{
        const res = await api.delete(`/profiles/edu/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(showAlertMessage("Education removed", "success"));
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

const initialState = {
    profile: null,
    loading: true,
    error: {},
    image: null
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
            
            case PROFILE_ERROR:
                return{
                    ...state,
                    error: payload,
                    loading: false,
                    profile: null
                };
            case UPLOAD_PROFILE_IMAGE:
                return{
                    ...state,
                    image: payload,
                }
            default: return state;
    }
}