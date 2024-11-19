import React from 'react';
import useAuth from "../../hooks/useAuth";

function DoctorPage() {
    const {auth} = useAuth();
    const doctor = {...auth};
    return (
        <div>
            <div className="doctor_image">
                <img src={doctor.image}
                     alt={doctor.firstName + " " + doctor.lastName}
                />
            </div>

            <h2>{doctor.firstName + " " + doctor.lastName}</h2>
            {/*<span>{doctor.specialty.title}</span>*/}
            {/*<span>{doctor.country.title}</span>*/}
            <p>{doctor.description}</p>
        </div>
    );
}

export default DoctorPage;