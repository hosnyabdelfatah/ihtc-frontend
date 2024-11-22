import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {loginDoctor} from "../../features/doctorSlice";
import {loginUser} from "../../features/userSlice";

import {Link, useNavigate, useLocation} from 'react-router-dom';
import {setCredentials, setError, selectCurrentError} from "../../features/auth/authSlice";
import {changeUserState, setCurrentUser, selectCurrentToken, useFetchUserUseStatusQuery} from "../../store";
import {selectCurrentUserState} from "../../features/userAsSlice";
import {useOrganizationLoginMutation} from "../../store";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import BASE_URL from "../../app/apis/baseUrl";

const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
};


const Login = ({}) => {
    const {auth, setAuth} = useAuth();

    const [login, {isLoading, isSuccess, isError, data, error}] = useOrganizationLoginMutation()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // console.log()
    const {userState} = useSelector(selectCurrentUserState)
    // const data = useSelector(selectCurrentError);

    const signUp = userState === 'organization'
        ? 'organization-signup'
        : userState === 'doctor'
            ? 'doctor-signup'
            : 'user-signup';

    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [logging, setLogging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [validateErrMsg, setValidateErrMsg] = useState('');

    const addError = [];


    useEffect(() => {
        if (auth.user) {
            console.log(auth);
            setIsLoggedIn(true);
        }
    }, [])
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, password])

    const handleChaneUserAs = (value) => {
        setCookie("useAs", value, 1000);
        console.log(document.cookie)
    }

    const handleLogging = () => {
        setLogging(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user === '' || password === '') {
            setErrMsg('User and password is require');
            setLogging(false)
            return
        }
        try {
            if (userState === 'organization') {
                const data = await login({user, password}).unwrap()
                // console.log(data)
                const userData = data?.organization
                // console.log(userData)
                const {email, name, tokens} = userData
                const token = data?.token
                dispatch(setCredentials({...userData, token}))
                setAuth({...userData})
                // console.log(auth)
                dispatch(setCurrentUser({...userData}))

                setUser('')
                setPassword('')
                navigate('/organization')
            } else if (userState === 'doctor') {
                dispatch(loginDoctor({user, password})).then((res) => {
                    console.log(res.payload)
                    if (res.payload !== undefined) {
                        setAuth({...res.payload})
                        setUser("");
                        setPassword("");
                        navigate("/doctor");
                    } else {
                        console.log(res.payload)
                        if (res.error.message === "Request failed with status code 401") {
                            setLoginError("Access Denied! Invalid username or password");
                        } else {
                            setLoginError(res.error.message);
                        }
                    }
                });
            } else if (userState === 'user') {
                dispatch(loginUser({user, password})).then((res) => {
                    console.log(res.payload)
                    if (res.payload !== undefined) {
                        setAuth({...res.payload})
                        setUser("");
                        setPassword("");
                        navigate("/user");
                    } else {
                        console.log(res)
                        if (res?.error?.message === "Request failed with status code 401") {
                            setLoginError("Access Denied! Invalid username or password");
                        } else {
                            setLoginError(res?.error?.message);
                        }
                    }
                });
            }

        } catch (err) {
            if (err?.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err?.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
                console.log(err)
            }
            errRef.current.focus()
        }
    }

    const handleUserInput = (e) => setUser(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)
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

    return (
        <div className="login mt-12 sm:w-[60%] md:w-[40%] sm:mt-4  mx-auto rounded">
            <p ref={errRef}
               className={`${errMsg ? "errmsg block" : "hidden"} bg-red-700 text-stone-100 font-bold rounded text-center py-1`}
               aria-live="assertive">{errMsg}</p>
            <h2 className="mx-auto  sm: text-xl font-semibold">
                Use our site as
                <span
                    className="capitalize text-red-700 font-extrabold ml-3">{userState}
            </span>
            </h2>
            <div className=" shadow-lg px-4 py-6 rounded-lg">
                <div
                    className="buttons w-ful mx-auto font-bold my-4 w-f flex flex-row justify-between rounded-t-lg overflow-hidden "
                >
                    <button
                        className={` user-login w-[33%] bg-stone-500  py-3 rounded-tl-lg text-stone-100  border-2 shadow-sm text-base`}
                        onClick={() => {
                            dispatch(changeUserState("user"))
                            handleChaneUserAs("user")
                        }}
                    >
                        User
                    </button>
                    <button
                        className={`doctor-login  w-[33%]  bg-stone-500  py-3 border-2	shadow-sm  text-base text-stone-100`}
                        onClick={() => {
                            dispatch(changeUserState("doctor"))
                            handleChaneUserAs("doctor")
                        }}
                    >
                        Doctor
                    </button>
                    <button
                        className={` organization-login  bg-stone-500 w-[33%]  py-3 rounded-tr-lg shadow-sm border-2  text-base shadow-sm  text-stone-100`}
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
                        <input type="text" id="user" name="email" value={user} disabled={logging}
                               ref={userRef} required={true}
                               placeholder={`${userState === "doctor" ? "email or unique Id" : "email"}`}
                               onChange={handleUserInput}
                               className={`border-stone-300 block w-8/12 px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border focus:border-blue-400 transition duration-150 ease-in-out text-lg sm:leading-5`}
                        />
                    </div>
                    <div className="password  flex flex-row justify-between p-3  items-baseline ">
                        <label htmlFor="password" className="w-2/12 text-left">Password</label>
                        <input type="password" id="password" name="password" required={true}
                               disabled={logging}
                               value={password}
                               onChange={handlePasswordInput}
                               className="block w-8/12 px-3 py-2 border border-stone-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border focus:border-blue-400
                                transition duration-150 ease-in-out text-lg sm:leading-5"
                        />
                    </div>

                    <button
                        className="w-full  border-2  shadow-md py-3 mt-6
                         rounded-b-lg text-xl text-stone-100 tracking-wider bg-stone-500
                          hover:font-extrabold hover:bg-stone-300 hover:text-stone-700
                          focus:text-stone-600 font-bold focus:shadow visited:shadow-xl
                           transition-all"
                        onClick={() => {
                            handleLogging()
                        }}
                    >

                        {error ? 'Login' : logging ? circleSpinner : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;