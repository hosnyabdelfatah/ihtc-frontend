import React, {useState, useEffect, useRef} from 'react';
import useAuth from "../../hooks/useAuth";
import BASE_URL from "../../app/apis/baseUrl";
import formatDateForInbox from "../../utils/formatDateForInbox";
import axios from "axios";
import Skeleton from "../Skeleton";
import {Link} from "react-router-dom";

function MessagesSent() {
    const {auth} = useAuth();
    const doctorId = auth.id;
    const type = "sent";
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState();
    const [sentCount, setSentCount] = useState(0);

    const [resultContent, setResultContent] = useState([]);
    const [errMsg, setErrMsg] = useState();

    useEffect(() => {
        const getSent = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BASE_URL}/doctor-messages/${doctorId}`);
                const result = response?.data?.data;
                const count = response?.data?.count;
                // console.log(response);
                const resultDescending = result?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setSent(resultDescending)
                setSentCount(count)
                setLoading(false)
            } catch (err) {
                // console.log(err)
                setLoading(false)
            } finally {
                setLoading(false);
            }
        }
        getSent();
    }, []);

    const sentShow = sent?.length > 0 && sent?.map((message, index) => {
        return <Link
            to={`/message-details/${message.id}?type=${type}`}
            // to={{
            //     pathname: `/message-details/${message.id}`,
            //     search: `?type=${type}`
            // }}
            className="w-full flex"
        >
            <tr className="w-full flex bg-stone-100 border-b border-b-stone-300 px-3
             hover:drop-shadow-md" key={index}>

                <td className="receiver w-[25%] capitalize py-[3px]">{message.receiver.name}</td>
                <td className="subject w-[70%] py-[3px] ">{message.subject}</td>
                <td className="created-at text-xs font-semibold w-[5%] py-[3px] text-left">
                    {formatDateForInbox(message.createdAt)}
                </td>

            </tr>
        </Link>
    });


    return (
        <div className="w-full bg-lime-50 h-screen  ">
            <div className="bg-white flex justify-between items-center px-3 ">
                <div className="py-4 rounded-tl-3xl"></div>
                <div className="py-4"></div>
                <div className="py-4 rounded-tr-3xl">
                    <span className="text-blue-700 font-bold">{sentCount} </span>
                    <span className="text-sm"> messages</span>
                </div>
            </div>
            <div className=" overflow-y-scroll">
                <table className="messages-show  w-full mx-auto overflow-y-scroll pl-3 "
                >
                    {loading
                        ? <Skeleton className="w-full h-10" times={8}/>
                        : <tbody className="text-stone-700  px-5">


                        {sentShow}
                        </tbody>}
                </table>
            </div>

        </div>
    );
}

export default MessagesSent;