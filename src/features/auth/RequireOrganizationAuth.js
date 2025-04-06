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
    const {pathname} = useLocation();
    console.log(location)
    console.log(auth)
    // console.log("Last Location is: " + location.pathname)
    const from = location.state?.from?.pathname || "/";

    return (
        auth?.name
            ? <Outlet/>
            : <Navigate to={pathname} state={{from: pathname}} replace/>
    )

};

export default RequireOrganizationAuth;