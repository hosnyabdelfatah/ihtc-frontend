import './App.css';
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useFetchOrganizationsQuery} from '../store';
import {selectCurrentUserState, changeUserState} from "../features/userAsSlice";
import {Routes, Route, useNavigate} from "react-router-dom";
import OrganizationLayout from "./organization/OrganizationLayout";
import axios from 'axios';
import Login from './registeration/Login'
import Home from './Home';
import Welcome from "./Welcome";
import Layout from "./Layout";
import PersistLogin from '../components/registeration/PersistLogin';
import Organization from "./organization/Organization";
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
import ForgetPassword from "./registeration/ForgetPassword";
import CheckEmail from "./registeration/CheckEmail";
import ResetPassword from "./registeration/ResetPassword";
import UpdatePassword from "./registeration/UpdatePassword";
import UnderConstruction from "./UnderConstruction";
import OrganizationsHome from "./User/OrganizationsHome";
import OrganizationInfo from "./doctor/OrganizationInfo";
import MessagesBox from "./doctor/MessagesBox";
import MessagesBoxLayout from "./doctor/MessagesBoxLayout";
import MessageDetails from "./doctor/MessageDetails";
import MessagesSent from "./doctor/MessagesSent";
import MessagesIn from "./doctor/MessagesIn";
import CampaignsSent from "./organization/CampaignsSent";
import CampaignsBoxLayout from "./organization/CampaignBoxLayout";
import OrganizationMessagesIn from "./organization/OrganizationMessagesIn";
import CampaignDetails from "./organization/CampaignDetails";
import BASE_URL from "../app/apis/baseUrl";
import useAuth from "../hooks/useAuth";
import UpdateDoctor from "./doctor/UpdateDoctor";
import UpdateOrganization from "./organization/UpdateOrganization";
import UpdateBannerLogo from "./organization/UpdateBannerLogo";
import UpdateDoctorImage from "./doctor/UpdateDoctorImage";
import UpdateUserData from "./User/UpdateUserData";
import UpdateUserImage from "./User/UpdateUserImage";
import ResetPasswordSuccess from "./registeration/ResetPasswordSuccess";

// import InsertDoctors from "./admins/dashboard/InsertDoctors";


function App() {
    const dispatch = useDispatch();

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

    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    };

    useEffect(() => {
        const userType = getCookie("useAs")
        if (!getCookie("useAs") || getCookie("useAs") === null || getCookie("useAs") === "null") {
            setCookie("useAs", "user", 1000);
        }

        dispatch(changeUserState(userType ? userType : "user"));
        // console.log(document.cookie)
        // console.log(userType)
    }, []);


    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/login" element={<Login/>}/>
                <Route path="organizations" element={<OrganizationsList/>}/>

                <Route path="organization-signup" element={<OrganizationSignup/>}/>
                <Route path="doctor-signup" element={<DoctorSignup/>}/>
                <Route path="user-signup" element={<UserSignup/>}/>
                <Route path="forget-password" element={<ForgetPassword/>}/>
                <Route path="check-email" element={<CheckEmail/>}/>
                <Route path="reset-password" element={<ResetPassword/>}/>
                <Route path="update-password" element={<UpdatePassword/>}/>
                <Route path="/reset-password-success" element={<ResetPasswordSuccess/>}/>
                <Route path="under-construction" element={<UnderConstruction/>}/>


                {/*<Route path="insert-doctors" element={<InsertDoctors/>}/>*/}
            </Route>

            {/*Organization Routes*/}
            <Route element={<PersistLogin/>}>
                <Route index element={<Home/>}/>
                <Route path="welcome" element={<Welcome/>}/>
                <Route element={<RequireOrganizationAuth/>}>
                    <Route element={<OrganizationLayout/>}>
                        <Route path="org" element={<Organization/>}/>
                        <Route path="/organization" element={<OrganizationPage/>}/>
                        <Route path="community" element={<OrganizationsList/>}/>
                        <Route path="/update-organization" element={<UpdateOrganization/>}/>
                        <Route path="/update-banner-logo" element={<UpdateBannerLogo/>}/>
                        <Route path="card-details/:id" element={<OrganizationCardDetails/>}
                        />
                        <Route path="campaign" element={<Campaigns/>}/>
                        <Route element={<CampaignsBoxLayout/>}>
                            <Route
                                path="campaign-box/:organizationId" element={<CampaignsSent/>}
                            />
                            <Route path="campaigns-sent/:organizationId" element={<CampaignsSent/>}/>
                            <Route path="organization-messages-in" element={<OrganizationMessagesIn/>}
                            />

                            <Route path="/campaign-details/:campaignId"
                                   element={<CampaignDetails/>}/>

                            {/*<Route path="/message-details/:messageId" element={<MessageDetails/>}/>*/}
                        </Route>

                    </Route>
                </Route>

                <Route element={<RequireDoctorAuth/>}>
                    <Route element={<DoctorLayout/>}>
                        <Route path="doctor" element={<DoctorPage/>}/>
                        <Route path="doctors" element={<DoctorList/>}/>
                        <Route path="doctor-messages" element={<DoctorMessage/>}/>
                        {/*<Route path="messages-box" element={<MessagesBox/>}/>*/}
                        <Route path="/doctor-info/:id" element={<DoctorInfo/>}/>
                        <Route path="update-doctor" element={<UpdateDoctor/>}/>
                        <Route path="/update-profile-image" element={<UpdateDoctorImage/>}/>
                        <Route element={<MessagesBoxLayout/>}>
                            <Route path="messages-sent" element={<MessagesSent/>}/>
                            <Route path="messages-in" element={<MessagesIn/>}/>
                            <Route path="/message-details/:messageId" element={<MessageDetails/>}/>
                        </Route>
                    </Route>
                </Route>

                <Route element={<RequireUserAuth/>}>
                    <Route element={<UserLayout/>}>
                        <Route path="user" element={<UserPage/>}/>
                        <Route path="services" element={<UserServices/>}/>
                        <Route path="organizations-home" element={<OrganizationsHome/>}/>
                        <Route path="/organization-info/:id" element={<OrganizationInfo/>}/>
                        <Route path="/update-user-data" element={<UpdateUserData/>}/>
                        <Route path="/update-user-image" element={<UpdateUserImage/>}/>
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
