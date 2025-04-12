// import './Organization.css';
import {useState, useEffect} from "react";
import useAuth from "../../hooks/useAuth";
import {BsFillInfoSquareFill} from "react-icons/bs";
import {Link} from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../app/apis/baseUrl";
import Skeleton from "../Skeleton";

const OrganizationPage = () => {
    const {auth} = useAuth();
    // const refreshToken = localStorage.getItem('token');
    const organization = {...auth};
    const [organizationData, setOrganizationData] = useState({});

    // const getOrganizationData = async () => {
    //     try {
    //         const response = await axios.get(`${BASE_URL}/organizations/me/${organization?.id}`,
    //             {
    //                 withCredentials: true
    //             });
    //         console.log(response);
    //         const result = response?.data?.data;
    //
    //         setOrganizationData(result)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }


    useEffect(() => {
        const getOrganizationData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/organizations/me`,
                    {
                        withCredentials: true
                    });
                console.log(response);
                const result = response?.data?.data;

                setOrganizationData({...result})
            } catch (err) {
                console.log(err)
            }
        }

        // console.log("refreshToken", refreshToken)
        (async () => await getOrganizationData())();
    }, []);

    return (
        <div
            className="organization-page  mt-2 mb-12 w-[90%] pb-20  mx-auto"
        >
            <div className="organization_header border-2"
                 style={{
                     height: "20%"
                 }}>
                <img src={organizationData?.banner} className="w-full h-[300px]"/>
                <div className="logo fixed top-[90px] left-[30px] h-[130px] w-[130px] border-2
                 drop-shadow-md border-amber-400 rounded">
                    {Object.keys(organizationData).length > 0
                        ? <img src={organizationData?.logo} className="h-full w-full"
                               alt="Logo"/> :
                        <Skeleton className="w-full h-full" times={1}/>}
                </div>


            </div>
            <div className="update-password mt-4 mx-4">
                <Link to="/update-password" className=" mr-5 text-violet-700 font-semibold underline"
                      alt="Update password">
                    Update password
                </Link>
                <Link to={`/campaign-box/${organizationData.id}`}
                      className=" mr-5 text-violet-700 font-semibold underline">
                    campaign box
                </Link>
                <Link to="/update-organization"
                      className="mr-5  text-violet-700 font-semibold underline cursor-pointer "
                >
                    Update Profile
                </Link>
                <Link to="/update-banner-logo" className=" mr-5 text-violet-700 font-semibold underline">
                    Update Banner & Logo
                </Link>
            </div>
            <div className="organization_info-header flex flex-row justify-start items-baseline mt-6 mb-8">
                <h3 className="text-xl border-2 border-[#ffc907] drop-shadow-md p-2 rounded-md text-violet-700  font-extrabold p2 mr-3">organization_info</h3>
                <span className="text-[#ffc907]"><BsFillInfoSquareFill/></span>
            </div>
            <div className="organization_info flex flex-row  mx-5 ">
                <div className="">
                    <div className="info  flex flex-col">
                        <div className="organization_info-country mb-3 flex flex-row justify-start items-center">
                        <span
                            className="px-2 border border-[#ffc907] shadow-[#0657A8]  rounded-xl text-[#0657A8] font-bold mr-2">
                            {organizationData?.country?.title}
                        </span>
                        </div>
                        <div
                            className="organization_info-industry organization_info-country mb-3 flex flex-row justify-start items-center  ">
                        <span
                            className="px-2 border border-[#ffc907] shadow-[#0657A8]  rounded-xl text-[#0657A8] font-bold mr-2">
                            {organizationData?.industryField}
                        </span>

                        </div>
                    </div>
                </div>

                <div className="organization_description  flex flex-col items-start ml-8  w-3/4">
                    <h3 className="px-2 border border-[#ffc907] shadow-[#0657A8]  rounded-xl text-[#0657A8] font-bold mb-2">Description</h3>
                    <p className="text-md text-stone-900">{organizationData?.description}</p>
                </div>
            </div>
        </div>
    );
};

export default OrganizationPage;