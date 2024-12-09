import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFetchOrganizationsQuery} from "../../app/apis/organozationApi";
import {getCurrentUser} from "../../features/currentUserSlice";
import Skeleton from "../Skeleton";
import OrganizationCard from "../organization/OrganizationCard";

function OrganizationsHome() {
    const dispatch = useDispatch();
    const {data, error, isFetching} = useFetchOrganizationsQuery();


    let content;
    if (isFetching) {
        content = <Skeleton times={8} className='h-full w-full'/>
    } else if (error) {
        console.log(error)
        content = <div>Error loading organizations.</div>
    } else {
        content = data?.data.map((organization) => {
            return <OrganizationCard key={organization.id} organization={organization}/>
        })
    }

    return (
        <div className="m-2  max-w-[90%]  mx-auto  flex flex-row  flex-wrap items-center justify-start p-2">
            {content ? content : <Skeleton times={10} className="w-full h-screen"/>}
        </div>
    );
}

export default OrganizationsHome;