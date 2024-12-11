import React, {useEffect, useState} from 'react';
import {useParams, useLocation} from "react-router-dom";
import axios from 'axios';
import BASE_URL from "../../app/apis/baseUrl";
import Skeleton from "../Skeleton";
import AttachmentPreview from "../AttachmentPreview";

function CampaignDetails() {
    const {campaignId} = useParams();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');


    // console.log(type)
    // console.log(campaignId)

    const [isLoading, setIsLoading] = useState(false);
    const [campaignDetails, setCampaignDetails] = useState({});
    const [name, setName] = useState('')

    const getCampaignDetails = async () => {
        let response;
        try {
            setIsLoading(true);
            if (type === "campaign") {
                response = await axios.get(`${BASE_URL}/campaigns/campaignDetails/${campaignId}`);
            } else if (typ === "in") {

            }

            const result = response?.data?.data;
            // console.log(result)
            setCampaignDetails(result);
            // console.log(campaignDetails)

        } catch (err) {
            // console.log(err);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        getCampaignDetails();
    }, []);

    return (
        <div className="pt-[6.3%] px-5 flex flex-col  justify-between pb-8"
             style={{minHeight: "100%"}}>
            <div className="from font-semibold">
                {isLoading ?
                    <Skeleton/>
                    : name}
            </div>

            <div className="receivers">
                receivers
                {/*{isLoading ?*/}
                {/*    <Skeleton/>*/}
                {/*    : <span className="text-sm text-stone-400">to*/}
                {/*        <span className="capitalize"> {campaignDetails?.receiver?.name}</span></span>}*/}
            </div>

            <div className="subject">
                {isLoading ?
                    <Skeleton/>
                    : campaignDetails?.subject}
            </div>

            <div className="campaign-text min-h-32 overflow-y-scroll">
                {isLoading ?
                    <Skeleton/>
                    : campaignDetails?.campaignText}
            </div>

            <div className="campaign-attach">
                {isLoading ?
                    <Skeleton/>
                    : <AttachmentPreview fileUrl={campaignDetails?.attach}/>
                }
            </div>

        </div>
    );
}

export default CampaignDetails;