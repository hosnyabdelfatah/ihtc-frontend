import {useSelector, useDispatch} from "react-redux";
import {selectCurrentUserState} from "../features/userAsSlice";
import useAuth from "./useAuth";
import axios from "../app/apis/axios";
import BASE_URL from "../app/apis/baseUrl";
import {useEffect} from "react";


const useRefreshToken = () => {
    const {setAuth} = useAuth();
    const dispatch = useDispatch();
    const {userState} = useSelector(selectCurrentUserState)

    useEffect(() => {
        let userState = document.cookie
        console.log(userState)
    }, [])

    const refresh = async () => {
        const response = await axios.get(`${BASE_URL}${userState}s/refresh`, {

            credentials: true,
            headers: {'Content-type': 'application/json'},
            withCredentials: true,
            withXSRFToken: true
        });

        console.log(`${BASE_URL}organizations/refresh`)
        console.log(result)

        const result = response.data.foundUser;

        const {name, email, token, photo} = result;


        setAuth({name, email, token, photo});
        return {name, email, token, photo};
    };

    return refresh;
};

export default useRefreshToken;
