import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../app/apis/baseUrl";
import useAuth from "../../hooks/useAuth";

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
    {/*<span className="text-sm text-stone-100"> Processing...</span>*/}
    </span>

function UpdateUserImage(props) {
    const errRef = useRef(false);
    const navigate = useNavigate();
    const {auth} = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [avatar, setAvatar] = useState('');
    const [preview, setPreview] = useState(null);

    const handleImagePreview = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleAvatar = (e) => setAvatar(e.target.files[0])

    // const handleFileChange = (e) => {
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         avatar: e.target.files[0]
    //     }));
    // };

    const formData = new FormData();
    formData.append('avatar', avatar);

    const getCurrentUser = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/me/${auth.id}`, {
                withCredentials: true
            });
            setCurrentUser(response?.data?.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedData = avatar ? formData : currentUser?.avatar;
        console.log(updatedData)
        try {
            setIsLoading(true);
            const response = await axios.patch(`${BASE_URL}/users/updateAvatar/${auth.id}`, updatedData, {
                headers: avatar ?
                    {'Content-Type': 'multipart/form-data'}
                    : {'Content-Type': 'application/json'},

            });

            console.log(response);
            setIsLoading(false);
            setAvatar(null);
            navigate('/user');
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-start sm:px-6 lg:px-8">
            <h3 className="my-8 mx-auto text-lg text-blue-900 font-bold drop-shadow-md">
                Update Avatar
            </h3>
            <div
                className="sm:w-[55%] md:w-[40%] lg:w-[35%] mx-auto sm:px-10 bg-white mb-8  px-4 shadow-lg sm:rounded-lg">
                <div
                    className="current-avatar w-2/6 mx-auto mb-5 p-2 flex justify-center items-center overflow-hidden  border  rounded-[100%]">
                    <img src={currentUser?.avatar}
                         alt={currentUser.fname + " " + currentUser.lname}
                         className="w-full"
                    />
                </div>
                <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="flex items-center justify-center w-full mb-4">

                        <label htmlFor="avatar"
                               className="flex flex-col items-center justify-center w-4/6 h-[230px]  border-gray-200 border shadow-sm  rounded-[100%] cursor-pointer  dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >

                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {preview ? (
                                    <div>
                                        <img
                                            src={preview}
                                            alt="Profile Preview"
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                borderRadius: '50%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>) : (
                                    <div>
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 mx-auto"
                                             aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 text-center dark:text-gray-400">
                                            Click to upload your new photo
                                        </p>
                                    </div>
                                )}
                            </div>
                            <input type="file" id="avatar" name="avatar" className="hidden"
                                   accept="image/*"
                                   required
                                   onChange={(e) => {
                                       handleAvatar(e)
                                       handleImagePreview(e)
                                       // handleFileChange(e)
                                   }}
                            />
                        </label>
                    </div>

                    <div className="mt-6 block w-full flex justify-between rounded-md">
                        <button type="submit" onClick={handleSubmit}
                                className="w-2/4 mx-auto flex justify-center py-2 px-4  shadow-sm shadow-lime-400 border border-transparent sm:text-sm font-extrabold rounded-md  text-red-800 border-2 border-stone-400 bg-lime-400 hover:border-indigo-300  transition-all duration-150 ease-in-out">
                            {isLoading ? circleSpinner : <span>Update</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateUserImage;