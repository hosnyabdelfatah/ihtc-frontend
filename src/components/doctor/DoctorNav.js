import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {clearDoctor} from "../../features/doctorSlice";
import Logo from "../../assets/images/logo-transparent.webp";
import {GrGroup} from "react-icons/gr";
import {SiAmazonsimpleemailservice} from "react-icons/si";
import {TbLogout} from "react-icons/tb";
import {HiOutlineLogin} from "react-icons/hi";
import BASE_URL from "../../app/apis/baseUrl";
import axios from "axios";
import {IoPaperPlaneOutline} from "react-icons/io5";


function DoctorNav() {
    const {auth, setAuth} = useAuth();
    const doctorData = {...auth}
    const dispatch = useDispatch();

    const [errMsg, setErrMsg] = useState('');

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/doctors/logout`, {
                headers: {'Content-type': 'application/json'},
                withCredentials: true,
            });
            console.log(response)
        } catch (err) {
            console.log(err);

        }
        setAuth({});
        dispatch(clearDoctor())
    }

    return (
        <div
            className="doctor-nav border-b-2 border-b-lime-200  drop-shadow-md flex flex-row justify-between items-center py-1 pr-4 ">
            <div className="logo w-2/12">
                <img src={Logo} alt="logo"/></div>
            <div
                className="title flex justify-between w-5/12 h-[80px] ">
                <Link to="doctor"
                      className="w-3/6 flex flex-row justify-center items-center h-[100%] overflow-hidden">
                    <img className="w-2/4  h-[100%] rounded-full  mr-4" src={doctorData?.profileImage}
                         alt={doctorData.firstName + " " + doctorData.lastName}
                    />
                    <span><span>Welcome </span> <span
                        className="text-stone-600 font-bold"> {doctorData.firstName + " " + doctorData.lastName}</span></span>
                </Link>

            </div>

            <div
                className="navbar w-4/12 py-1 px-3 overflow-hidden flex flex-row items-center justify-between border rounded-[12px]"
            >

                <Link to="doctors"
                      className="doctors  min-w-3/12 p-1 ml-1 flex flex-row justify-center items-center            cursor-pointer rounded-[12px]  hover:bg-indigo-100">
                    <span className="mr-2  text-2xl text-lime-400"><GrGroup/></span>
                    <span>Doctors</span>
                </Link>

                <Link to="doctor-messages"
                      className="mails min-w-3/12 py-1 ml-1 flex flex-row justify-center items-center            cursor-pointer rounded-[12px]  hover:bg-indigo-100">
                        <span className="mr-2  text-2xl text-lime-400">
                        <SiAmazonsimpleemailservice/>
                    </span>
                    <span>Send Message</span>
                </Link>
                <div
                    className="logout min-w-3/12 cursor-pointer mr-1 pl-2 py-1 rounded-[12px] flex flex-row justify-center items-end hover:bg-red-100"
                    onClick={handleLogout}
                >

                    <span> {doctorData?.lastName ? "Logout" : "Login"}</span>
                    <Link to={doctorData?.lastName ? "logout" : "login"}
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