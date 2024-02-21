import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExp } from "../../redux/modules/profiles";

const AddExp = ({addExp, history}) => {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false
    })
    const {title, company, location, from, to, current}= formData;
    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault()
        addExp(formData, history)
    }
    return(
        <div className="main" style={{textAlign: "center", width: 700, padding: 15}}>
            <p className="form-title">Add Experience</p>
            <small>* =  required Field</small>
            <form className="form1" onSubmit={onSubmit}>
                <div>
                    <input type="text" placeholder="* Title" name="title" value={title} onChange={onChange}/>
                </div>
                <div>
                    <input type="text" placeholder="* Company" name="company" value={company} onChange={onChange}/>
                </div>
                <div>
                    <input type="text" placeholder="Location" name="location" value={location} onChange={onChange}/>
                </div>
                <div>
                    <h3 style={{marginLeft:110, textAlign: "left", marginBottom:20}}>From Date</h3>
                    <input type="date" name="from" value={from} onChange={onChange}/>
                </div>
                <div>
                    <p style={{marginLeft:110, textAlign: "left", marginBottom:20}}><input type="checkbox" name="current" value={current} checked={current} onChange={()=> setFormData({...formData, current: !current})}/> Current Company</p>
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
AddExp.propTypes = {
    addExp: PropTypes.func.isRequired
}

export default connect(null, {addExp})(AddExp);