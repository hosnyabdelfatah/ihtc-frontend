import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from 'axios';
import BASE_URL from '../../app/apis/baseUrl';
import {selectCurrentUserState} from "../../features/userAsSlice";
import {FaRegEyeSlash} from "react-icons/fa";
import {FaRegEye} from "react-icons/fa";
import {changeUserState, setCurrentUser} from "../../store";
import {useAlert} from "../../context/AlertProvider";
// import Spinner from '../Spinner';

const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
};

function ResetPassword() {
    const navigate = useNavigate();
    const errRef = useRef();
    const {showAlert, hideAlert} = useAlert();

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

    const handleProcess = async (message, type) => {
        showAlert(message, type);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        hideAlert();
    }

    const dispatch = useDispatch();
    const {userState} = useSelector(selectCurrentUserState)
    const [searchParams] = useSearchParams();
    const useAs = searchParams.get('useAs');
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [sending, setSending] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    const handleNewPasswordConfirm = (e) => {
        setNewPasswordConfirm(e.target.value);
    }

    const handleShowPassword = () => setShowPassword(!showPassword)
    const handleShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== newPasswordConfirm) {
            handleProcess("New password not match new password confirm!");
            return
        }
        try {
            setSending(true);
            const response = await axios.patch(`${BASE_URL}/${userState}s/resetPassword/${token}`, {
                    url: `${window.location.origin}`,
                    newPassword,
                    newPasswordConfirm
                }
            );

            setNewPassword('');
            setNewPasswordConfirm('');
            setSending(false);
            handleProcess("Reset password success. Please login", "error");
            navigate('/login');
            // console.log(response)

        } catch (err) {
            // console.log(err)
            // setErrMsg(err.response.data);
            setSending(false);
            handleProcess(err.response.data, "error");
        }
    }

    useEffect(() => {
        dispatch(changeUserState(useAs));
        setCookie("useAs", useAs, 1000);
        // const userType = getCookie("useAs")
        // console.log(document.cookie)
        // console.log(userType)
    }, []);

    useEffect(() => {
        setErrMsg('');
        setSending(false);
    }, [newPassword, newPasswordConfirm]);

    return (
        <div className=" mt-12 mx-auto w-[40%]">
            <p ref={errRef}
               className={`${errMsg ? "errmsg opacity-100" : "opacity-0"} bg-red-700 text-stone-100 font-bold rounded text-center py-1  mb-8 transition-all`}
               aria-live="assertive">
                {errMsg}

            </p>
            <form onSubmit={(e) => handleSubmit(e)}
                  className="w-full flex flex-col justify-center items-center "
            >
                <div className="form-group w-full flex flex-row justify-center items-center mb-10 relative ">
                    <label htmlFor="new-password"
                           className="text-base text-blue-900 absolute
                           top-[-20px] left-2">
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
                    <span className="inline-block absolute text-gray-400 right-[10%] top-3.5 cursor-pointer"
                          onClick={handleShowPassword}>{showPassword ?
                        <FaRegEye/> :
                        <FaRegEyeSlash/>}
                                </span>
                </div>

                <div className="form-group w-full flex flex-row justify-center items-center mb-5 relative ">
                    <label htmlFor="new-password-confirm"
                           className="text-base text-blue-900 absolute top-[-20px] left-2"
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
                    <span className="inline-block absolute text-gray-400  right-[10%] cursor-pointer top-4"
                          onClick={handleShowPasswordConfirm}>{showPassword ?
                        <FaRegEye/> :
                        <FaRegEyeSlash/>}
                                </span>
                </div>
                <button
                    className={`${userState === "user" ? "bg-blue-400" : userState === "doctor" ? "bg-lime-400" : "bg-yellow-400"}  mx-auto py-2 px-6 rounded-lg text-lg
                 text-blue-900 font-semibold drop-shadow-md`}>
                    {sending ? circleSpinner : "Send"}
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;