import './Organization.css';
import {useSelector, useDispatch} from "react-redux";
import {selectCurrentUserState} from "../../features/userAsSlice";
import {selectCurrentUser} from "../../features/auth/authSlice";
import {getCurrentUser} from "../../features/currentUserSlice";
import {BsFillInfoSquareFill} from "react-icons/bs";

const OrganizationPage = () => {
    const organization = useSelector(getCurrentUser)
    const organizationData = organization?.currentUser
    const logo = organizationData?.logo

    return (
        <div
            className="organization-page h-screen mt-4 border-red-700 mb-6 mx-4"
        >
            <div className="organization_header h-2/4"
                 style={{
                     fontSize: `30px`,
                     backgroundImage: `url(${logo})`,
                     backgroundRepeat: "no-repeat",
                     backgroundClip: "padding-box",
                     backgroundSize: "50%",
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
                            {organizationData?.industryField?.charAt(0).toUpperCase() + organizationData?.industryField?.slice(1)}
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

export default OrganizationPage;