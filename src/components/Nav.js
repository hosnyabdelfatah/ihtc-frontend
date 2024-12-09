import Logo from '../assets/images/logo-transparent.webp';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import useAuth from "../hooks/useAuth";
import {selectCurrentUserState} from "../features/userAsSlice";

const Nav = () => {
    const {userState} = useSelector(selectCurrentUserState)
    const {auth} = useAuth();
    console.log(auth)

    return (
        <div className="flex flex-row justify-center">
            <Link to={auth.id
                ? userState === "user"
                    ? "/user"
                    : userState === "doctor"
                        ? "/doctor"
                        : "/organization"
                : "/"}><img src={Logo} alt="logo"/></Link>
        </div>
    );
};

export default Nav;