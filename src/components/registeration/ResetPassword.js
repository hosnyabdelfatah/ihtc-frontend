import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useParams, useSearchParams} from "react-router-dom";
import axios from 'axios';
import BASE_URL from '../../app/apis/baseUrl';
import {selectCurrentUserState} from "../../features/userAsSlice";
import {FaRegEyeSlash} from "react-icons/fa";
import {FaRegEye} from "react-icons/fa";
import {changeUserState, setCurrentUser} from "../../store";
import Spinner from '../Spinner';

const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
};

function ResetPassword() {
    const errRef = useRef();

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
        try {
            setSending(true);
            const response = await axios.patch(`${BASE_URL}/${userState}s/resetPassword/${token}`, {
                    newPassword,
                    newPasswordConfirm
                }
            );

            setNewPassword('');
            setNewPasswordConfirm('');
            setSending(false);
            // console.log(response)
        } catch (err) {
            // console.log(err)
            setErrMsg(err.response.data);
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
        <div className=" mt-12 mx-auto w-[90%]">
            <p ref={errRef}
               className={`${errMsg ? "errmsg opacity-100" : "opacity-0"} bg-red-700 text-stone-100 font-bold rounded text-center py-1  mb-8 transition-all`}
               aria-live="assertive">
                {errMsg}

            </p>
            <form onSubmit={(e) => handleSubmit(e)}
                  className="w-full flex flex-col justify-center items-center"
            >
                <div className="form-group w-[70%] flex flex-row justify-center items-center mb-5 relative ">
                    <label htmlFor="new-password"
                           className="max-w-[20%] text-lg text-blue-900 ml-[4.2rem]">
                        New Password
                    </label>
                    <input type={showPassword ? "text" : "password"} id="new-password" name="new-password"
                           value={newPassword}
                           className={`${userState === "user" ? "border-blue-200"
                               : userState === "doctor" ? " border-lime-200" : " border-amber-200"}
                         ml-5 p-2 border rounded-lg w-[40%] text-lg text-stone-600
                         focus:outline-none
                         `}
                           onChange={handleNewPassword}/>
                    <span className="inline-block absolute text-gray-400 right-[20%] top-3.5 cursor-pointer"
                          onClick={handleShowPassword}>{showPassword ?
                        <FaRegEye/> :
                        <FaRegEyeSlash/>}
                                </span>
                </div>

                <div className="form-group w-[70%] flex flex-row justify-center items-center mb-5 relative ">
                    <label htmlFor="new-password-confirm"
                           className="max-w-[30%] text-lg text-blue-900"
                    >
                        Confirm New Password
                    </label>
                    <input type={showPasswordConfirm ? "text" : "password"} id="new-password-confirm"
                           name="new-password-confirm"
                           className={`${userState === "user" ? "border-blue-200"
                               : userState === "doctor" ? " border-lime-200" : " border-amber-200"}
                         ml-5 p-2 border rounded-lg w-[40%] text-lg text-stone-600
                         focus:outline-none
                         `}
                           value={newPasswordConfirm}
                           onChange={handleNewPasswordConfirm}

                    />
                    <span className="inline-block absolute text-gray-400  right-[20%] cursor-pointer top-4"
                          onClick={handleShowPasswordConfirm}>{showPassword ?
                        <FaRegEye/> :
                        <FaRegEyeSlash/>}
                                </span>
                </div>
                <button
                    className={`${userState === "user" ? "bg-blue-400" : userState === "doctor" ? "bg-lime-400" : "bg-yellow-400"}  mx-auto py-2 px-6 rounded-lg text-lg
                 text-blue-900 font-semibold drop-shadow-md`}>
                    {errMsg === '' && sending ? <Spinner text="Sending"/> : "Send"}
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;