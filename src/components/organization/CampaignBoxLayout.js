import React from 'react';
import {Outlet} from 'react-router-dom'
import OrganizationMessagesNav from './OrganizationMessagesNav'

function CampaignsBoxLayout() {
    return (
        <div className="bg-lime-50 ">
            <OrganizationMessagesNav/>
            <div className="w-[80%] border  ml-[20%]   rounded-t-3xl overflow-y-scroll
             fixed top-[14.6%] right-2 bottom-0
            ">
                <Outlet/>
            </div>
        </div>
    );
}

export default CampaignsBoxLayout;