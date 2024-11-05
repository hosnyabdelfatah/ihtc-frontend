import ReactDom from 'react-dom';
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../features/currentUserSlice";
import axios from "axios";
import BASE_URL from "../../app/apis/baseUrl";
import {retry} from "@reduxjs/toolkit/query";

const Modal = ({receivers, onClose}) => {
    const organization = useSelector(getCurrentUser);
    const sender = organization?.currentUser._id;
    const receiversText = receivers.join('-')

    const [toReceivers, setToReceivers] = useState('');
    const [messageTitle, setMessageTitle] = useState('');
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState("")
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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileType(selectedFile.type);
        }
    }

    const renderPreview = () => {
        if (!file) return null;

        if (fileType.startsWith("image/")) {
            return <img src={URL.createObjectURL(file)} alt="preview" width="200"/>;
        } else if (fileType.startsWith("video/")) {
            return (
                <video width="320" height="240" controls>
                    <source src={URL.createObjectURL(file)} type={fileType}/>
                    Your browser does not support this video tag.
                </video>
            );
        } else if (fileType === "application/pdf") {
            return (
                <embed src={URL.createObjectURL(file)}
                       type="application/pdf"
                       width="320"
                       height="200"
                />
            );
        } else {
            return <p>Unsupported file type</p>;
        }
    };

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
                  className="fixed inset-5 p-5 bg-amber-400 z-50 w-[60%] mx-auto  "
            >
                <div className="flex flex-col justify-center">
                    <div className="title mb-6 flex flex-row justify-start items-center">
                        <label className="mr-4 text-xl text-violet-900 font-semibold" htmlFor="subject">Subject</label>
                        <input type="text" id="subject" className=" w-10/12 p-2  text-violet-900  font-semibold"
                               value={messageTitle}
                               onInput={(e) => {
                                   handleMessageTitle(e)
                               }}/>
                    </div>

                    <div className="flex items-center justify-center w-50 h-[230px] mb-8">
                        <label htmlFor="dropzone-file"
                               className="flex flex-col items-center justify-center w-7/12 h-[230px]  border-gray-200 border shadow-sm  rounded-lg cursor-pointer  dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden">
                            <div
                                className="file-preview flex flex-col items-center justify-center py-5 overflow-hidden">
                                {renderPreview()}
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-violet-900 font-semibold">Click to
                                    attach your image,
                                    video or file .pdf</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden"
                                   accept="image/*,video/*,application/pdf"
                                   onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    <div className="flex flex-row justify-start items-center">
                        <label htmlFor="campaign-message"
                               className="mr-4 text-xl text-violet-900 font-semibold">Message</label>
                        <textarea id="campaign-message" className="w-10/12" value={textMessage}
                                  rows="6" cols="6" onInput={handleTextMessage}>

                        </textarea>
                    </div>
                    <div className="w-10/12 mx-auto flex justify-center items-center">
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