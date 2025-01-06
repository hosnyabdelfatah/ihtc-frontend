import {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import {selectCurrentUserState} from "../features/userAsSlice";
import {getCurrentUser} from "../features/currentUserSlice";
import Logo from '../assets/images/logo-transparent.webp';


const Home = () => {
    const navigate = useNavigate();

    const {auth} = useAuth();
    const {userState} = useSelector(selectCurrentUserState);
    const currentUser = useSelector(getCurrentUser);

    const [name, setName] = useState()

    useEffect(() => {
        if (userState === 'user') {
            setName(auth?.firstName + " " + auth?.lastName);
        } else if (userState === 'doctor') {
            setName(auth?.firstName + " " + auth?.lastName);
        } else if (userState === 'organization') {
            setName(auth?.name);
        }
        // console.log(name)
    }, []);

    return (
        <section className="home w-full mx-auto">
            <div className="w-8/12 text-stone-400  mx-auto mt-12 text-center ">
                <div className="mb-6"><img className="mx-auto" src={Logo} alt="logo"/></div>
                {Object.keys(auth).length !== 0
                    ? <div className=" flex flex-col justify-center items-center">
                        <h1 className="mb-3 font-semibold">Welcome <span
                            className="text-2xl text-stone-500 font-bold">
                            {String(name).toUpperCase()}
                        </span>
                        </h1>
                        <span className="font-semibold">
                            Go to your
                            <Link to={`/${userState}`}
                                  className="text-lg text-violet-700 font-semibold underline uppercase mx-3"
                            >
                                {userState}
                            </Link>
                             page
                        </span>

                    </div>
                    : <>
                        <h1 className=" mb-5text-stone-600 font-bold">Welcome In IHTC Community</h1>
                        <div>
                            <Link to="/login"
                                  className="inline w-8/12 my-6 mx-auto text-blue-700
                              font-semibold underline block">
                                Enter
                            </Link>
                        </div>
                    </>
                }

            </div>


        </section>
    )
}
export default Home;