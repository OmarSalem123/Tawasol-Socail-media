import React from "react";
import { formateDate } from "../../utils";

const Education = ({profile, deleteEdu}) => {
    return(
        <div>
            {profile.education.map((e) => (
                <div key={e._id} className="container">
                    {deleteEdu !== undefined? (
                        <a href="#!" onClick={() => deleteEdu(e._id)}>
                            <i className="fas fa-trash delete"/>
                        </a>
                    ): null}
                    <p>
                        &#127891; {e.current ? "Studies" : "Studied"} <strong>{e.degree}</strong> of <strong>{e.fieldofstudy}</strong> at <strong>{e.school}</strong>
                    </p>
                    <small>
                        from {formateDate(e.from)} to {e.current ? "Current" : formateDate(e.to)}
                    </small>
                </div>
            ))}
        </div>
    );
}

export default Education;