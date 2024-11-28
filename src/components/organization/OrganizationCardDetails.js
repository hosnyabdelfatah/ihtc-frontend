import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {BsFillInfoSquareFill} from "react-icons/bs";
import {currenOrganizationsList} from "../../features/organizatiosListSlice";
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

    return (
        <div
            className="organization-page h-screen mt-4 border-red-700 mb-6 mx-4"
        >
            <div className="organization_header h-2/4 border-2"
                 style={{
                     fontSize: `30px`,
                     backgroundImage: `url(${organizationData.banner})`,
                     backgroundRepeat: "no-repeat",
                     backgroundClip: "padding-box",
                     backgroundSize: "cover",
                     backgroundPosition: "center center",
                     backgroundAttachment: "fixed",
                 }}>
            </div>
            <div className="organization_info">
                <div className="organization_info-header flex flex-row justify-start items-baseline mt-6 mb-8">
                    <h3 className="text-xl border-2 border-[#ffc907] drop-shadow-md p-2 rounded-md text-violet-700  font-extrabold p2 mr-3">organization_info</h3>
                    <span className="text-[#ffc907]"><BsFillInfoSquareFill/></span>
                </div>

                <div className="info  flex flex-row">
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
                            {organizationData?.industryField.charAt(0).toUpperCase() + organizationData?.industryField.slice(1)}
                        </span>

                    </div>
                </div>
            </div>
            <div className="organization_description flex flex-col items-start my-5">
                <h3 className="px-2 border border-[#ffc907] shadow-[#0657A8]  rounded-xl text-[#0657A8] font-bold mb-2">Description</h3>
                <p className="text-md text-stone-900">{organizationData?.description}</p>
            </div>
        </div>
    );
};

export default OrganizationCardDetails;