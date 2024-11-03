import {useSelector, useDispatch} from "react-redux";
import {getCurrentUser, setCurrentUser} from "../../features/currentUserSlice";
import Logo from "../../assets/images/logo-transparent.webp";
import {GrGroup} from "react-icons/gr";
import {SiAmazonsimpleemailservice} from "react-icons/si";
import {TbLogout} from "react-icons/tb";
import {HiOutlineLogin} from "react-icons/hi";
import {Link} from "react-router-dom";
import {selectCurrentUser} from "../../features/auth/authSlice";

// <HiOutlineLogin />
const OrganizationNav = () => {
    const organization = useSelector(getCurrentUser)
    const organizationData = organization?.currentUser

    const dispatch = useDispatch()
    const handleSingout = () => {
        dispatch(setCurrentUser({}))
    }

    return (
        <div
            className="organization-nav border-b-2 border-b-[#ffc907]   drop-shadow-md flex flex-row justify-between items-center py-4 pr-2 mb-2">
            <div className="logo w-2/12 "><img src={Logo} alt="logo"/></div>
            <div
                className="title flex justify-center bg-[#ffc907] border py-1.5  px-5 rounded-[12px] drop-shadow-md w-3/12">
                <Link to="organization"
                      className="font-extrabold  text-3xl text-[#0657A8]
                        border-indigo-300">
                    {organizationData?.name.toUpperCase()}
                </Link>
            </div>
            <div
                className="navbar w-5/12 p-1 overflow-hidden flex flex-row items-center justify-between border rounded-[12px]"
            >
                <div
                    className="community w-2/6 p-1 ml-1 cursor-pointer rounded-[12px] flex flex-row items-center hover:bg-indigo-100">
                    <span className="mr-2  text-2xl text-[#ffc907] fo"><GrGroup/></span>
                    <Link to="community">Community</Link>
                </div>
                <div
                    className="mails w-2/6  p-1 cursor-pointer  rounded-[12px] flex flex-row items-center hover:bg-indigo-100">
                    <span className="mr-2  text-2xl text-[#ffc907]">
                        <SiAmazonsimpleemailservice/>
                    </span>
                    <Link to="campaign">Campaigns</Link>
                </div>
                <div
                    className="logout w-2/6 cursor-pointer mr-1 pl-2 py-1 rounded-[12px] flex flex-row justify-center items-end hover:bg-red-100"
                    onClick={handleSingout}
                >

                    <span> {organizationData?.name ? "Logout" : "Login"}</span>
                    <Link to={organizationData?.name ? "" : "login"}
                          className="ml-2 text-red-600  text-2xl"
                    >
                        {organizationData?.name ? <TbLogout/> : <HiOutlineLogin/>}
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default OrganizationNav;