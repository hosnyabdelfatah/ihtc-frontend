import {useSelector} from "react-redux";
import {getCurrentUser} from "../features/currentUserSlice";
import InfinitySoftware from '../images/infinity-software.webp'
import {Link} from "react-router-dom";

const Footer = () => {
    const currentUser = useSelector(getCurrentUser);

    return (
        <div className="flex flex-row justify-center items-center my-4">
            <div className="uppercase text-indigo-500 text-[10px]  font-semibold mr-4">Powered by infinity software
            </div>
            <Link to="">
                <img
                    src={InfinitySoftware}
                    className="w-[30px] h-[30px]"
                    alt="Infinity Software Egypt"
                />
            </Link>
        </div>
    );
};

export default Footer;