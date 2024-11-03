import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";

const PersistLogin = () => {
  const effectRan = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    if(effectRan.current === true){
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {;
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

  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`);
  //   console.log(`at: ${JSON.stringify(auth?.token)}`);
  // }, [isLoading]);

  return (
    <section className="persist-login">
        {isLoading ? <p>Loading...</p> : <Outlet />}
    </section>
  );
};

export default PersistLogin;
