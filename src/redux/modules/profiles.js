import { showAlertMessage } from "./alerts";
import { api, serverUrl } from "../../utils";

export const GET_PROFILE = "profile/GET_PROFILE";
export const GET_PROFILES = "profile/GET_PROFILES";
export const UPDATE_PROFILE = "profile/UPDATE_PROFILE";
export const PROFILE_ERROR = "profile/PROFILE_ERROR";
export const UPLOAD_PROFILE_IMAGE = "profile/UPLOAD_PROFILE_IMAGE";
export const CLEAR_PROFILE = "profile/CLEAR_PROFILE";
export const DELETE_ACCOUNT = "profile/DELETE_ACCOUNT";


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
export const getProfiles = () => async (dispatch) => {
    dispatch({type: CLEAR_PROFILE})

    try{
        const res = await api.get("/profiles")
        console.log("profiles: "+res.data)
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}
export const getProfilesById = (userId) => async (dispatch) => {
    dispatch({type: CLEAR_PROFILE})

    try{
        const res = await api.get(`/profiles/user/${userId}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
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
export const deleteAccount = () => async(dispatch) => {
    if(window.confirm('Are you sure? This will permanently delete all your data')){
        try{
            await api.delete("/profiles")
            dispatch({
                type: DELETE_ACCOUNT
            });
            dispatch(showAlertMessage('Your account has been permanently deleted'))
        }catch(err){
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            })
        }
    }
}
const initialState = {
    profile: null,
    profiles: [],
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
            case GET_PROFILES:
            case DELETE_ACCOUNT:
                return {
                    ...state,
                    profiles: payload,
                    loading: false
                };
    
            case PROFILE_ERROR:
                return{
                    ...state,
                    error: payload,
                    loading: false,
                    profile: null
                };
            case CLEAR_PROFILE:
                return{
                    ...state,
                    profile: null,
                    repos: []
                }
            case UPLOAD_PROFILE_IMAGE:
                return{
                    ...state,
                    image: payload,
                }
            default: return state;
    }
}