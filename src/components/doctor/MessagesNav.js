import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {MdOutlineMoveToInbox} from "react-icons/md";
import {BsSend} from "react-icons/bs";

function MessagesNav() {
    const [inboxSelected, setInboxSelected] = useState(false);
    const [sentSelected, setSentSelected] = useState(true);

    const handleInboxSelected = () => {
        setSentSelected(false)
        setInboxSelected(true);

    };
    const handleSentSelected = () => {
        setInboxSelected(false);
        setSentSelected(true)
    }


    return (
        <div
            className="buttons-bar bg-transparent w-[18%] fixed top-[14.6%] left-2 bottom-0 border-2 rounded-t-3xl flex flex-col justify-start items-center pt-[5.2%]">
            <Link to="messages-in"
                  className={`${inboxSelected ? "bg-lime-300 text-blue-900 font-bold" : "bg-transparent text-stone-600 font-semibold"} flex justify-evenly items-center border rounded mb-2 py-1 w-full px-3 `}
                  onClick={handleInboxSelected}
            >
                <MdOutlineMoveToInbox/>
                <span className=" ">Inbox</span>
            </Link>
            <Link to="messages-sent"
                  className={`${sentSelected ? "bg-lime-300 text-blue-900  font-bold" : "bg-transparent text-stone-500   font-semibold"} flex justify-evenly items-center border rounded mb-2 py-1 w-full px-3 `}
                  onClick={handleSentSelected}
            >
                <BsSend/>
                <span className=" ">Sent</span>
            </Link>
        </div>
    );
}

export default MessagesNav;