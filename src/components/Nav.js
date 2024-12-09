import Logo from '../assets/images/logo-transparent.webp';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import useAuth from "../hooks/useAuth";
import {selectCurrentUserState} from "../features/userAsSlice";
import {IoHome} from "react-icons/io5";

const Nav = () => {
    const {userState} = useSelector(selectCurrentUserState)
    const {auth} = useAuth();
    console.log(auth)

    return (
        <div className="flex flex-row justify-center items-center">
            <img src={Logo} alt="logo"/>
            <Link to={auth.id
                ? userState === "user"
                    ? "/user"
                    : userState === "doctor"
                        ? "/doctor"
                        : "/organization"
                : "/"}>
                <IoHome className={`${auth.id
                    ? userState === "user" ? "text-blue-700"
                        : userState === "doctor" ? "text-lime-400" : "text-amber-400" : "text-blue-900"} text-3xl`}/>
            </Link>

        </div>
    );
};

export default Nav;