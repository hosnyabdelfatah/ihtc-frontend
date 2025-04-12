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
    const refresh = useRefreshToken();
    const {auth} = useAuth();
    // console.log(auth.token)

    const verifyRefreshToken = async () => {
        try {
            await refresh();
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (effectRan.current === true) {
            !auth?.name ? verifyRefreshToken() : setIsLoading(false);
            !auth.name && console.log("No Auth Name")
        }

        return () => {
            effectRan.current = true;
        }
    }, []);
    // useEffect(() => {
    //     !auth?.name ? verifyRefreshToken() : setIsLoading(false);
    // }, [])
    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`)
    //     console.log(`at: ${JSON.stringify(auth)}`)
    // }, [isLoading])

    return (
        <section className="persist-login w-full h-screen ">
            {isLoading ? <p className="w-full h-svh flex justify-center items-center ">Loading...</p> : <Outlet/>}
        </section>
    );
};

export default PersistLogin;
