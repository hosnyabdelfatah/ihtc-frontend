import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../app/apis/baseUrl";
import Skeleton from "../Skeleton";

function DoctorInfo() {
    const {id} = useParams();
    const [doctor, setDoctor] = useState();
    // console.log(id)

    useEffect(() => {
        const getDoctorInfo = async () => {
            const response = await axios.get(`${BASE_URL}/doctors/${id}`,
                {withCredentials: true});
            setDoctor(response.data.data);
            // console.log(response.data.data)
        }
        getDoctorInfo();
    }, []);
    return (
        <div className="w-[80%]  mx-auto text-stone-700">

            <div className="w-full flex justify-start items-center mt-5 mb-8">
                <div className=" w-1/4  h-[250px] drop-shadow-md rounded-xl overflow-hidden">
                    {doctor?.profileImage
                        ? <img src={doctor?.profileImage}
                               className="h-full w-full"
                               alt={doctor?.firstName + " " + doctor?.lastName}
                        /> : <Skeleton className="w-full h-full" times={1}/>}
                </div>
                <div className="doctor_info flex flex-col ml-8">
                    {doctor?.profileImage ? <h2 className="text-3xl font-semibold w-full text-stone-600 mb-8">
                            {doctor?.firstName + " " + doctor?.lastName}</h2> :
                        <Skeleton className="w-full h-full" times={1}/>}
                    <table>
                        <tbody>

                        <tr>{doctor?.profileImage ?
                            <>
                                <td className="w-[30px]  pb-4 pr-3">
                                    <span className="border rounded-md px-1 bg-lime-200 font-semibold">Specialty</span>
                                </td>
                                <td className="pb-4"><span
                                    className="font-semibold">{doctor?.specialty?.title}</span>
                                </td>
                            </>
                            : <Skeleton className="w-full h-full" times={1}/>}
                        </tr>
                        <tr>
                            {doctor?.profileImage ? <>
                                <td className="pb-4"><span
                                    className="border rounded-md px-1 bg-lime-200 font-semibold">Country</span>
                                </td>
                                <td className="pb-4"><span className="font-semibold">{doctor?.country?.title}</span>
                                </td>
                            </> : <Skeleton className="w-full h-full" times={1}/>}
                        </tr>
                        <tr>{doctor?.profileImage ?
                            <>
                                <td className="w-[30px]  pb-4 pr-3">
                                    <span className="border rounded-md px-1 bg-lime-200 font-semibold">Language</span>
                                </td>
                                <td className="pb-4"><span
                                    className="font-semibold">{doctor?.language?.title}</span>
                                </td>
                            </>
                            : <Skeleton className="w-full h-full" times={1}/>}
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <div className="description">{doctor?.profileImage ? <>
                    <span className="border-2 drop-shadow-sm rounded-md px-1 bg-lime-200 font-semibold">Description</span>
                    <p className="doctor_description mt-2 text-stone-600 font-semibold">{doctor?.description}</p></>
                : <Skeleton className="w-full h-full" times={1}/>}
            </div>
        </div>
    );
}

export default DoctorInfo;