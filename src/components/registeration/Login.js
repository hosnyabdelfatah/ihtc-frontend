import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {loginOrganization} from "../../features/organizationLoginSlice";
import {loginDoctor} from "../../features/doctorSlice";
import {loginUser} from "../../features/userSlice";
import {Link, useNavigate} from 'react-router-dom';
import {setCredentials, setError} from "../../features/auth/authSlice";
import {changeUserState, setCurrentUser} from "../../store";
import {selectCurrentUserState} from "../../features/userAsSlice";
// import {useOrganizationLoginMutation} from "../../store";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import {useAlert} from "../../context/AlertProvider";
import BASE_URL from "../../app/apis/baseUrl";

const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
};


const Login = () => {
    const {auth, setAuth} = useAuth();
    // console.log(auth)
    const {showAlert, hideAlert} = useAlert();
    const handleProcess = async (message, type) => {
        showAlert(message, type);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        hideAlert();
    }

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {userState} = useSelector(selectCurrentUserState)
    // const data = useSelector(selectCurrentError);
    // console.log(userState)

    const signUp = userState === 'organization'
        ? 'organization-signup'
        : userState === 'doctor'
            ? 'doctor-signup'
            : 'user-signup';

    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const [logging, setLogging] = useState(false);

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

    const addError = [];

    useEffect(() => {
        userRef.current.focus();
        // console.log(userState)
    }, []);

    useEffect(() => {
        setErrMsg('')
    }, [user, password, userState])

    const handleChaneUserAs = (value) => {
        setCookie("useAs", value, 1000);
        // console.log(document.cookie)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user === '' || password === '') {
            // setErrMsg('User and password is require');
            handleProcess('User and password is require', "error");
            setLogging(false)
            return
        }
        try {
            setLogging(true);
            if (userState === 'organization') {
                const response = await axios.post(`${BASE_URL}/organizations/login`, {user, password}, {
                    withCredentials: true,
                    withXSRFToken: true
                });
                console.log(response);
                const result = response?.data?.data;
                setAuth({...result})
                setUser("");
                setPassword("");
                handleProcess(`Welcome back ${result.name}`);
                setLogging(false);
                navigate("/");
                // dispatch(loginOrganization({user, password})).then((res) => {
                //     if (res.payload !== undefined) {
                //         setAuth({...res.payload})
                //         setUser("");
                //         setPassword("");
                //         handleProcess(`Welcome back ${res?.payload?.name}`);
                //         setLogging(false);
                //         navigate("/");
                //     } else {
                //         setLogging(false);
                //         if (res?.error?.message === "Request failed with status code 401" || res?.error?.message === "Request failed with status code 400") {
                //             // setErrMsg("Access Denied! Invalid username or password")
                //             handleProcess("Invalid username or password", "error");
                //             setLogging(false);
                //         } else {
                //             setLogging(false)
                //             // setErrMsg(res?.error?.message + " please try again later!")
                //             handleProcess(`Network error please try again later. `, "error")
                //         }
                //     }
                // });
            } else if (userState === 'doctor') {
                dispatch(loginDoctor({user, password})).then((res) => {
                    if (res.payload !== undefined) {
                        setAuth({...res.payload})
                        setUser("");
                        setPassword("");
                        console.log(res.payload)
                        handleProcess(`Welcome ${res.payload.firstName} ${res.payload.lastName}`);
                        setLogging(false);
                        navigate("/");
                    } else {
                        setLogging(false);
                        console.log(res.error)
                        if (res?.error?.message === "Request failed with status code 401" || res?.error?.message === "Request failed with status code 400") {
                            // setErrMsg("Access Denied! Invalid username or password")
                            handleProcess("Invalid username or password", "error");
                        } else if (res?.error?.message === "Request failed with status code 404") {
                            setLogging(false);
                            // setErrMsg("There is no doctor with this email!");
                            handleProcess("There is no doctor with this email!", "error");
                        } else {
                            setLogging(false)
                            handleProcess("Net work error please try again later!", "error")
                            // setErrMsg("Net work error please try again later!");
                        }
                    }
                });
            } else if (userState === 'user') {
                dispatch(loginUser({user, password})).then((res) => {
                    if (res.payload !== undefined) {
                        setAuth({...res.payload})
                        setUser("");
                        setPassword("");
                        handleProcess(`Welcome back  ${auth.firstName} ${auth.lastName}`);
                        setLogging(false);
                        navigate("/");
                    } else {
                        setLogging(false)
                        if (res?.error?.message === "Network Error") {
                            // setErrMsg("Network Error!. Please try again later");
                            handleProcess("Network Error!. Please try again later", "error");
                        } else if (res?.error?.message === "Request failed with status code 400" || res?.error?.message === "Request failed with status code 401" || res?.error?.message === "Request failed with status code 404") {
                            // setErrMsg('Invalid username or password');
                            handleProcess('Invalid username or password', "error");
                        } else {
                            // setErrMsg(res?.error?.message);
                            handleProcess(res?.error?.message, "error");

                        }
                    }
                });
            }

        } catch (err) {
            setLogging(false)
            if (err?.response?.status === 400) {
                // setErrMsg('Missing Username or Password');
                handleProcess('Email or password not correct', "error")
            } else if (err?.response?.status === 401) {
                // setErrMsg('Unauthorized');
                handleProcess('Unauthorized', 'error');
            } else if (err.message ===
                "Cannot destructure property 'user' of 'action.payload' as it is undefined.") {
                // setErrMsg('Login Failed, please write correct email and password! ');
                handleProcess('Login Failed, please write correct email and password! ', 'error');
                // console.log(err)
            } else {
                // setErrMsg(err.message)
                handleProcess(err.message, 'error');
            }
            errRef.current.focus()
        }
        console.log(logging)
    }

    const handleUserInput = (e) => setUser(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)


    useEffect(() => {
        setLogging(false)
    }, [userState])


    return (
        <div className="login mt-12 sm:w-[60%] md:w-[40%] sm:mt-4  mx-auto rounded">
            <p ref={errRef}
               className={`${errMsg ? "errmsg block" : "hidden"} bg-red-700 text-stone-100 font-bold rounded text-center py-1`}
               aria-live="assertive">
                {errMsg}
            </p>
            <h2 className="mx-auto px-5 text-xl font-semibold">
                Use our site as
                <span
                    className={`${userState === 'user' ? "bg-indigo-200" : userState === 'doctor' ? "bg-lime-200" : "bg-amber-200"} py-1 px-4 rounded-xl border-2 drop-shadow-md capitalize text-red-700 font-extrabold ml-3`}>{userState}
            </span>
            </h2>
            <div className=" shadow-lg px-4 py-6 rounded-lg">
                <div
                    className="buttons w-ful mx-auto font-bold my-4 w-f flex flex-row justify-between rounded-t-lg overflow-hidden "
                >
                    <button
                        className={`${userState === "user" ? "border-blue-500"
                            : "border-stone-100"} user-login w-[33%] bg-stone-500  py-3 rounded-tl-lg text-stone-100  border-2 shadow-sm text-base`}
                        onClick={() => {
                            dispatch(changeUserState("user"))
                            handleChaneUserAs("user")
                        }}
                    >
                        User
                    </button>
                    <button
                        className={`${userState === "doctor" ? "border-lime-500"
                            : "border-stone-100"} doctor-login  w-[33%]  bg-stone-500  py-3 border-2	shadow-sm  text-base text-stone-100`}
                        onClick={() => {
                            dispatch(changeUserState("doctor"))
                            handleChaneUserAs("doctor")
                        }}
                    >
                        Doctor
                    </button>
                    <button
                        className={`${userState === "organization" ? "border-amber-500"
                            : "border-stone-100"} organization-login  bg-stone-500 w-[33%]  py-3 rounded-tr-lg shadow-sm border-2  text-base shadow-sm   text-stone-100`}
                        onClick={() => {
                            dispatch(changeUserState("organization"))
                            handleChaneUserAs("organization")
                        }}
                    >
                        Organization
                    </button>
                </div>
                <p className="my-8">Login with your email or unique ID<br/>
                    haven't an account<span> </span>
                    <span className="underline text-blue-500 font-semibold">
                        <Link to={`/${signUp}`}>register</Link>
                    </span>
                </p>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="user flex flex-row items-baseline p-3 justify-between">
                        <label htmlFor="user"
                               className="w-2/12 text-left">{userState === "doctor" ? "User" : " Email"} </label>
                        <input type="text" id="user" name="email" value={user}

                               ref={userRef} required={true}
                               placeholder={`${userState === "doctor" ? "email or unique Id" : "email"}`}
                               onChange={handleUserInput}
                               className={`border-stone-300 block w-8/12 px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border focus:border-blue-400 transition duration-150 ease-in-out text-lg sm:leading-5`}
                        />
                    </div>
                    <div className="password  flex flex-row justify-between p-3  items-baseline ">
                        <label htmlFor="password" className="w-2/12 text-left">Password</label>
                        <input type="password" id="password" name="password" required={true}

                               value={password}
                               onChange={handlePasswordInput}
                               className="block w-8/12 px-3 py-2 border border-stone-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border focus:border-blue-400
                                transition duration-150 ease-in-out text-lg sm:leading-5"
                        />


                    </div>
                    <div
                        className="forget-password flex flex-row justify-center items-center text-violet-700 font-semibold underline">
                        <Link to="/forget-password">Forget password</Link>
                    </div>
                    <button
                        className="w-full  border-2  shadow-md py-3 mt-6
                         rounded-b-lg text-xl text-stone-100 tracking-wider bg-stone-500
                          hover:font-extrabold hover:bg-stone-300 hover:text-stone-700
                          focus:text-stone-600 font-bold focus:shadow visited:shadow-xl
                           transition-all"
                        // onClick={() => {
                        //     handleLogging()
                        // }}
                    >

                        {/*{!logging || error || errMsg !== "" ? 'Login' : circleSpinner}*/}
                        {logging ? circleSpinner : <span>Login</span>}

                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;