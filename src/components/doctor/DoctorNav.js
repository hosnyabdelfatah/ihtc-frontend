import React from 'react';
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {clearDoctor} from "../../features/doctorSlice";
import Logo from "../../assets/images/logo-transparent.webp";
import {GrGroup} from "react-icons/gr";
import {SiAmazonsimpleemailservice} from "react-icons/si";
import {TbLogout} from "react-icons/tb";
import {HiOutlineLogin} from "react-icons/hi";


function DoctorNav() {
    const {auth, setAuth} = useAuth();
    const doctorData = {...auth}
    const dispatch = useDispatch();

    const handleSignout = () => {
        setAuth({});
        dispatch(clearDoctor())
    }

    return (
        <div
            className="doctor-nav border-b-2 border-b-[#ffc907]   drop-shadow-md flex flex-row justify-between items-center py-1 pr-4 mb-2">
            <div className="logo w-2/12"><img src={Logo} alt="logo"/></div>
            <div
                className="title flex justify-center w-[100px]  drop-shadow-md w-2/12">
                <Link to="doctor"
                      className="">
                    <img src={doctorData?.image}
                         alt={doctorData.firstName + " " + doctorData.lastName}
                    />
                </Link>
            </div>
            <div
                className="navbar w-4/12 p-1 overflow-hidden flex flex-row items-center justify-between border rounded-[12px]"
            >

                <Link to="community"
                      className="community  w-1/4 p-1 ml-1 flex flex-row justify-center items-center            cursor-pointer rounded-[12px]  hover:bg-indigo-100">
                    <span className="mr-2  text-2xl text-[#ffc907]"><GrGroup/></span>
                    <span>Community</span>
                </Link>


                <Link to="campaign"
                      className="mails  w-1/4 py-1 ml-1 flex flex-row justify-center items-center            cursor-pointer rounded-[12px]  hover:bg-indigo-100">
                        <span className="mr-2  text-2xl text-[#ffc907]">
                        <SiAmazonsimpleemailservice/>
                    </span>
                    <span>Campaigns</span>
                </Link>
                <div
                    className="logout w-1/4 cursor-pointer mr-1 pl-2 py-1 rounded-[12px] flex flex-row justify-center items-end hover:bg-red-100"
                    onClick={handleSignout}
                >

                    <span> {doctorData?.name ? "Logout" : "Login"}</span>
                    <Link to={doctorData?.name ? "" : "login"}
                          className="ml-2 text-red-600  text-2xl"
                    >
                        {doctorData?.name ? <TbLogout/> : <HiOutlineLogin/>}
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default DoctorNav;