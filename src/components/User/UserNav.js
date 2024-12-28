import React from 'react';
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {clearUser} from "../../features/userSlice";
import Logo from "../../assets/images/logo-transparent.webp";
import {SiCloudflareworkers} from "react-icons/si";
import {GrGroup} from "react-icons/gr";
import {SiAmazonsimpleemailservice} from "react-icons/si";
import {TbLogout} from "react-icons/tb";
import {HiOutlineLogin} from "react-icons/hi";


function UserNav() {
    const {auth, setAuth} = useAuth();
    const userData = {...auth}
    const dispatch = useDispatch();

    const handleSignout = () => {
        setAuth({});
        dispatch(clearUser())
    }

    return (
        <div
            className="user-nav border-b border-b-[rgb(30, 144, 255)]   drop-shadow-md flex flex-row justify-between items-center py-1 pr-4 mb-2">
            <div className="logo w-2/12"><img src={Logo} alt="logo"/></div>
            <div
                className="title w-3/12  flex justify-center drop-shadow-md">
                <Link to="user"
                      className="flex flx-row justify-center items-center">

                    <span
                        className="text-3xl text-violet-900 font-mono font-bold ">{userData?.firstName + " " + userData?.lastName}</span>
                </Link>
            </div>
            <div
                className="navbar w-4/12 px-2 py-1 overflow-hidden flex flex-row items-center justify-between border border-[rgb(30, 144, 255)] rounded-[12px]"
            >

                <Link to="organizations-home"
                      className="organizations  min-w-[3/12] p-1 ml-1 flex flex-row justify-center items-center cursor-pointer rounded-[12px]  hover:bg-amber-200 transition-all">
                    <span className="mr-2  text-2xl text-[#1E90FF]"><SiCloudflareworkers/></span>
                    <span>Organizations</span>
                </Link>


                <Link to="services"
                      className="mails  min-w-[3/12] py-1 ml-1 flex flex-row justify-center items-center            cursor-pointer rounded-[12px]  hover:bg-amber-200">
                        <span className="mr-2  text-2xl text-[#1E90FF]">
                        <SiAmazonsimpleemailservice/>
                    </span>
                    <span>Services</span>
                </Link>
                <div
                    className="logout  min-w-[3/12] cursor-pointer mr-1 pl-2 py-1 rounded-[12px] flex flex-row justify-center items-end hover:bg-red-100"
                    onClick={handleSignout}
                >

                    <span> {userData?.firstName ? "Logout" : "Login"}</span>
                    <Link to={userData?.name ? "" : "login"}
                          className="ml-2 text-red-600  text-2xl"
                    >
                        {userData?.name ? <TbLogout/> : <HiOutlineLogin/>}
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default UserNav;