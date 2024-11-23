import React from 'react';
import useAuth from "../../hooks/useAuth";

function DoctorPage() {
    const {auth} = useAuth();
    const doctor = {...auth};
    return (
        <div>
            <div className="w-full flex justify-start items-center">
                <div className="doctor_image">
                    <img src={doctor.image}
                         alt={doctor.firstName + " " + doctor.lastName}
                    />
                </div>
                <div className="doctor_info flex flex-col ">
                    <h2>{doctor.firstName + " " + doctor.lastName}</h2>
                    <span>{doctor.specialty.title}</span>
                    <span>{doctor.country.title}</span>
                </div>
            </div>
            <p className="doctor_description">{doctor.description}</p>
        </div>
    );
}

export default DoctorPage;