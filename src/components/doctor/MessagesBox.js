import React, {useState, useEffect, useRef} from 'react';
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import BASE_URL from "../../app/apis/baseUrl";
import formatDateForInbox from "../../utils/formatDateForInbox";

function MessagesBox() {
    const {auth} = useAuth();
    const doctorId = auth.id;
    const [inbox, setInbox] = useState();
    const [sent, setSent] = useState();

    const [loading, setLoading] = useState(false);

    const [resultContent, setResultContent] = useState([]);
    const [inboxCount, setInboxCount] = useState(0);
    const [sentCount, setSentCount] = useState(0);
    const [errMsg, setErrMsg] = useState();


    const getInbox = async () => {
        try {

        } catch (err) {
            // console.log(err)
        }
    }


    useEffect(() => {
        const getSent = async () => {
            try {
                setLoading(true);

                const response = await axios.get(`${BASE_URL}/doctor-messages/${doctorId}`);
                const result = response?.data?.data;
                const count = response?.data?.count;
                // console.log(response);
                // console.log(result?.length);
                // console.log(count);
                setSent(result)
                setSentCount(count)

            } catch (err) {
                // console.log(err)
                setErrMsg(err.message)
            } finally {
                setLoading(false);
            }
        }
        getSent();
    }, []);

    const sentShow = sent?.length > 0 && sent?.map((message, index) => {
        return <tr className="w-full bg-stone-100 border-b border-b-stone-300 px-3" key={index}>
            <td className="receiver w-[20%]  py-1">{message.receiver.name}</td>
            <td className="subject w-[70%]  py-1">{message.subject}</td>
            <td className="created-at  w-[10%] py-1">{formatDateForInbox(message.createdAt)}</td>
        </tr>
    });


    const inboxShow = ""

    let showContent = sentSelected ? sentShow : inboxShow;

    return (
        <div className=" bg-lime-50 h-screen">

            <table className="messages-show  w-[90%] mx-auto mt-5"
            >
                <tr className="bg-white">
                    <td className="py-4 rounded-tl-3xl"></td>
                    <td className="py-4"></td>
                    <td className="py-4 rounded-tr-3xl">{sentCount} messages</td>
                </tr>
                <tbody className="  px-5">

                {showContent}
                </tbody>
            </table>

        </div>
    );
}

export default MessagesBox;