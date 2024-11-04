import {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {setCredentials} from "../../features/auth/authSlice";
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

    const [login, {isLoading}] = useOrganizationLoginMutation()
    const dispatch = useDispatch();

    // console.log(data)
    const {userState} = useSelector(selectCurrentUserState)

    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (userState === 'organization') {
                const data = await login({user, password}).unwrap()
                const userData = data.organization
                console.log(userData)
                const {email, name, tokens} = userData
                const token = data.token
                dispatch(setCredentials({...userData, token}))
                setAuth({...userData})
                console.log(auth)
                dispatch(setCurrentUser({...userData}))

                setUser('')
                setPassword('')
                navigate('/organization')
            } else {
                console.log(`No server for ${userState} yet`)
            }

        } catch (err) {
            if (!err?.originalStatus) {
                console.log(err)
                setErrMsg('No Server Response');
            } else if (err?.response?.status === 400) {
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

    return (
        <div className="home mt-12 w-6/12 mx-auto rounded">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h2 className="my-8 text-xl font-semibold">
                Use our site as <span
                className="capitalize text-red-700 font-extrabold">{userState}</span>
            </h2>
            <div className=" shadow-lg px-4 py-6 rounded-lg">
                <div
                    className="buttons w-ful mx-auto font-bold my-4 w-f flex flex-row justify-between rounded-t-lg overflow-hidden "
                >
                    <button
                        className={`${userState !== "user" ? "opacity-75" : "opacity-100"} user-login w-[33%] bg-blue-700  py-3 rounded-tl-lg text-stone-100  border-2    shadow-sm text-base`}
                        onClick={() => {
                            dispatch(changeUserState("user"))
                            handleChaneUserAs("user")
                        }}
                    >
                        User
                    </button>
                    <button
                        className={`${userState !== "doctor" ? "opacity-75" : "opacity-100"} doctor-login  w-[33%]  bg-lime-500  py-3 border-2	shadow-sm  text-base text-Indigo-400`}
                        onClick={() => {
                            dispatch(changeUserState("doctor"))
                            handleChaneUserAs("doctor")
                        }}
                    >
                        Doctor
                    </button>
                    <button
                        className={`${userState !== "organization" ? "opacity-75" : "opacity-100"} organization-login  bg-amber-500 w-[33%]  py-3 rounded-tr-lg shadow-sm border-2  text-base shadow-sm  text-Violet-700`}
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
                        <Link to={`${selectCurrentUserState}s/signup`}>register</Link>
                    </span>
                </p>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="user flex flex-row items-baseline p-3 justify-between">
                        <label htmlFor="user"
                               className="w-2/12 text-left">{userState === "doctor" ? "User" : " Email"} </label>
                        <input type="text" id="user" name="email" value={user}
                               ref={userRef} required
                               placeholder={`${userState === "doctor" ? "email or unique Id" : "email"}`}
                               onChange={handleUserInput}
                               className={`${userState === "user" ? "border-blue-300"
                                   : userState === "doctor" ? "border-lime-400"
                                       : "border-yellow-400"} block w-8/12 px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-2 focus:border-green-400 transition duration-150 ease-in-out text-lg sm:leading-5`}
                        />
                    </div>
                    <div className="password  flex flex-row justify-between p-3  items-baseline ">
                        <label htmlFor="password" className="w-2/12 text-left">Password</label>
                        <input type="password" id="password" name="password" required
                               value={password}
                               onChange={handlePasswordInput}
                               className={`${userState === "user" ? "border-blue-300"
                                   : userState === "doctor" ? "border-lime-400"
                                       : "border-yellow-400"} block w-8/12 px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-2 focus:border-green-400 transition duration-150 ease-in-out text-lg sm:leading-5`}
                        />
                    </div>

                    <button
                        className={`${userState === "user" ? "bg-blue-700 text-stone-100"
                            : userState === "doctor" ? "bg-lime-500"
                                : "bg-amber-500"} w-full  border-2 border-amber-200 shadow-md py-4 mt-6 rounded-b-lg text-xl text-blue-900 hover:font-extrabold hover:bg-gray-200 focus:text-blue-600 font-semibold focus:shadow visited:shadow-xl`}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;