import {useLocation, Navigate, Outlet} from "react-router-dom";

const RequireAuth = ({allowedRoles}) => {
    const {auth} = useAuth()
    const location = useLocation()
    // console.log(auth)
    return (
        <></>
    );
};

export default RequireAuth;
