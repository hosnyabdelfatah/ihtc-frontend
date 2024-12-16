import {useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {changeUserState, selectCurrentUserState} from "../features/userAsSlice";
import {setCurrentUser} from "../features/currentUserSlice";
import {selectCurrentUser} from "../features/auth/authSlice";
import {setCredentials} from "../features/auth/authSlice";
import useAuth from "./useAuth";
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
    const {auth, setAuth} = useAuth();
    const dispatch = useDispatch();

    dispatch(changeUserState(getCookie("useAs")))
    const {userState} = useSelector(selectCurrentUserState);
    const currentUser = useSelector(selectCurrentUser);

    const userType = getCookie("useAs")
    // console.log(userState)
    let currentCookie;
    if (userType === 'user') {
        currentCookie = getCookie("userJwt");
    } else if (userType === 'doctor') {
        currentCookie = getCookie("doctorJwt");
        // getDoctorRefresh();

    } else if (userType === 'organization') {
        currentCookie = getCookie("organizationJwt");
    }

    const refresh = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/${userType}s/${userType}Refresh`, {
                headers: {'Content-type': 'application/json'},
                withCredentials: true,
                withXSRFToken: true
            });
            // console.log(response)

            const result = await response?.data?.data;
            console.log(result)

            setAuth({...result});
            dispatch(setCurrentUser({...result}));
            return {...result};
        } catch (err) {
            console.log(err)
            console.log(err.response.data.message)
        }
    };

    useEffect(() => {
        if (effectRan.current === true) {
            refresh();
        }
        return () => {
            effectRan.current = true
        }
    }, []);

    return refresh;
};

export default useRefreshToken;
