import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BASE_URL from "../../app/apis/baseUrl";
import useAuth from "../../hooks/useAuth";
import Skeleton from "../Skeleton";
import {IoPaperPlaneOutline} from "react-icons/io5";
import {Link} from "react-router-dom";

function OrganizationPage() {
    const {auth, setAuth} = useAuth();
    const organization = {...auth};
    // console.log(organization)

    const [organizationData, setOrganizationData] = useState({});
    // const [loading, setLoading] = useState(false)
    // const [messageInCount, setMessageInCount] = useState(0);
    // const [messageOutCount, setMessageOutCount] = useState(0);


    // const getMessagesIn = async () => {
    //     const response = await axios.get();
    // }

    // const getMessageOut = async () => {
    //     setLoading(true)
    //     try {
    //         const response = await axios.get(`${BASE_URL}/organization-messages/${organization.id}`, {
    //             withCredentials: true
    //         });
    //
    //         setMessageOutCount(response?.data?.count)
    //         // setMessageOutCount()
    //     } catch (err) {
    //         console.log(err)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    const getOrganizationData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/organizations/me/${auth.id}`, {
                withCredentials: true
            });
            const result = response?.data?.data;
            setOrganizationData(result);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getOrganizationData();
        // getMessageOut();
    }, []);


    return (
        <div className="w-[80%] mt-8 mx-auto text-stone-700">

            <div className="w-full flex justify-start items-center mt-3 mb-5">
                <div className=" w-2/12  h-[250px] border-2 drop-shadow-md rounded-xl overflow-hidden">
                    {organizationData?.image
                        ? <img className="h-full w-full" src={organizationData?.image}
                               alt={organizationData?.name}
                        /> : <Skeleton className="w-full h-full" times={1}/>}
                </div>
                <div className="organizationData_info flex flex-col ml-8">

                    {organizationData?.lastName ? <h2 className="text-3xl font-semibold w-full text-stone-600 mb-8">
                            {organizationData?.name}</h2> :
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

                             <span className="text-red-700 font-bold">messageOutCount</span>
                            </span>
                            {/*<td className="in flex flex-row justify-evenly items-center border "><span>in</span>*/}
                            {/*    <span><IoPaperPlaneOutline className="rotate-180 text-lime-600"/></span>*/}
                            {/*    <span>{messageInCount}</span>*/}
                            {/*</td>*/}

                        </span>
                    </div>
                    <div className="organizationData_admin mb-1">
                        <Link className="font-semibold text-violet-700 underline mr-5"
                              to="/update-password"
                              alt="Reset Password">
                            Update Password
                        </Link>

                        {/*:TODO Update image*/}
                        {/*<Link to="/organizationData-page" className="font-semibold text-violet-700 underline mr-5">Change Image</Link>*/}
                        <Link to="/update-organization"
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
                    organizationData?.name ? <>
                        <td className="w-[30px]  pb-4 pr-3">
                            <span className="border rounded-md px-1 bg-lime-200 font-semibold">Specialty</span>
                        </td>
                        <td className="pb-4"><span className="font-semibold">
                            {organizationData?.specialty}
                        </span>
                        </td>
                    </> : <Skeleton className="w-full h-full" times={1}/>
                }
                </tr>

                <tr>
                    {
                        organizationData?.name ? <>
                            <td className="pb-4"><span
                                className="border rounded-md px-1 bg-lime-200 font-semibold">Country</span>
                            </td>
                            <td className="pb-4">
                                    <span className="font-semibold">
                                    {organizationData?.country.title}
                                    </span>
                            </td>

                        </> : <Skeleton className="w-full h-full" times={1}/>
                    }
                </tr>
                <tr>
                    {
                        organizationData?.name ? <>
                            <td className="pb-4"><span
                                className="border rounded-md px-1 bg-lime-200 font-semibold">Language</span>
                            </td>
                            <td className="pb-4">
                                    <span className="font-semibold">
                                    {organizationData?.language}
                                    </span>
                            </td>

                        </> : <Skeleton className="w-full h-full" times={1}/>
                    }
                </tr>
                </tbody>
            </table>
            <div className="description">{organizationData?.name ? <>
                    <span className="border-2 drop-shadow-sm rounded-md px-1 bg-lime-200 font-semibold">Description</span>
                    <p className="organizationData_description w-3/4 mt-4 text-stone-600 font-semibold">{organizationData?.description}</p></>
                : <Skeleton className="w-full h-full" times={1}/>}
            </div>
        </div>
    );
}

export default OrganizationPage;


// // import './Organization.css';
// import {useState, useEffect} from "react";
// import useAuth from "../../hooks/useAuth";
// import {BsFillInfoSquareFill} from "react-icons/bs";
// import {Link} from "react-router-dom";
// import axios from "axios";
// import BASE_URL from "../../app/apis/baseUrl";
// import Skeleton from "../Skeleton";
//
// const OrganizationPage = () => {
//     const {auth} = useAuth();
//
//     const organization = {...auth};
//     const [organizationData, setOrganizationData] = useState({});
//
//     const getOrganizationData = async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}/organizations/me/${organization?.id}`,
//                 {
//                     withCredentials: true
//                 });
//             console.log(response);
//             const result = response?.data?.data;
//
//             setOrganizationData(result)
//         } catch (err) {
//             console.log(err)
//         }
//     }
//
//     useEffect(() => {
//         getOrganizationData();
//     }, []);
//
//     return (
//         <div
//             className="organization-page h-screen mt-2 w-[90%] border-red-700 mb-6 mx-auto"
//         >
//             <div className="organization_header h-3/6"
//                  style={{
//                      backgroundImage: `url(${organizationData?.banner})`,
//                      backgroundRepeat: "no-repeat",
//                      backgroundClip: "border-box",
//                      backgroundSize: "cover",
//                      backgroundPosition: "center center ",
//                      backgroundAttachment: "fixed",
//                  }}>
//                 <div className="logo fixed top-[90px] left-[30px] h-[130px] w-[130px] border-2
//                  drop-shadow-md border-amber-400 rounded">
//                     {Object.keys(organizationData).length > 0
//                         ? <img src={organizationData?.logo} className="h-full w-full"
//                                alt="Logo"/> :
//                         <Skeleton className="w-full h-full" times={1}/>}
//                 </div>
//
//
//             </div>
//             <div className="update-password mt-4 mx-4">
//                 <Link to="/update-password" className=" mr-5 text-violet-700 font-semibold underline"
//                       alt="Update password">
//                     Update password
//                 </Link>
//                 <Link to={`/campaign-box/${organizationData.id}`}
//                       className=" mr-5 text-violet-700 font-semibold underline">
//                     campaign box
//                 </Link>
//                 <Link to="/update-organization"
//                       className="mr-5  text-violet-700 font-semibold underline cursor-pointer "
//                 >
//                     Update Profile
//                 </Link>
//                 <Link to="/update-banner-logo" className=" mr-5 text-violet-700 font-semibold underline">
//                     Update Banner & Logo
//                 </Link>
//             </div>
//             <div className="organization_info-header flex flex-row justify-start items-baseline mt-6 mb-8">
//                 <h3 className="text-xl border-2 border-[#ffc907] drop-shadow-md p-2 rounded-md text-violet-700  font-extrabold p2 mr-3">organization_info</h3>
//                 <span className="text-[#ffc907]"><BsFillInfoSquareFill/></span>
//             </div>
//             <div className="organization_info flex flex-row  mx-5 ">
//                 <div className="">
//                     <div className="info  flex flex-col">
//                         <div className="organization_info-country mb-3 flex flex-row justify-start items-center">
//                         <span
//                             className="px-2 border border-[#ffc907] shadow-[#0657A8]  rounded-xl text-[#0657A8] font-bold mr-2">
//                             {organizationData?.country?.title}
//                         </span>
//                         </div>
//                         <div
//                             className="organization_info-industry organization_info-country mb-3 flex flex-row justify-start items-center  ">
//                         <span
//                             className="px-2 border border-[#ffc907] shadow-[#0657A8]  rounded-xl text-[#0657A8] font-bold mr-2">
//                             {organizationData?.industryField}
//                         </span>
//
//                         </div>
//                     </div>
//                 </div>
//
//                 <div className="organization_description  flex flex-col items-start ml-8  w-3/4">
//                     <h3 className="px-2 border border-[#ffc907] shadow-[#0657A8]  rounded-xl text-[#0657A8] font-bold mb-2">Description</h3>
//                     <p className="text-md text-stone-900">{organizationData?.description}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default OrganizationPage;