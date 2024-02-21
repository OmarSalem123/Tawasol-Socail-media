import axios from "axios";

export const serverUrl = "http://localhost:5000";

export const api = axios.create({
    baseURL: `${serverUrl}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const setAuthToken = token => {
    if(token){
        api.defaults.headers.common["x-auth-token"] = token;
        localStorage.setItem("token", token);
    } else {
        delete api.defaults.headers.common["x-auth-token"];
        localStorage.removeItem("token");

    }
}
export const getProfileImage = userId => {
    console.log("User ID:", userId);
    return (`${serverUrl}/images/${userId}`)};

export const formateDate = date => {
    return new Intl.DateTimeFormat('en', {year: 'numeric', month: 'long'}).format(new Date(date));
}