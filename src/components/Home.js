import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import {selectCurrentToken, selectCurrentUser} from "../features/auth/authSlice";


import {getCurrentUser} from "../features/currentUserSlice";

const Home = () => {
    const currentUser = useSelector(getCurrentUser)
    // console.log(currentUser.currentUser)

    return (
        <section className="welcome">
            <div className="text  mx-auto w-8/12 text-center">

                <h1>Welcome {currentUser?.currentUser?.name.toUpperCase()}</h1>

            </div>

            <Link to="/welcome" className=" w-8/12 my-6 mx-auto underline text-blue-700 block">
                Welcome</Link>

        </section>
    )
}
export default Home;