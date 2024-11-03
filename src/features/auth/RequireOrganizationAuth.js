import {useLocation, Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentToken} from "./authSlice";
import {getCurrentUser} from "../currentUserSlice";

const RequireOrganizationAuth = () => {
    const token = useSelector(selectCurrentToken)
    const data = useSelector(getCurrentUser);
    const organizationData = data?.currentUser

    const location = useLocation()

    return (
        organizationData?.name
            ? <Outlet/>
            : <Navigate to="/login" state={{from: location}} replace/>
    )

};

export default RequireOrganizationAuth;