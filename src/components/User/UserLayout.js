import {Outlet} from "react-router-dom";
import UserNav from "./UserNav";


function UserLayout() {
    return (
        <>
            <UserNav/>
            <Outlet/>
        </>
    );
}

export default UserLayout;