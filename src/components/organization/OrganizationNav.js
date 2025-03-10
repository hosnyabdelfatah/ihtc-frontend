import './organizationNav.scss';
import {useSelector, useDispatch} from "react-redux";
import {getCurrentUser, setCurrentUser} from "../../features/currentUserSlice";
import Logo from "../../assets/images/logo-transparent.webp";
import {GrGroup} from "react-icons/gr";
import {SiAmazonsimpleemailservice} from "react-icons/si";
import {TbLogout} from "react-icons/tb";
import {HiOutlineLogin} from "react-icons/hi";
import {Link} from "react-router-dom";
import {selectCurrentUser} from "../../features/auth/authSlice";
import axios from "axios";
import BASE_URL from "../../app/apis/baseUrl";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {HiMiniBarsArrowDown} from "react-icons/hi2";
import {HiMiniBarsArrowUp} from "react-icons/hi2";
import {useState} from "react";
// <HiOutlineLogin />
const OrganizationNav = () => {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();
    const organization = useSelector(getCurrentUser)
    const organizationData = {...auth}

    const [showMenuBar, setShowMenuBar] = useState(false);

    const handleShowMenuBar = () => setShowMenuBar(!showMenuBar);

    const dispatch = useDispatch()
    const handleSignout = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/organizations/logout`, {
                withCredentials: true
            });

            dispatch(setCurrentUser({}));
            setAuth({});
            navigate("/");
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div
            className="organization-nav w-full border-b-2 border-b-[#ffc907]   drop-shadow-md flex flex-row justify-between items-center py-1 pr-4 mb-2">
            <div className="logo w-2/12"><img src={Logo} alt="logo"/></div>
            <div
                className="title flex justify-center w-[100px]  drop-shadow-md w-2/12">
                <Link to="organization"
                      className="text-3xl text-violet-900  font-bold font-mono ">
                    {/*<img src={organizationData?.logo} alt={organizationData.name}/>*/}
                    {organizationData.name.toUpperCase()}
                </Link>
            </div>
            <div className="bar-button  text-5xl text-amber-700 cursor-pointer" onClick={handleShowMenuBar}>
                {showMenuBar ? <HiMiniBarsArrowUp/> : <HiMiniBarsArrowDown/>}
            </div>
            <div
                className={`${showMenuBar ? "h-0 hidden" : ""} navbar w-5/12 py-1 px-2 overflow-hidden flex flex-row items-center justify-between border rounded-[12px]`}
            >

                <Link to="community"
                      className="community  w-1/4 p-1 ml-1 flex flex-row justify-center items-center  cursor-pointer rounded-[12px]  hover:bg-indigo-100">
                    <span className="mr-2  text-2xl text-[#ffc907]"><GrGroup/></span>
                    <span>Community</span>
                </Link>
                <Link to="campaign/"
                      className="mails  w-1/4 py-1 ml-1 flex flex-row justify-center items-center  cursor-pointer rounded-[12px]  hover:bg-indigo-100">
                        <span className="mr-2  text-2xl text-[#ffc907]">
                        <SiAmazonsimpleemailservice/>
                    </span>
                    <span>Campaigns</span>
                </Link>
                <div
                    className="logout w-1/4 cursor-pointer mr-1 pl-2 py-1 border rounded-[12px] flex flex-row justify-center items-end hover:bg-red-100"
                    onClick={handleSignout}
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