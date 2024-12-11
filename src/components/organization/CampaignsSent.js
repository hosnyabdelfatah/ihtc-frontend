import React, {useState, useEffect, useRef} from 'react';
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from 'axios';
import BASE_URL from "../../app/apis/baseUrl";
import formatDateForInbox from "../../utils/formatDateForInbox";
import Skeleton from "../Skeleton";

function CampaignsSent() {
    const effectRan = useRef();
    const errRef = useRef();
    const {organizationId} = useParams();
    const type = "campaign";
    console.log(organizationId);
    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState();
    const [campaignsCount, setCampaignsCount] = useState(0);
    const [errMsg, setErrMsg] = useState('');

    const getAllOrganizationCampaigns = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/campaigns/${organizationId}`);

            const result = response?.data?.data;
            console.log(response)

            setCampaigns(result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
            setCampaignsCount(response?.data?.count)
        } catch (err) {
            console.log(err)
            setErrMsg(err.message);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (effectRan.current === true) {
            getAllOrganizationCampaigns();
        }
        return () => {
            effectRan.current = true;
        }
    }, []);


    const showCampaigns = campaigns?.map((campaign, index) => {
        return <Link
            to={`/campaign-details/${campaign.id}?type=${type}`}
            // to={{
            //     pathname: `/message-details/${message.id}`,
            //     search: `?type=${type}`
            // }}
            className="w-full flex"
        >
            <tr className="w-full flex bg-stone-100 border-b border-b-stone-300 px-3
             hover:drop-shadow-md" key={index}>

                <td className="subject w-[70%] py-[3px] ">{campaign.subject}</td>
                <td className="created-at text-xs font-semibold w-[5%] py-[3px] text-left">
                    {formatDateForInbox(campaign.createdAt)}
                </td>

            </tr>
        </Link>
    });

    return (
        <div className="w-full bg-lime-50 h-screen  ">
            <p ref={errRef}
               className={`${errMsg ? "errmsg block" : "hidden"} bg-red-700 text-stone-100 font-bold rounded text-center py-1`}
               aria-live="assertive">
                {errMsg}
            </p>
            <div className="bg-white flex justify-between items-center px-3 ">
                <div className="py-4 rounded-tl-3xl"></div>
                <div className="py-4"></div>
                <div className="py-4 rounded-tr-3xl">
                    {isLoading ? <Skeleton className="w-full h-full" times={1}/>
                        : <span className="text-blue-700 font-bold">
                         {campaignsCount}
                    </span>}
                    <span className="text-sm"> Campaigns</span>
                </div>
            </div>
            <div className=" overflow-y-scroll">
                <table className="messages-show  w-full mx-auto overflow-y-scroll pl-3 "
                >
                    {isLoading
                        ? <Skeleton className="w-full h-10" times={8}/>
                        : <tbody className="text-stone-700  px-5">


                        {showCampaigns}
                        </tbody>}
                </table>
            </div>
        </div>
    );
}

export default CampaignsSent;