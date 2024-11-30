import './App.css';
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useFetchOrganizationsQuery} from '../store';
import {selectCurrentUserState} from "../features/userAsSlice";
import {Routes, Route} from "react-router-dom";
import OrganizationLayout from "./organization/OrganizationLayout";
import Login from './registeration/Login'
import Home from './Home';
import Welcome from "./Welcome";
import Layout from "./Layout";
import PersistLogin from '../features/auth/PersistLogin';
import OrganizationPage from "./organization/OrganizationPage";
import OrganizationsList from "./organization/OrganizationsList";
import RequireOrganizationAuth from "../features/auth/RequireOrganizationAuth";
import OrganizationCardDetails from "./organization/OrganizationCardDetails";
import Campaigns from "./organization/Campaigns";
import OrganizationSignup from "./registeration/OrganizationSignup";
import DoctorSignup from "./registeration/DoctorSignup";
import DoctorPage from "./doctor/DoctorPage";
import DoctorLayout from "./doctor/DoctorLayout";
import DoctorList from './doctor/DoctorsList';
import RequireDoctorAuth from "../features/auth/RequireDoctorAuth";
import UserSignup from "./registeration/UserSignup";
import RequireUserAuth from "../features/auth/RequireUserAuth";
import UserPage from "./User/UserPage";
import UserLayout from "./User/UserLayout";
import UserServices from "./User/UserServices";
import DoctorMessage from "./doctor/DoctorMessage";
import DoctorInfo from "./doctor/DoctorInfo";

// import InsertDoctors from "./admins/dashboard/InsertDoctors";


function App() {
    // const {userState} = useSelector(selectCurrentUserState)
    function getCookie(name) {
        const cookieArr = document.cookie.split(";");
        for (let cookie of cookieArr) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + "=")) {
                return decodeURIComponent(cookie.substring(name.length + 1));
            }
        }
        return null;
    }

    useEffect(() => {
        const userType = getCookie("organizationJwt")
        console.log(document.cookie)
    }, [])
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="organizations" element={<OrganizationsList/>}/>
                <Route path="organization-signup" element={<OrganizationSignup/>}/>
                <Route path="doctor-signup" element={<DoctorSignup/>}/>
                <Route path="user-signup" element={<UserSignup/>}/>

                <Route element={<PersistLogin/>}>
                    <Route path="home" element={<Home/>}/>
                    <Route path="welcome" element={<Welcome/>}/>
                </Route>
                {/*<Route path="insert-doctors" element={<InsertDoctors/>}/>*/}

            </Route>

            {/*Organization Routes*/}

            <Route element={<RequireOrganizationAuth/>}>
                <Route element={<OrganizationLayout/>}>
                    <Route path="organization" element={<OrganizationPage/>}/>
                    <Route path="community" element={<OrganizationsList/>}/>
                    <Route path="card-details/:id" element={<OrganizationCardDetails/>}
                    />
                    <Route path="campaign" element={<Campaigns/>}/>
                </Route>
            </Route>

            <Route element={<RequireDoctorAuth/>}>
                <Route element={<DoctorLayout/>}>
                    <Route path="doctor" element={<DoctorPage/>}/>
                    <Route path="doctors" element={<DoctorList/>}/>
                    <Route path="doctor-campaigns" element={<DoctorMessage/>}/>
                    <Route path="/doctor-info/:id" element={<DoctorInfo/>}/>

                </Route>
            </Route>

            <Route element={<RequireUserAuth/>}>
                <Route element={<UserLayout/>}>
                    <Route path="user" element={<UserPage/>}/>
                    <Route path="services" element={<UserServices/>}/>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
