import React, { useState } from "react";
import { connect } from "react-redux";
import {Link, Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import { register } from "../../redux/modules/users";
import { showAlertMessage } from "../../redux/modules/alerts";

const Register = ({isAuth, showAlertMessage, register}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confPass: ""
    });
    const { name, email, password, confPass } = formData;
    const onChange = (e) => {
        return setFormData({...formData, [e.target.name]: e.target.value});
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        if(password !== confPass){
            showAlertMessage("Password do not match ", "error");
        } else{
            register({name, email, password});
        }
    }
    if(isAuth){
        return <Navigate to="/home"/>;
    }
    return(
        <>
        <div className="main register">
            <h3 className="Form Title">Sign Up</h3>
            <form className="form1" onSubmit={onSubmit}>
            <input
                className="input-text"
                type="text"
                name="name"
                placeholder="Name"
                align="center"
                value={name}
                onChange={onChange}/>

                <input
                className="input-text"
                type="text"
                name="email"
                placeholder="Email"
                align="center"
                value={email}
                onChange={onChange}/>     

                <input
                className="input-text"
                type="password"
                name="password"
                placeholder="Password"
                align="center"
                value={password}
                onChange={onChange}/>

                <input
                className="input-text"
                type="password"
                name="confPass"
                placeholder="Confirm Password"
                align="center"
                value={confPass}
                onChange={onChange}/>

                <input
                className="btn btn-primary"
                style={{marginLeft: "36%"}}
                type="submit"
                align="center"
                value="Register"/>

                <p className="forgot" align="center">
                    Already have an account? <Link href="/login">Sign In</Link>
                </p>    
            </form>
        </div>
        </>
    );
}
Register.propTypes = {
    register: PropTypes.func.isRequired,
    showAlertMessage: PropTypes.func.isRequired
}
const mapStateProps = (state) =>{
    return {
        isAuth: state.users.isAuth
    }
}
export default connect(mapStateProps, {showAlertMessage, register})(Register);