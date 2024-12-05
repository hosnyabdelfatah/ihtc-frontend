import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BASE_URL from "../../app/apis/baseUrl";
import useAuth from "../../hooks/useAuth";
import Skeleton from "../Skeleton";
import {IoPaperPlaneOutline} from "react-icons/io5";

function DoctorPage() {
    const {auth} = useAuth();
    const doctor = {...auth};

    const [messageInCount, setMessageInCount] = useState(0);
    const [messageOutCount, setMessageOutCount] = useState(0);

    const getMessageOut = async () => {
        console.log(`${BASE_URL}/${doctor.id}`)
        const response = await axios.get(`${BASE_URL}/doctor-messages/${doctor.id}`);

        if (response)
            setMessageOutCount(response.data.count)
        // setMessageOutCount()
    }

    const getMessagesIn = async () => {
        const response = await axios.get();
    }

    useEffect(() => {
        getMessageOut();
    }, []);

    return (
        <div className="w-[80%] mt-8 mx-auto text-stone-700">

            <div className="w-full flex justify-start items-center mt-3 mb-16">
                <div className=" w-2/12  h-[250px] border-2 drop-shadow-md rounded-xl overflow-hidden">
                    {doctor?.profileImage ? <img className="" src={doctor?.profileImage}
                                                 alt={doctor?.firstName + " " + doctor?.lastName}
                    /> : <Skeleton className="w-full h-full" times={1}/>}
                </div>
                <div className="doctor_info flex flex-col ml-8">
                    {doctor?.profileImage ? <h2 className="text-3xl font-semibold w-full text-stone-600 mb-8">
                            {doctor?.firstName + " " + doctor?.lastName}</h2> :
                        <Skeleton className="w-full h-full" times={1}/>}
                    <table>
                        <tbody>
                        {doctor?.profileImage ? <tr>
                            <td className="w-[30px]  pb-4 pr-3">
                                <span className="border rounded-md px-1 bg-lime-200 font-semibold">Specialty</span>
                            </td>
                            <td className="pb-4"><span className="font-semibold">{doctor?.specialty.trim()}</span>
                            </td>
                        </tr> : <Skeleton className="w-full h-full" times={1}/>}
                        <tr>
                            {doctor?.profileImage ? <>
                                <td><span className="border rounded-md px-1 bg-lime-200 font-semibold">Country</span>
                                </td>
                                <td><span className="font-semibold">{doctor?.country}</span></td>
                            </> : <Skeleton className="w-full h-full" times={1}/>}
                        </tr>
                        <tr>
                            <td>Messages</td>
                            <td>
                                <td className="in flex flex-row justify-evenly items-center border "><span>in</span>
                                    <span><IoPaperPlaneOutline className="rotate-180 text-lime-600"/></span>
                                    <span>{messageInCount}</span>
                                </td>
                                <td className="flex flex-row justify-evenly items-center border "><span>Out</span>
                                    <span><IoPaperPlaneOutline className="text-red-600"/></span>
                                    <span>{messageOutCount}</span>
                                </td>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <div className="description">{doctor?.profileImage ? <>
                    <span className="border-2 drop-shadow-sm rounded-md px-1 bg-lime-200 font-semibold">Description</span>
                    <p className="doctor_description w-3/4 mt-4 text-stone-600 font-semibold">{doctor?.description}</p></>
                : <Skeleton className="w-full h-full" times={1}/>}
            </div>
        </div>
    );
}

export default DoctorPage;