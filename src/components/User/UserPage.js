import React from 'react';
import useAuth from "../../hooks/useAuth";

function UserPage() {
    const {auth} = useAuth();
    const user = {...auth};
    console.log(user.fname)
    console.log(auth)
    return (
        <div className="w-[80%]  mx-auto">

            <div className="profile-image flex justify-start items-center mb-8">
                <img className="w-[30%]" src={user.profileImage}
                     alt={user.firstName + "" + user.lastName + "image"}
                />
                <h2 className="text-3xl font-semibold">{user.firstName + " " + user.lastName}</h2>
            </div>
            <div className="info-container flex flex-row justify-start items-stretch">
                <table className="user_info flx flex-col mr-8">
                    <tbody>
                    <tr className="country ">
                        <td className="w-2/4  pb-[10px] pr-8">
                            <span
                                className="border p-1 rounded-md bg-blue-50 font-semibold  text-blue-900">Country</span>
                        </td>
                        <td className="w-2/4  pb-[15px] pr-8">
                        <span
                            className="border p-1 border-blue-500 text-blue-900 rounded-md font-semibold bg-amber-200">
                            {user.country}
                        </span>
                        </td>
                    </tr>
                    <tr className="language ">
                        <td className="w-2/4  pb-[15px] pr-8"><span
                            className="border p-1 rounded-md bg-blue-50 font-semibold  text-blue-900">Language</span>
                        </td>
                        <td className="w-2/4  pb-[10px]"><span
                            className="border p-1 border-blue-500 text-blue-900 rounded-md font-semibold bg-amber-200 ">{user.language}</span>
                        </td>
                    </tr>
                    <tr className="specialty ">
                        <td className="w-2/4  pb-[15px]"><span
                            className="border p-1 rounded-md bg-blue-50 font-semibold  text-blue-900">Specialty</span>
                        </td>
                        <td className="w-2/4  pb-[10px]"><span
                            className="border p-1 border-blue-500 text-blue-900 rounded-md font-semibold bg-amber-200 ">{user.specialty}</span>
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
                    <div className="w-2/4  pb-[10px]"><span
                        className="border p-1 border-blue-500 text-blue-900 rounded-md font-semibold ">
                    {user.description}
                </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;