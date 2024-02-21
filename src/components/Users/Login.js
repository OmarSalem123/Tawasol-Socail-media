import React, { useState } from "react";
import { connect } from "react-redux";
import {Link, Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../redux/modules/users";

const Login = ({isAuth, login}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { email, password } = formData;
    const onChange = (e) => {
        return setFormData({...formData, [e.target.name]: e.target.value});
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        login(email, password);
    }
    if(isAuth){
        return <Navigate to="/home"/>;
    }
    return(
        <>
        <div className="main login">
            <h3 className="Form Title">Sign in</h3>
            <form className="form1" onSubmit={onSubmit}>
                <input
                className="input-text"
                type="text"
                name="email"
                placeholder="Email"
                align="center"
                value={email}
                onChange={onChange}
                required/>     

                <input
                className="input-text"
                type="password"
                name="password"
                placeholder="Password"
                align="center"
                value={password}
                onChange={onChange}
                required/>

                <input
                className="btn btn-primary"
                style={{marginLeft: "36%"}}
                type="submit"
                align="center"
                value="Login"/>

                <p className="forgot" align="center">
                    Don't have an account <Link href="/register">Sign up now</Link>
                </p>    
            </form>
        </div>
        </>
    );
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
}
const mapStateProps = (state) =>{
    return {
        isAuth: state.users.isAuth
    }
}
export default connect(mapStateProps, {login})(Login);