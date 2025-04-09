import {useState, useEffect, useRef} from "react";
import {Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import Skeleton from "../Skeleton";
import Spinner from "../Spinner";

const PersistLogin = () => {
    const effectRan = useRef(false);

    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() => {
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

        return () => {
            effectRan.current = true;
        }
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
