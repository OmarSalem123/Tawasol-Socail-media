import React from "react";
import { Link } from "react-router-dom";
import Title from "./Title";

const Landing = () => {

    return(
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="logo">TawaSol</h1>
                    <Title/>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary display-block">Signup</Link>
                        <Link to="/login" className="btn btn-light display-block">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;