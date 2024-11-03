import React from 'react';

const DoctorCard = ({doctor}) => {
    return (
        <div>
            <img src={doctor.avatar} alt={doctor.fname + ' ' + doctor.lname}/>
            <h2>{doctor.fname} {doctor.lname}</h2>
            <span className="doctor_specialty">{doctor.specialty}</span>
            <span className="doctor_work-place">{doctor.workPlace}</span>
        </div>
    );
};

export default DoctorCard;