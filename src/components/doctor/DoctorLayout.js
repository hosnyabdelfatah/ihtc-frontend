import {Outlet} from "react-router-dom";
import DoctorNav from "./DoctorNav";


function DoctorLayout() {
    return (
        <>
            <DoctorNav/>
            <Outlet/>
        </>
    );
}

export default DoctorLayout;