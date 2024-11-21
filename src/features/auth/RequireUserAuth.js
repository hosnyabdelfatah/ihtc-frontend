import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireDoctorAuth = () => {
    const {auth} = useAuth();
    const location = useLocation()
    // if (auth) console.log(JSON.stringify(auth))

    return (
        auth?.firstName
            ? <Outlet/>
            : <Navigate to="/login" state={{from: location}} replace/>
    );
};

export default RequireDoctorAuth;