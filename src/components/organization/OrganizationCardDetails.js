import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {BsFillInfoSquareFill} from "react-icons/bs";
// import {currenOrganizationsList} from "../../features/organizatiosListSlice";
import {useFetchOrganizationsQuery} from "../../app/apis/organozationApi";
import Skeleton from "../Skeleton";
import OrganizationCard from "./OrganizationCard";

const OrganizationCardDetails = ({organization}) => {
    const {id} = useParams()
    // console.log(id)
    let organizationData;
    const {data, error, isFetching} = useFetchOrganizationsQuery(organization);

    let content;
    if (isFetching) {
        content = <Skeleton times={3} className='h-8 w-8'/>
    } else if (error) {
        // console.log(error)
        content = <div>Error loading organizations.</div>
    } else {


        const cardDetails = data.data.filter((organization) => organization.id === id)
        organizationData = cardDetails[0];
    }
    const logo = organizationData?.logo
    const banner = organizationData?.banner
    return (
        <div
            className="organization-page h-screen mt-2 w-[90%] border-red-700 mb-6 mx-auto"
        >
            <div className="organization_header h-3/6 w-full"
                 style={{
                     backgroundImage: `url(${banner})`,
                     backgroundRepeat: "no-repeat",
                     backgroundClip: "border-box",
                     backgroundSize: "contain",
                     backgroundPosition: "center center ",
                     backgroundAttachment: "fixed",
                 }}>
                <div className="logo fixed top-[90px] left-[30px] h-[130px] w-[130px] border-2
                 drop-shadow-md border-amber-400 rounded">
                    {Object.keys(organizationData).length > 0
                        ? <img src={logo} className="h-full w-full"
                               alt="Logo"/> :
                        <Skeleton className="w-full h-full" times={1}/>}
                </div>

            </div>
            <div className="update-password mt-4 mx-4">
                <Link to="/update-password" className=" mr-5 text-violet-700 font-semibold underline"
                      alt="Update password">
                    Update password
                </Link>
                <Link to={`campaign-box/${organizationData.id}`}
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
        // <div
        //     className="organization-page h-screen mt-4 border-red-700 mb-6 mx-4"
        // >
        //     <div className="organization_header h-2/4 "
        //          style={{
        //              fontSize: `30px`,
        //              backgroundImage: `url(${organizationData.banner})`,
        //              backgroundRepeat: "no-repeat",
        //              backgroundClip: "padding-box",
        //              backgroundSize: "100%",
        //              backgroundPosition: "center center",
        //              backgroundAttachment: "fixed",
        //          }}>
        //     </div>
        //     <div className="organization_info">
        //         <div className="organization_info-header flex flex-row justify-start items-baseline mt-6 mb-8">
        //             <h3 className="text-xl border-2 border-[#ffc907] drop-shadow-md p-2 rounded-md text-violet-700  font-extrabold p2 mr-3">organization_info</h3>
        //             <span className="text-[#ffc907]"><BsFillInfoSquareFill/></span>
        //         </div>
        //
        //         <div className="info  flex flex-row">
        //             <div className="organization_info-country mb-3 flex flex-row justify-start items-center">
        //                 <span
        //                     className="px-2 border border-[#ffc907] shadow-[#0657A8]  rounded-xl text-[#0657A8] font-bold mr-2">
        //                     {organizationData?.country?.title}
        //                 </span>
        //             </div>
        //             <div
        //                 className="organization_info-industry organization_info-country mb-3 flex flex-row justify-start items-center  ">
        //                 <span
        //                     className="px-2 border border-[#ffc907] shadow-[#0657A8]  rounded-xl text-[#0657A8] font-bold mr-2">
        //                     {organizationData?.industryField.charAt(0).toUpperCase() + organizationData?.industryField.slice(1)}
        //                 </span>
        //
        //             </div>
        //         </div>
        //     </div>
        //     <div className="organization_description flex flex-col items-start my-5">
        //         <h3 className="px-2 border border-[#ffc907] shadow-[#0657A8]  rounded-xl text-[#0657A8] font-bold mb-2">Description</h3>
        //         <p className="text-md text-stone-900">{organizationData?.description}</p>
        //     </div>
        // </div>
    );
};

export default OrganizationCardDetails;