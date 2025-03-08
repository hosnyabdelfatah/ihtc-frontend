import {useState, useLayoutEffect} from "react";
import {useLocation, Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentToken} from "./authSlice";
import {getCurrentUser} from "../currentUserSlice";
import useAuth from '../../hooks/useAuth';

const RequireOrganizationAuth = () => {
    const {auth} = useAuth();
    const token = useSelector(selectCurrentToken)
    const location = useLocation();
    console.log("Last Location is: " + location.state?.from?.pathname)
    const from = location.state?.from?.pathname || "/";

    return (
        auth?.name
            ? <Outlet/>
            : <Navigate to="/login" state={{from: from}} replace/>
    )

};

export default RequireOrganizationAuth;