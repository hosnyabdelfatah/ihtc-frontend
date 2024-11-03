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


function App() {
    // const {userState} = useSelector(selectCurrentUserState)

    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route element={<PersistLogin/>}>

                    <Route path="home" element={<Home/>}/>
                    <Route path="welcome" element={<Welcome/>}/>


                </Route>

            </Route>
            {/*Organization Routes*/}
            <Route element={<RequireOrganizationAuth/>}>
                <Route element={<OrganizationLayout/>}>
                    <Route path="organization" element={<OrganizationPage/>}/>
                    <Route path="community" element={<OrganizationsList/>}/>
                    <Route path="card-details/:email" element={<OrganizationCardDetails/>}
                    />
                    <Route path="campaign" element={<Campaigns/>}/>

                </Route>
            </Route>
        </Routes>
    );
}

export default App;
