import {Link} from "react-router-dom"
import {useSelector} from "react-redux";
import {selectCurrentUser, selectCurrentToken} from "../features/auth/authSlice";
import {selectCurrentUserState} from "../features/userAsSlice";
import {getCurrentUser} from "../features/currentUserSlice";

const Welcome = () => {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const currentUser = useSelector(getCurrentUser)

    const userState = useSelector(selectCurrentUserState)

    const welcome = currentUser ? `Welcome  ${currentUser.currentUser?.name?.toUpperCase()} you use the site as  ${userState?.userState.toUpperCase()}` : `Welcome! ${userState.userState}`;
    const tokenAbbr = token


    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/doctors">Go to doctors</Link></p>
        </section>
    )

    return content
};

export default Welcome;