import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {MdOutlineMoveToInbox} from "react-icons/md";
import {BsSend} from "react-icons/bs";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../features/currentUserSlice";

function OrganizationMessagesNav() {
    const organizationData = useSelector(getCurrentUser);
    // console.log(organizationData.currentUser)
    const [inboxSelected, setInboxSelected] = useState(false);
    const [campaignSelected, setCampaignSelected] = useState(true);

    const handleInboxSelected = () => {
        setCampaignSelected(false)
        setInboxSelected(true);

    };
    const handleSentSelected = () => {
        setInboxSelected(false);
        setCampaignSelected(true)
    }


    return (
        <div
            className="buttons-bar bg-transparent w-[18%] fixed top-[14.6%] left-2 bottom-0 border-2 rounded-t-3xl flex flex-col justify-start items-center pt-[5.2%]">
            {/*<Link to="organization-messages-in"*/}
            {/*      className={`${inboxSelected ? "bg-indigo-400 text-stone-100 font-bold" : "bg-transparent text-stone-600 font-semibold"} flex justify-evenly items-center border rounded mb-2 py-1 w-full px-3 `}*/}
            {/*      onClick={handleInboxSelected}*/}
            {/*>*/}
            {/*    <MdOutlineMoveToInbox/>*/}
            {/*    <span className=" ">Inbox</span>*/}
            {/*</Link>*/}
            <Link to={`campaigns-sent/${organizationData?.currentUser?.id}`}
                  className={`${campaignSelected ? "bg-indigo-400 text-stone-100  font-bold" : "bg-transparent text-stone-500   font-semibold"} flex justify-evenly items-center border rounded mb-2 py-1 w-full px-3 `}
                  onClick={handleSentSelected}
            >
                <BsSend/>
                <span className=" ">Campaigns</span>
            </Link>
        </div>
    );
}

export default OrganizationMessagesNav;