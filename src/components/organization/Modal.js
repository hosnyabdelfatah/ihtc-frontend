import ReactDom from 'react-dom';
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../features/currentUserSlice";
import axios from "axios";
import BASE_URL from "../../app/apis/baseUrl";

const Modal = ({receivers, onClose}) => {
    const organization = useSelector(getCurrentUser);
    const sender = organization?.currentUser._id;
    const receiversText = receivers.join('-')

    const [toReceivers, setToReceivers] = useState('');
    const [messageTitle, setMessageTitle] = useState('');
    const [file, setFile] = useState();
    const [textMessage, setTextMessage] = useState('');

    //:TODO Handle attach preview.

    const campaignBody = {
        subject: messageTitle,
        from: sender,
        to: toReceivers,
        attach: file,
        campaignText: textMessage
    }

    const handleTextMessage = (e) => {
        setTextMessage(e.target.value)
    }

    const handleMessageTitle = (e) => {
        setMessageTitle(e.target.value)
    }

    const handleAttach = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleSendCampaign = async () => {
        const response = await axios.post(`${BASE_URL}campaigns`, campaignBody);
        console.log(response)

        setMessageTitle('');
        setFile('');
        setTextMessage('');
        onClose();
    }

    useEffect(() => {
        setToReceivers(receiversText);
        console.log(receivers)
        console.log(toReceivers)
    }, []);


    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, []);

    return ReactDom.createPortal(
        <div className="z-50">
            <div className="fixed inset-0 bg-gray-200 opacity-70 z-50" onClick={onClose}></div>
            <form onSubmit={(e) => e.preventDefault()}
                  className="fixed inset-20 p-5 bg-yellow-400 z-50 w-[70%] mx-auto  "
            >
                <div className="flex flex-col justify-center">
                    <div className="title mb-6">
                        <input type="text" className=" w-full p-2" value={messageTitle} onInput={(e) => {
                            handleMessageTitle(e)
                        }}/>
                    </div>

                    <div className="flex items-center justify-center w-full mb-8">
                        <label htmlFor="dropzone-file"
                               className="flex flex-col items-center justify-center w-7/12 h-30  border-gray-200 border shadow-sm  rounded-lg cursor-pointer  dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Click to upload your
                                    photo *</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden"
                                   onChange={(e) => handleAttach(e)}
                            />
                        </label>
                    </div>
                    <textarea id="campaign-message" value={textMessage}
                              rows="5" cols="10" onInput={handleTextMessage}>

                    </textarea>
                    <div className="w-full flex justify-center items-center">
                        <button
                            className="py-3 px-5 m-6 text-lg text-blue-900 font-bold border-[1px] border-blue-500 rounded-full drop-shadow-xl
                            hover:bg-indigo-100 transition-all "
                            onClick={handleSendCampaign}
                        >
                            Send Campaign
                        </button>
                    </div>
                </div>
            </form>
        </div>,
        document.querySelector('.modal-container')
    );
};

export default Modal;