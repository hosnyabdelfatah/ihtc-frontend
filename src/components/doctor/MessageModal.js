import ReactDom from 'react-dom';
import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import BASE_URL from "../../app/apis/baseUrl";

const MessageModal = ({sender, receiver, onClose}) => {

    const errRef = useRef();

    const [fromId, setFromId] = useState('')
    const [fromText, setFromText] = useState('')
    const [receiverId, setReceiverId] = useState('');
    const [receiverText, setReceiverText] = useState('');
    const [messageTitle, setMessageTitle] = useState('');
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState("")
    const [textMessage, setTextMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [errs, setErrs] = useState([]);
    const [errMsg, setErrMsg] = useState('');


    let errorMessage = [];

    const circleSpinner = <span className="flex justify-center items-center ">
        <svg className="mr-3 h-5 w-5 animate-spin text-stone-100"
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
       <span className="text-stone-100"> Sending...</span>
    </span>

    const messageBodyData = new FormData()
    messageBodyData.append("subject", messageTitle);
    messageBodyData.append("from", fromId);
    messageBodyData.append("to", receiverId);
    messageBodyData.append("attach", file);
    messageBodyData.append("messageText", textMessage);

    // const messageBody = {
    //     subject: messageTitle,
    //     from: sender.lastName,
    //     to: receiver.id,
    //     attach: file,
    //     campaignText: textMessage
    // }

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
            return <img src={URL.createObjectURL(file)} alt="preview" width="100%" height="100%"/>;
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

    const handleErrMsg = () => {
        if (!receiver) setErrs([...errs, 'There is no any receiver to send to him please select your target receiver!']);

        if (!messageTitle || messageTitle === "") setErrs([...errs, 'Message title is require!']);

        if (!textMessage || textMessage === "" || textMessage.length < 5) setErrs([...errs, 'Message text is require and must be more than or equal 5 characters!']);

        if (errs.length > 0) {
            errs.map((err) => errorMessage.push(err))
        }
        console.log(errs)

        const renderErrMsg = errorMessage.map(error => <span
            className="block text-stone-100 font-bold">{error}</span>);
        return renderErrMsg;
    }

    const handleSendMessage = async () => {
        setIsSending(true);

        if (errs.length > 0) {
            console.log(errs)
            handleErrMsg()
            return false;
        } else {
            try {
                const response = await axios.post(`${BASE_URL}/doctor-messages`, messageBodyData);

                setIsSending(false)
                setMessageTitle('');
                setFile('');
                setTextMessage('');
                onClose();
            } catch (err) {
                console.log(err)
                setIsSending(false)
                errRef.current.focus();
            }
        }
    }

    useEffect(() => {
        if (receiver) {
            setFromId(sender.id);
            setFromText(sender.lastName);
            setReceiverId(receiver?.id)
            setReceiverText(receiver?.name);
        }
    }, []);


    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, []);

    return ReactDom.createPortal(
        <div className="z-50 relative">
            <p
                ref={errRef}
                className={`${errorMessage.length > 0 ? "block" : "hidden"} absolute 
                top-[20px] bg-red-700 text-md text-stone-100 font-bold `}
            >
                {handleErrMsg}
            </p>
            <div className="fixed inset-0 bg-gray-200 opacity-70 z-50" onClick={onClose}></div>
            <form onSubmit={(e) => e.preventDefault()}
                  className="fixed inset-5 p-5 bg-lime-500 z-50 w-[60%] mx-auto  "
            >
                <div className="flex flex-col justify-center">
                    <div className="from mb-3 flex flex-row justify-start items-center">
                        <label className="mr-4 text-xl text-violet-900 font-semibold" htmlFor="subject">From</label>
                        <input type="text" id="subject" className=" w-9/12 p-2 text-violet-900  font-semibold ml-7"
                               required
                            // disabled
                               value={fromText}
                               onChange={(e) => {
                               }}/>
                    </div>
                    <div className="to mb-3 flex flex-row justify-start items-center">
                        <label className="mr-4 text-xl text-violet-900 font-semibold" htmlFor="subject">To</label>
                        <input type="text" id="subject"
                               className=" w-9/12 p-2 ml-[3.3rem]  text-violet-900  font-semibold "
                               required
                               value={receiverText}
                               onChange={(e) => {

                               }}/>
                    </div>
                    <div className="subject mb-3 flex flex-row justify-start items-center">
                        <label className="mr-4 text-xl text-violet-900 font-semibold" htmlFor="subject">Subject</label>
                        <input type="text" id="subject" className=" w-9/12 p-2 ml-2  text-violet-900  font-semibold"
                               required
                               value={messageTitle}
                               onInput={(e) => {
                                   handleMessageTitle(e)
                               }}/>
                    </div>

                    <div
                        className="flex items-center justify-center w-full mx-auto h-[180px] border rounded-lg overflow-hidden mb-5">
                        <label htmlFor="dropzone-file"
                               className="flex flex-col items-center justify-center text-center w-full h-full  border-gray-200  shadow-sm  rounded-lg cursor-pointer  dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden">
                            <div
                                className="file-preview flex flex-col items-center justify-center py-5 overflow-hidden">
                                {renderPreview()}

                                {!file && <>
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-violet-900 font-semibold">Click
                                        to
                                        attach your image,
                                        video or file.pdf</p></>}
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
                        <textarea id="campaign-message" className="w-9/12" value={textMessage}
                                  rows="4" cols="6" onInput={handleTextMessage}
                                  required
                        >

                        </textarea>
                    </div>
                    <div className="w-10/12 mx-auto flex justify-center items-center">
                        <button
                            className="py-1 px-2 m-6 text-lg text-blue-900 font-bold border-2 border-blue-500 rounded-full drop-shadow-2xl
                            hover:bg-indigo-100 transition-all active:drop-shadow-none "
                            onClick={handleSendMessage}
                            disabled={errs.length > 0}
                        >

                            {errMsg !== "" ? "Send Message"
                                : isSending ? circleSpinner
                                    : "Send Message"}
                        </button>
                    </div>
                </div>
            </form>
        </div>,
        document.querySelector('.modal-container')
    );
};

export default MessageModal;