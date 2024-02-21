import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEdu } from "../../redux/modules/profiles";

const AddEdu = ({addEdu, history}) => {
    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false
    })
    const {school, degree, fieldofstudy, from, to, current}= formData;
    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault()
        addEdu(formData, history)
    }
    return(
        <div className="main" style={{textAlign: "center", width: 700, padding: 15}}>
            <p className="form-title">Add Education</p>
            <small>* =  required Field</small>
            <form className="form1" onSubmit={onSubmit}>
                <div>
                    <input type="text" placeholder="* School" name="school" value={school} onChange={onChange}/>
                </div>
                <div>
                    <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree} onChange={onChange}/>
                </div>
                <div>
                    <input type="text" placeholder="Field of study" name="fieldofstudy" value={fieldofstudy} onChange={onChange}/>
                </div>
                <div>
                    <h3 style={{marginLeft:110, textAlign: "left", marginBottom:20}}>From Date</h3>
                    <input type="date" name="from" value={from} onChange={onChange}/>
                </div>
                <div>
                    <p style={{marginLeft:110, textAlign: "left", marginBottom:20}}><input type="checkbox" name="current" value={current} checked={current} onChange={()=> setFormData({...formData, current: !current})}/> Current School</p>
                </div>
                <div>
                    <h3 style={{marginLeft:110, textAlign: "left", marginBottom:20}}>To Date</h3>
                    <input type="date" name="to" value={to} onChange={onChange} disabled={current}/>
                </div>
                <input type="submit" className="btn btn-primary"/>
                <Link className="btn btn-light" to="/home">Go Back</Link>
            </form>
        </div>
    );  
}
AddEdu.propTypes = {
    addEdu: PropTypes.func.isRequired
}

export default connect(null, {addEdu})(AddEdu);