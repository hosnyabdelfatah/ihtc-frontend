import React, {useEffect, useState, useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import BASE_URL from '../../app/apis/baseUrl';
import {selectCurrentUserState} from "../../features/userAsSlice";
import {FaRegEyeSlash} from "react-icons/fa";
import {FaRegEye} from "react-icons/fa";
import {useSelector} from "react-redux";
import useAuth from "../../hooks/useAuth";
import {useAlert} from "../../context/AlertProvider";

// import {auth} from '../../app/apis/'

function UpdatePassword() {
    const {auth} = useAuth();
    const {userState} = useSelector(selectCurrentUserState);
    // console.log(userState)
    const errRef = useRef();
    const navigate = useNavigate();

    //Alert
    const {showAlert, hideAlert} = useAlert();
    const handleProcess = async (message, type) => {
        showAlert(message, type);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        hideAlert();
    }

    const [isLoading, setIsLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleCurrentPassword = (e) => setCurrentPassword(e.target.value);
    const handleNewPassword = (e) => setNewPassword(e.target.value);
    const handleNewPasswordConfirm = (e) => setNewPasswordConfirm(e.target.value);

    const handleShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword)
    const handleShowPassword = () => setShowPassword(!showPassword)
    const handleShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

    const circleSpinner = <span className="flex justify-center items-center ">
        <svg className="mr-3 h-5 w-5 animate-spin text-stone-100"
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
        {/*<span className="text-sm text-stone-100"> Processing...</span>*/}
    </span>


    const formData = new FormData();
    formData.append("id", auth.id);
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    formData.append("newPasswordConfirm", newPasswordConfirm);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentPassword || currentPassword === '') {
            handleProcess("Current password is required!", "error");
            setIsLoading(false);
            return;
        }
        if (!newPassword || !newPasswordConfirm || newPassword === '' || newPasswordConfirm === '') {
            handleProcess("New password and new password confirm is require!", "error");
            setIsLoading(false);
            return;
        }

        if (newPassword !== newPasswordConfirm) {
            handleProcess("New password not match new password confirm!", "error");
            setIsLoading(false);
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.patch(`${BASE_URL}/${userState}s/updatePassword`,
                formData
                , {
                    withCredentials: true,
                    headers: {'Content-Type': 'application/json'}
                }
            );
            setCurrentPassword('');
            setNewPassword('');
            setNewPasswordConfirm('');
            setIsLoading(false);
            handleProcess("Password update success", "success");
            navigate(`/${userState}`);
        } catch (err) {
            console.log(err)
            setIsLoading(false);
            handleProcess(err?.response?.data, "error");
            // setErrMsg(err.response.data);
        }
    }

    useEffect(() => {
        setErrMsg('');
        setIsLoading(false);
    }, [currentPassword, newPassword, newPasswordConfirm]);

    return (
        <div className=" mt-12 mx-auto w-[80%]">
            <p ref={errRef}
               className={`${errMsg ? "errmsg opacity-100" : "opacity-0"} bg-red-700 text-stone-100 font-bold rounded text-center py-1  mb-8 transition-all`}
               aria-live="assertive">
                {errMsg}

            </p>
            <form onSubmit={(e) => handleSubmit(e)}
                  className="w-[40%] mx-auto  flex flex-col justify-start items-center "
            >
                <div className="form-group w-full  flex flex-row justify-start items-center mb-8 relative ">
                    <label htmlFor="current-password"
                           className="text-base text-blue-900 font-semibold absolute top-[-24px] left-0">
                        Current password
                    </label>
                    <input type={showCurrentPassword ? "text" : "password"} id="current-password"
                           name="current-password"
                           className={`${userState === "user" ? "border-blue-200"
                               : userState === "doctor" ? " border-lime-200" : " border-amber-200"}
                          p-2 border rounded-lg w-full text-lg text-stone-600
                         focus:outline-none
                         `}
                           value={currentPassword}
                           onChange={handleCurrentPassword}
                    />
                    <span className="inline-block absolute text-gray-400 right-[5%] top-3.5 cursor-pointer"
                          onClick={handleShowCurrentPassword}>{showCurrentPassword ?
                        <FaRegEye/> :
                        <FaRegEyeSlash/>}
                                </span>
                </div>
                <div className="form-group w-full mb-8 flex flex-row justify-start items-center mb-5 relative ">
                    <label htmlFor="new-password"
                           className="text-base text-blue-900 font-semibold absolute top-[-24px] left-0">
                        New Password
                    </label>
                    <input type={showPassword ? "text" : "password"} id="new-password" name="new-password"
                           value={newPassword}
                           className={`${userState === "user" ? "border-blue-200"
                               : userState === "doctor" ? " border-lime-200" : " border-amber-200"}
                         p-2 border rounded-lg w-full text-lg text-stone-600
                         focus:outline-none
                         `}
                           onChange={handleNewPassword}/>
                    <span className="inline-block absolute text-gray-400 right-[5%] top-3.5 cursor-pointer"
                          onClick={handleShowPassword}>{showPassword ?
                        <FaRegEye/> :
                        <FaRegEyeSlash/>}
                                </span>
                </div>

                <div className="form-group w-full mb-8 flex flex-row justify-start items-center mb-5 relative  ">
                    <label htmlFor="new-password-confirm"
                           className=" text-base text-blue-900 font-semibold absolute top-[-24px] left-0"
                    >
                        Confirm New Password
                    </label>
                    <input type={showPasswordConfirm ? "text" : "password"} id="new-password-confirm"
                           name="new-password-confirm"
                           className={`${userState === "user" ? "border-blue-200"
                               : userState === "doctor" ? " border-lime-200" : " border-amber-200"}
                         p-2 border rounded-lg w-full text-lg text-stone-600
                         focus:outline-none
                         `}
                           value={newPasswordConfirm}
                           onChange={handleNewPasswordConfirm}

                    />
                    <span
                        className="inline-block absolute text-gray-400  right-[5%] cursor-pointer top-4"
                        onClick={handleShowPasswordConfirm}>{showPassword ?
                        <FaRegEye/> :
                        <FaRegEyeSlash/>}
                    </span>
                </div>
                <Link to={`/${userState}`}
                      className="text-violet-700 font-semibold underline"
                >
                    {userState.toString().toUpperCase()} page
                </Link>
                <button
                    className={`${userState === "user" ? "bg-blue-400" : userState === "doctor" ? "bg-lime-400" : "bg-yellow-400"} block mt-12 mx-auto py-2 px-10 text-xl text-blue-900 border-2 font-semibold rounded-lg border`}>
                    {/*{errMsg === '' && sending ? <Spinner text="Sending"/> : "Send"}*/}
                    {isLoading ? circleSpinner : <span>Send</span>}
                </button>
            </form>
        </div>
    );
}

export default UpdatePassword;