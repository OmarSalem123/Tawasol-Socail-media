import React from "react";
import { formateDate } from "../../utils";

const Experience = ({profile, deleteExp}) => {
    return(
        <div>
            {profile.experience.map((e) => (
                <div key={e._id} className="container">
                    {deleteExp !== undefined? (
                        <a href="#!" onClick={() => deleteExp(e._id)}>
                            <i className="fas fa-trash delete"/>
                        </a>
                    ): null}
                    <p>
                        &#127891; {e.current ? "Works" : "Worked"} as <strong>{e.title}</strong> at <strong>{e.company}</strong> in <strong>{e.location}</strong>
                    </p>
                    <small>
                        from {formateDate(e.from)} to {e.current ? "Current" : formateDate(e.to)}
                    </small>
                </div>
            ))}
        </div>
    );
}

export default Experience;