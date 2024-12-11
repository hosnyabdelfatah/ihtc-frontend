import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useFetchOrganizationsQuery} from "../../app/apis/organozationApi";
import {getCurrentUser} from "../../features/currentUserSlice";
import Skeleton from "../Skeleton";
import OrganizationCard from "../organization/OrganizationCard";
import {Link} from "react-router-dom";

function OrganizationsHome() {
    const dispatch = useDispatch();
    const {data, error, isFetching} = useFetchOrganizationsQuery();


    let content;
    if (isFetching) {
        content = <Skeleton times={8} className='h-10 w-full'/>
    } else if (error) {
        // console.log(error)
        content = <div>Error loading organizations.</div>
    } else {
        content = data?.data.map((organization) => {
            // return <OrganizationCard key={organization.id} organization={organization}/>
            return <Link to={`/organization-info/${organization?.id}`}
                         className="ml-2 mr-4 rounded-md w-[22%] mb-5 h-[350px] border px-1 pt-1 pb-3 bg-gray-50
               hover:scale-110 hover:z-30 transition-transform ">
                <div className="organization-header   rounded-md h-4/6  mb-2">
                    <div className='organization-logo w-full h-full'>
                        <img className=" w-full h-[90%]" src={organization?.logo} alt='organization-logo'/>
                    </div>
                </div>

                <div className="organization_details h-2/6 mt-2">
                    <div
                        className="organization-name w-[100%] mb-2 py-2 text-center text-md text-[#0657A8] border-b font-bold uppercase">
                        <span>{organization?.name}</span>
                    </div>
                    <div
                        className="organization-country w-[100%] mb-2 border-b py-1 text-left text-md text-[#0657A8]  font-semibold capitalize"
                    >
                        <span className="w-1/4 text-xs mr-3">Country</span>
                        <span className="font-bold">{organization?.country?.title}</span>
                    </div>

                    <div className='organization.industryField mt-1 text-[#0657A8]   font-semibold capitalize'>
                        <span className="w-1/4 text-xs mr-3">Industry</span>
                        <span className="font-bold">{organization?.industryField}</span>
                    </div>
                </div>
            </Link>
        })
    }

    return (
        <div className="m-2  max-w-[90%]  mx-auto  flex flex-row  flex-wrap items-center justify-center p-2">
            {content ? content : <Skeleton times={10} className="w-full h-screen"/>}
        </div>
    );
}

export default OrganizationsHome;