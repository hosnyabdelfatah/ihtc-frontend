import {useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {changeUserState, selectCurrentUserState} from "../features/userAsSlice";
import {setCurrentUser} from "../features/currentUserSlice";
import {selectCurrentUser} from "../features/auth/authSlice";
import useAuth from "./useAuth";
import {useAlert} from "../context/AlertProvider";
import axios from "../app/apis/axios";
import BASE_URL from "../app/apis/baseUrl";


function getCookie(name) {
    const cookieArr = document.cookie.split(";");
    for (let cookie of cookieArr) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + "=")) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}


const useRefreshToken = () => {
    const effectRan = useRef(false);
    const {setAuth} = useAuth();
    const dispatch = useDispatch();

    const {showAlert, hideAlert} = useAlert();
    const handleProcess = async (message, type) => {
        showAlert(message, type);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        hideAlert();
    }

    dispatch(changeUserState(getCookie("useAs")))
    const {userState} = useSelector(selectCurrentUserState);
    const currentUser = useSelector(selectCurrentUser);

    const userType = getCookie("useAs")
    // console.log(userState)
    let currentCookie;
    let currentToken;
    if (userType === 'user') {
        currentCookie = getCookie("userJwt");
        currentToken = getCookie("userToken");
    } else if (userType === 'doctor') {
        currentCookie = getCookie("doctorJwt");
        currentToken = getCookie("doctorToken");
        // getDoctorRefresh();

    } else if (userType === 'organization') {
        currentCookie = getCookie("organizationJwt");
        currentToken = getCookie("orgToken");
    }

    const refresh = async () => {
        // const refreshToken = localStorage.getItem('token')
        // refreshToken !== '' || refreshToken !== undefined && console.log(refreshToken)
        try {
            const response = await axios.get(`${BASE_URL}/${userType}s/${userType}Refresh`, {
                headers: {
                    'Content-type': 'application/json'
                },
                withCredentials: true,
                withXSRFToken: true
            });
            // console.log(response)
            if (response?.data || Object.keys(response?.data?.data) > 0) {
                const result = await response?.data?.data;
                console.log(response)
                console.log('Refresh result is: ', result)
                setAuth({...result});
                dispatch(setCurrentUser({...result}));
                return {...result};
            } else {
                return null;
            }

        } catch (err) {
            // console.log(err)
            await handleProcess(`Welcome ${err.response.data}.Click Enter to login`);
        }
    };

    // useEffect(() => {
    //     if (effectRan.current === true) {
    //         refresh();
    //     }
    //     return () => {
    //         effectRan.current = true
    //     }
    // }, []);

    return refresh;
};

export default useRefreshToken;
