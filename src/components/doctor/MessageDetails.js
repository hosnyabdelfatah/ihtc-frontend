import React, {useEffect, useState} from 'react';
import {useParams, useLocation} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../../app/apis/baseUrl";
import Skeleton from "../Skeleton";
import AttachmentPreview from "../AttachmentPreview";

function MessageDetails() {
    const {messageId} = useParams();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');


    // console.log(type)
    // console.log(messageId)

    const [isLoading, setIsLoading] = useState(false);
    const [messageDetails, setMessageDetails] = useState({});
    const [name, setName] = useState('')

    const getMessageDetails = async () => {
        let response;
        try {
            setIsLoading(true);
            if (type === "sent") {
                response = await axios.get(`${BASE_URL}/doctor-messages/messageDetails/${messageId}`);
            } else if (typ === "in") {

            }


            const result = response?.data?.data;

            // console.log(result)
            setMessageDetails(result);
            setName(result?.from?.fname + " " + result?.from?.lname);
        } catch (err) {
            // console.log(err);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        getMessageDetails();
    }, []);

    return (
        <div className="pt-[6.3%] px-5 flex flex-col  justify-between pb-8"
             style={{minHeight: "100%"}}>
            <div className="from font-semibold">
                {isLoading ?
                    <Skeleton/>
                    : name}
            </div>

            <div className="receiver">
                {isLoading ?
                    <Skeleton/>
                    : <span className="text-sm text-stone-400">to
                        <span className="capitalize"> {messageDetails?.receiver?.name}</span></span>}
            </div>

            <div className="subject">
                {isLoading ?
                    <Skeleton/>
                    : messageDetails?.subject}
            </div>

            <div className="message-text min-h-32 overflow-y-scroll">
                {isLoading ?
                    <Skeleton/>
                    : messageDetails?.messageText}
            </div>

            <div className="message-attach">
                {isLoading ?
                    <Skeleton/>
                    : <AttachmentPreview fileUrl={messageDetails?.attach}/>
                }
            </div>

        </div>
    );
}

export default MessageDetails;