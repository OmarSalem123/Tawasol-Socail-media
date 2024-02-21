import {connect} from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfiles } from "../redux/modules/profiles";
import { getProfileImage } from "../utils";
import DefaultImage from "../assets/images/default.png";

function Developers({user, getProfiles, profiles: {profiles, loading}}) {
    useEffect(() => {
        getProfiles();
    }, [getProfiles])
    return(
        <div>
            {loading ? null : (
                <div className="home">
                    <div className="row">
                        {profiles.filter(profile => profile.user._id !== user._id).map((profile)=>{
                            return(
                                <div className="column" key={profile.user._id}>
                                    <Link to={`/profile/${profile.user._id}`}>
                                        <Cards profile={profile}/>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

function Cards({profile}){
    const [errored, setErrored] = useState(false);
    const [image, setImage] = useState(getProfileImage(profile.user._id))
    function onError() {
        if(!errored){
            setErrored(true)
            setImage(DefaultImage)
        }
    }
    return(
        <div className="card">
            <img onError={onError} src={image} alt="Profile"/>
            <div className="card-container">
                <p>{profile.user.name}</p>
                <p className="title">{profile.status}</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.users.user,
    profiles: state.profiles
})
export default connect(mapStateToProps, {getProfiles})(Developers);