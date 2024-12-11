import React from 'react';
import {Outlet} from 'react-router-dom'
import MessagesNav from "./MessagesNav";

function MessagesBoxLayout() {
    return (
        <div className="bg-lime-50 ">
            <MessagesNav/>
            <div className="w-[80%] border  ml-[20%]   rounded-t-3xl overflow-y-scroll
             fixed top-[14.6%] right-2 bottom-0
            ">
                <Outlet/>
            </div>
        </div>
    );
}

export default MessagesBoxLayout;