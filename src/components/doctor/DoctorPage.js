import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BASE_URL from "../../app/apis/baseUrl";
import useAuth from "../../hooks/useAuth";
import Skeleton from "../Skeleton";
import {IoPaperPlaneOutline} from "react-icons/io5";
import {Link} from "react-router-dom";

function DoctorPage() {
    const {auth, setAuth} = useAuth();
    const doctor = {...auth};
    // console.log(doctor)

    const [doctorData, setDoctorData] = useState({});
    const [loading, setLoading] = useState(false)
    const [messageInCount, setMessageInCount] = useState(0);
    const [messageOutCount, setMessageOutCount] = useState(0);


    const getMessagesIn = async () => {
        const response = await axios.get();
    }

    const getMessageOut = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}/doctor-messages/${doctor.id}`, {
                withCredentials: true
            });

            setMessageOutCount(response?.data?.count)
            // setMessageOutCount()
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const getDoctorData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/doctors/me/${doctor.id}`, {
                withCredentials: true
            });
            const result = response?.data?.data;
            setDoctorData(result);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getDoctorData();
        getMessageOut();
    }, []);


    return (
        <div className="w-[80%] mt-8 mx-auto text-stone-700">

            <div className="w-full flex justify-start items-center mt-3 mb-5">
                <div className=" w-2/12  h-[250px] border-2 drop-shadow-md rounded-xl overflow-hidden">
                    {doctorData?.image
                        ? <img className="h-full w-full" src={doctorData?.image}
                               alt={doctorData?.firstName + " " + doctorData?.lastName}
                        /> : <Skeleton className="w-full h-full" times={1}/>}
                </div>
                <div className="doctorData_info flex flex-col ml-8">

                    {doctorData?.lastName ? <h2 className="text-3xl font-semibold w-full text-stone-600 mb-8">
                            {doctorData?.firstName + " " + doctorData?.lastName}</h2> :
                        <Skeleton className="w-full h-full" times={1}/>}

                    <div className=" mb-2 flex justify-between ">
                        <span className="w-4/12">
                            <Link to="/messages-sent"
                                  className="text-lime-700 font-semibold underline">
                                Messages
                            </Link>
                        </span>
                        <span className="w-5/12 text-lime-700">
                             <span
                                 className="w-full px-2 flex flex-row justify-between items-center border rounded"><span
                                 className="flex items-center">
                                 <span className="text-stone-600 font-bold">Sent</span>
                                 <IoPaperPlaneOutline className="text-red-700 ml-3"/>
                             </span>

                             <span className="text-red-700 font-bold">{messageOutCount}</span>
                            </span>
                            {/*<td className="in flex flex-row justify-evenly items-center border "><span>in</span>*/}
                            {/*    <span><IoPaperPlaneOutline className="rotate-180 text-lime-600"/></span>*/}
                            {/*    <span>{messageInCount}</span>*/}
                            {/*</td>*/}

                        </span>
                    </div>
                    <div className="doctorData_admin mb-1">
                        <Link className="font-semibold text-violet-700 underline mr-5"
                              to="/update-password"
                              alt="Reset Password">
                            Update Password
                        </Link>

                        {/*:TODO Update image*/}
                        {/*<Link to="/doctorData-page" className="font-semibold text-violet-700 underline mr-5">Change Image</Link>*/}
                        <Link to="/update-doctor"
                              className="mr-5 text-violet-700 font-semibold underline cursor-pointer">
                            Update Profile
                        </Link>
                        <Link to="/update-profile-image"
                              className="text-violet-700 font-semibold underline cursor-pointer">Update Profile
                            Imge</Link>
                    </div>
                </div>
            </div>

            <table>
                <tbody>
                <tr>{
                    doctorData?.lastName ? <>
                        <td className="w-[30px]  pb-4 pr-3">
                            <span className="border rounded-md px-1 bg-lime-200 font-semibold">Specialty</span>
                        </td>
                        <td className="pb-4"><span className="font-semibold">{doctorData?.specialty.title}</span>
                        </td>
                    </> : <Skeleton className="w-full h-full" times={1}/>
                }
                </tr>

                <tr>
                    {
                        doctorData?.lastName ? <>
                            <td className="pb-4"><span
                                className="border rounded-md px-1 bg-lime-200 font-semibold">Country</span>
                            </td>
                            <td className="pb-4">
                                    <span className="font-semibold">
                                    {doctorData?.country.title}
                                    </span>
                            </td>

                        </> : <Skeleton className="w-full h-full" times={1}/>
                    }
                </tr>
                <tr>
                    {
                        doctorData?.lastName ? <>
                            <td className="pb-4"><span
                                className="border rounded-md px-1 bg-lime-200 font-semibold">Language</span>
                            </td>
                            <td className="pb-4">
                                    <span className="font-semibold">
                                    {doctorData?.language.title}
                                    </span>
                            </td>

                        </> : <Skeleton className="w-full h-full" times={1}/>
                    }
                </tr>
                </tbody>
            </table>
            <div className="description">{doctorData?.lastName ? <>
                    <span className="border-2 drop-shadow-sm rounded-md px-1 bg-lime-200 font-semibold">Description</span>
                    <p className="doctorData_description w-3/4 mt-4 text-stone-600 font-semibold">{doctorData?.description}</p></>
                : <Skeleton className="w-full h-full" times={1}/>}
            </div>
        </div>
    );
}

export default DoctorPage;