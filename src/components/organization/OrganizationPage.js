import './Organization.css';
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../features/currentUserSlice";
import {BsFillInfoSquareFill} from "react-icons/bs";
import {Link} from "react-router-dom";

const OrganizationPage = () => {

    const organization = useSelector(getCurrentUser)
    const organizationData = organization?.currentUser
    const logo = organizationData?.logo
    const banner = organizationData?.banner
    // console.log(`Banner: ${banner}`)

    return (
        <div
            className="organization-page h-screen mt-2 w-[90%] border-red-700 mb-6 mx-auto"
        >
            <div className="organization_header h-3/6 border"
                 style={{
                     backgroundImage: `url(${banner})`,
                     backgroundRepeat: "no-repeat",
                     backgroundClip: "border-box",
                     backgroundSize: "auto",
                     backgroundPosition: "center center ",
                     backgroundAttachment: "fixed",
                 }}>
                {/*<img src={banner} alt="Banner"/>*/}
            </div>
            <div className="update-password mt-4">
                <Link to="/update-password" className=" mr-5 text-violet-700 font-semibold underline"
                      alt="Update password">
                    Update password
                </Link>
                <Link to={`campaign-box/${organizationData.id}`}
                      className=" mr-5 text-violet-700 font-semibold underline">campaign box</Link>
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