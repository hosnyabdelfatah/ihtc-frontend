import Logo from '../assets/images/logo-transparent.webp';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import useAuth from "../hooks/useAuth";
import {selectCurrentUserState} from "../features/userAsSlice";
import {IoHome} from "react-icons/io5";


const Nav = () => {
    const {userState} = useSelector(selectCurrentUserState)
    const {auth} = useAuth();
    // console.log(auth)
    const [name, setName] = useState()

    useEffect(() => {
        // console.log(userState)
        // console.log(auth);
        // console.log(`/${userState}`);
        if (userState === 'user') {
            setName(auth?.name);
        } else if (userState === 'doctor') {
            setName(auth?.firstName + " " + auth?.lastName);
        } else if (userState === 'organization') {
            setName(auth?.name);
        }
        // console.log(name)
    }, []);

    return (
        <div className="flex flex-row justify-center items-center">
            <img src={Logo} alt="logo"/>
            <p>Welcome {auth.token && name} in IHTC comunity</p>
        </div>
    );
};

export default Nav;