import {useState, useEffect, useRef} from "react";
import {Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import Skeleton from "../Skeleton";
import Spinner from "../Spinner";

const PersistLogin = () => {
    const effectRan = useRef(false);

    const [isLoading, setIsLoading] = useState(false);
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() => {
        if (effectRan.current === true) {
            const verifyRefreshToken = async () => {
                setIsLoading(true)

                try {
                    await refresh();
                } catch (err) {
                    console.log(err);
                    setIsLoading(false);
                } finally {
                    setIsLoading(false);
                }
            }
            !auth?.token ? verifyRefreshToken() : setIsLoading(false);
        }

        return () => {
            effectRan.current = true;
        }
    }, []);


    return (
        <section className="persist-login w-full h-screen ">
            {isLoading ? <p className="w-full h-svh flex justify-center items-center ">Loading...</p> : <Outlet/>}
        </section>
    );
};

export default PersistLogin;
