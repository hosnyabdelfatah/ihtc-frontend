import {useState, useLayoutEffect} from "react";
import {useLocation, Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentToken} from "./authSlice";
import {getCurrentUser} from "../currentUserSlice";
import useAuth from '../../hooks/useAuth';

const RequireOrganizationAuth = () => {
    const {auth} = useAuth();
    const token = useSelector(selectCurrentToken)

    return (
        auth?.name
            ? <Outlet/>
            : <Navigate to="/login" state={{from: location}} replace/>
    )

};

export default RequireOrganizationAuth;