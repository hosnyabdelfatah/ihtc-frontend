import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../app/apis/baseUrl";

function DoctorInfo() {
    const {id} = useParams();
    const [doctor, setDoctor] = useState();


    useEffect(() => {
        const getDoctorInfo = async () => {
            const response = await axios.get(`${BASE_URL}/doctors/${id}`);
            setDoctor(response.data.data);
        }
        getDoctorInfo();
    }, []);
    return (
        <div className="w-[80%]  mx-auto text-stone-700">

            <div className="w-full flex justify-start items-center mt-3 mb-8">
                <div className="doctor_image  border-2 drop-shadow-md rounded-xl overflow-hidden">
                    <img src={doctor?.profileImage}
                         alt={doctor?.firstName + " " + doctor?.lastName}
                    />
                </div>
                <div className="doctor_info flex flex-col ml-8">
                    <h2 className="text-3xl font-semibold text-stone-600 mb-8">{doctor?.firstName + " " + doctor?.lastName}</h2>
                    <table>
                        <tbody>
                        <tr>
                            <td className="w-[30px]  pb-4 pr-3">
                                <span className="border rounded-md px-1 bg-lime-200 font-semibold">Specialty</span>
                            </td>
                            <td className="pb-4"><span className="font-semibold">{doctor?.specialty.trim()}</span>
                            </td>
                        </tr>
                        <tr>
                            <td><span className="border rounded-md px-1 bg-lime-200 font-semibold">Country</span></td>
                            <td><span className="font-semibold">{doctor?.country}</span></td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <div className="description">
                <span className="border-2 drop-shadow-sm rounded-md px-1 bg-lime-200 font-semibold">Description</span>
                <p className="doctor_description mt-2 text-stone-600 font-semibold">{doctor?.description}</p>
            </div>
        </div>
    );
}

export default DoctorInfo;