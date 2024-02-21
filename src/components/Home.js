import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteEdu, deleteExp } from "../redux/modules/profiles";
import { getProfileImage } from "../utils";
import defaultImage from "../assets/images/default.png";
import BasicInfo from "./ProfileInfo/BasicInfo";
import Education from "./ProfileInfo/Education";
import Experience from "./ProfileInfo/Experience";

const Home = ({getCurrentProfile, deleteEdu, deleteExp,
     profiles: {profile}, users: {user}}) => {

    const [image, setImage] = useState("");
    const [errored, setErrored] = useState(false);

    useEffect(() => {
        getCurrentProfile();
        if(user){
            setImage(getProfileImage(user._id))
        }
    }, [getCurrentProfile, user])

    function onError(){
        if(!errored) {
            setErrored(true);
            setImage(defaultImage);
        }
    }
    return(
        <div className="home">
            {profile === null ? (
                <div>
                    <p style={{ padding: 10}}>Please create a profile</p>
                    <Link to="/create-profile" className="btn btn-primary">Create Profile</Link>
                </div>
            ): (
            <div>
                <div className="home-row">
                    <div className="home-column" style={{textAlign: "center"}}>
                        <img src={image} className="profile-picture" alt="Profile" onError={onError}></img>
                        <h4 className="name">{profile.user.name}</h4>
                    </div>
                    <div className="home-column">
                        <BasicInfo profile={profile}/>
                        <div className="social">
                            {profile.social ? Object.keys(profile.social)
                            .filter(media => profile.social[media] !== "")
                            .map(media => {
                                return(
                                    <a key={media} rel="noreferrer" target="_blank" href={profile.social[media]}>
                                        <i className={`fab fa-${media} fa-2x`}></i>
                                    </a>
                                )
                            })
                            : null }
                        </div>
                    </div>
                </div>
                <div className="home-row">
                    <div className="home-column">
                        <div className="home-row">
                            <div className="home-column">
                                <h3>Education</h3>
                            </div>
                            <div className="home-column">
                                <Link to="/add-edu" className="add-button">
                                    <i className="fa fa-plus-circle fa-2x"></i>
                                </Link>
                            </div>
                        </div>
                        <Education profile={profile} deleteEdu={deleteEdu}/>
                    </div>

                    <div className="home-column">
                        <div className="home-row">
                            <div className="home-column">
                                <h3>Experience</h3>
                            </div>
                            <div className="home-column">
                                <Link to="/add-exp" className="add-button">
                                    <i className="fa fa-plus-circle fa-2x"></i>
                                </Link>
                            </div>
                        </div>
                        <Experience profile={profile} deleteExp={deleteExp}/>
                    </div>

                </div>
            </div>
            )}
        </div>
    )
}



const mapStateToProps =  (state) => ({profiles: state.profiles, users: state.users});
export default connect(mapStateToProps, {getCurrentProfile, deleteEdu, deleteExp})(Home);