import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteAccount } from "../redux/modules/profiles";


const Settings = ({deleteAccount}) => {
    
    return(
        <div className="home">
            <div className="post-card center">
                <div style={{marginBottom: 15}}>
                    <h3>Update your profile information</h3>
                </div>
                <div style={{marginBottom: 15}}>
                    <Link to={"/edit-profile"} className="btn btn-primary">Edit Account</Link>
                </div>
            </div>
            <div className="post-card center">
                <div>
                    <h3>This will completely delete and remove your data from TawaSol</h3>
                </div>
                <div>
                    <button className="btn btn-danger" onClick={() => deleteAccount()}>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default connect(null, { deleteAccount })(Settings);