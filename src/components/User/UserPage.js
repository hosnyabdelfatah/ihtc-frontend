import React, {useEffect, useState} from 'react';
import useAuth from "../../hooks/useAuth";
import {Link} from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../app/apis/baseUrl";
import Skeleton from "../Skeleton";

function UserPage() {
    const {auth} = useAuth();
    const user = {...auth};

    const [userData, setUserData] = useState({});
    // console.log(user)

    const getUserData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/me/${auth.id}`, {
                withCredentials: true
            });

            // console.log(response?.data?.data)
            setUserData(response?.data?.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className="w-[80%]  mx-auto mb-6">

            <div className="profile-image flex justify-start items-center mb-8">
                {userData?.avatar ? <img className="w-[30%]" src={userData?.avatar}
                                         alt={userData?.fname + "" + userData?.lname + "image"}
                /> : <Skeleton className="w-full h-full"/>}
                <div className="text  ml-5 ">
                    {userData.id ? <h2 className="text-3xl font-semibold">
                        {userData?.fname + " " + userData?.lname}
                    </h2> : <Skeleton className="w-full h-full"/>}
                    <div className="update-password mt-3">
                        <Link to="/update-password" alt="Update password"
                              className="mr-4 text-lg text-violet-700 underline font-semibold">
                            Update password
                        </Link>
                        <Link to="/update-user-data"
                              className="mr-4 text-lg text-violet-700 underline font-semibold">
                            Update Profile
                        </Link>
                        <Link to="/update-user-image"
                              className="mr-4 text-lg text-violet-700 underline font-semibold">
                            Update Image
                        </Link>
                    </div>
                </div>


            </div>
            <div className="info-container flex flex-row justify-start items-stretch">
                <table className="userData?_info flx flex-col mr-8">
                    <tbody>
                    <tr className="country ">
                        <td className="w-2/4  pb-[10px] pr-8">
                            <span
                                className="border p-1 rounded-md bg-blue-50 font-semibold  text-blue-900">Country</span>
                        </td>
                        <td className="w-2/4  pb-[15px] pr-8">
                            {userData?.country ? <span
                                className="border p-1 border-blue-500 text-blue-900 rounded-md font-semibold bg-amber-200">
                            {userData?.country?.title}
                        </span> : <Skeleton className="w-full h-full"/>}
                        </td>
                    </tr>
                    <tr className="language ">
                        <td className="w-2/4  pb-[15px] pr-8"><span
                            className="border p-1 rounded-md bg-blue-50 font-semibold  text-blue-900">Language</span>
                        </td>
                        <td className="w-2/4  pb-[10px]">
                            {userData?.language?.title ? <span
                                className="border p-1 border-blue-500 text-blue-900 rounded-md font-semibold bg-amber-200 ">{userData?.language?.title}
                            </span> : <Skeleton className="w-full h-full"/>}
                        </td>
                    </tr>
                    <tr className="specialty ">
                        <td className="w-2/4  pb-[15px]"><span
                            className="border p-1 rounded-md bg-blue-50 font-semibold  text-blue-900">Specialty</span>
                        </td>
                        <td className="w-2/4  pb-[10px]">
                            {userData?.specialty?.title ? <span
                                className="border p-1 border-blue-500 text-blue-900 rounded-md font-semibold bg-amber-200 ">{userData?.specialty?.title}
                            </span> : <Skeleton className="w-full h-full"/>}
                        </td>
                    </tr>

                    </tbody>
                </table>
                <div className="description">
                    <div className="w-2/4  pb-[15px] mb-2">
                    <span className="border-2 p-1 rounded-md bg-lime-400 font-semibold  text-blue-900">
                    Description
                    </span>
                    </div>
                    <div
                        className="w-full  pb-[10px]  p-1  text-blue-900 rounded font-semibold h-[120px] overflow-y-scroll">

                        {userData?.description ? userData?.description :
                            <Skeleton className="w-full h-full"/>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;