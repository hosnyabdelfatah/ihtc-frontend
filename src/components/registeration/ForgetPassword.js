import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {useAlert} from "../../context/AlertProvider";

import axios from 'axios';
import BASE_URL from '../../app/apis/baseUrl';
import {selectCurrentUserState} from "../../features/userAsSlice";

function ForgetPassword() {
    const {showAlert, hideAlert} = useAlert();
    const handleProcess = async (message, type) => {
        showAlert(message, type);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        hideAlert();
    }

    const {userState} = useSelector(selectCurrentUserState);
    const navigate = useNavigate();
    const location = useLocation();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [sending, setSending] = useState(false);

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
       <span className="text-stone-100"> Processing...</span>
    </span>

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleLogging = () => {
        if (errMsg !== '')
            setSending(true)
    }
    useEffect(() => {
        // console.log(window.location.origin)
        //
        // console.log(window.location)
    }, [])

    const handleSubmit = async (e) => {
        try {
            setSending(true);
            e.preventDefault();

            if (!email || email === '') return handleProcess('You must enter email', "error")

            const response = await axios.post(`${BASE_URL}/${userState}s/forgetPassword`, {
                email, url: `${window.location.origin}`, useAs: `${userState}`
            });
            console.log(response)
            // console.log(error.response.data.message)
            setEmail('');
            // console.log(`Email is: ${email}`)
            setErrMsg('');
            setSending(false);
            // console.log(response.status, response.data.message)
            // navigate('/check-email', {state: {from: location}, replace: true});
            window.open('check-email', '_blank')
        } catch (err) {
            setSending(false);
            if (err?.code === "ERR_NETWORK") {
                setErrMsg("Network connection error !, please try again later");
            }
            if (err.response.status === 401 || err.response.status === 400 || err.response.data === "You not logged in please login") {
                setErrMsg("Email is not valid please enter valid email!")
            }
        }
    }

    useEffect(() => {
        setErrMsg('')
        setSending(false)
    }, [email]);

    return (
        <div className=" mt-12 mx-auto max-w-[40%]">
            <p ref={errRef}
               className={`${errMsg ? "errmsg opacity-100" : "opacity-0"} bg-red-700 text-stone-100 font-bold rounded text-center py-1  mb-8 transition-all`}
               aria-live="assertive">
                {errMsg}
            </p>
            <form className="w-full flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <div className="form-group w-full relative">
                    <label
                        className=" text-2xl text-blue-900 absolute left-[-8px] top-[-30px]"
                        htmlFor="email">
                        Email
                    </label>
                    <input className={`${userState === "user" ? "border-blue-200"
                        : userState === "doctor" ? " border-lime-200" : " border-amber-200"}
                          p-2 border rounded-lg w-full text-xl text-stone-600 
                         focus:outline-none
                         `}
                           type="email"
                           id="email"
                           name="email"
                        // autoComplete="off"
                           disabled={errMsg === "" && sending}
                           value={email}
                           onChange={(e) => handleEmail(e)}
                    />
                </div>

                <div className="login w-[34%] pl-3 mt-3">
                    <Link to="/login" className="text-lg text-indigo-600 underline">Login</Link>
                </div>
                <button
                    className={`${userState === "user" ? "bg-blue-500" : userState === "doctor" ? "bg-lime-400" : "bg-yellow-400"} mt-12 py-2 px-5 text-xl text-blue-900 border-2 font-semibold rounded-lg `}
                    onClick={() => {
                        handleLogging()
                    }}
                >
                    {sending ? circleSpinner : 'Send'}
                </button>
            </form>
        </div>
    );
}

export default ForgetPassword;