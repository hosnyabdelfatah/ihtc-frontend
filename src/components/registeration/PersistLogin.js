import {useState, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import Skeleton from "../Skeleton";
import Spinner from "../Spinner";
import axios from "../../app/apis/axios";
import BASE_URL from "../../app/apis/baseUrl";
import {setCurrentUser} from "../../features/currentUserSlice";

const PersistLogin = () => {
    const dispatch = useDispatch();
    const effectRan = useRef(false);

    const [isLoading, setIsLoading] = useState(true);
    // const refresh = useRefreshToken();
    const {auth, setAuth} = useAuth();

    useEffect(() => {
        const refresh = async () => {
            const response = await axios.get(`${BASE_URL}/${userType}s/${userType}Refresh`
                , {
                    withCredentials: true,
                    // withXSRFToken: true
                }
            );
            console.log(response)
            const result = await response?.data?.data;
            const token = await response?.data?.token;

            setAuth(prev => {
                console.log(JSON.stringify(prev))
                console.log(response?.data)
                return {...prev, userType: response?.data?.data}
            })
            // dispatch(setCurrentUser({...result}));
            dispatch(setCurrentUser(prev => {
                return {...prev, ...result, token}
            }))
            return response?.data?.data;
        };
        const verifyRefreshToken = async () => {
            try {
                await refresh();
                console.log(auth)
            } catch (err) {
                console.log(err);
                // setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        }
        // if (effectRan.current === true) {
        //
        //     console.log('Auth is: ', auth)
        //     console.log('Auth Hosny is: ')
        //     !auth?.token ? verifyRefreshToken() : setIsLoading(false);
        // }

        // return () => {
        //     effectRan.current = true;
        // }
    }, []);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`at: ${JSON.stringify(auth)}`)
    }, [isLoading])

    return (
        <section className="persist-login w-full h-screen ">
            {isLoading ? <p className="w-full h-svh flex justify-center items-center ">Loading...</p> : <Outlet/>}
        </section>
    );
};

export default PersistLogin;
