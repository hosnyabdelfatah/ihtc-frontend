import React, {useEffect, useState} from 'react';
import axios from "axios";
import BASE_URL from "../../app/apis/baseUrl";
import useAuth from "../../hooks/useAuth";
import {Link, useNavigate} from "react-router-dom";

function UpdateProfileImage(props) {
    const {auth} = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState('');
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

    const handleImage = (e) => setImage(e.target.files[0]);

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

    const getCurrentDoctor = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/doctors/me/${auth.id}`);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("image", image);

        const updatedImage = image ? data : auth.image;

        try {
            setIsLoading(true);
            const response = await axios
                .patch(`${BASE_URL}/doctors/updateProfileImage/${auth?.id}`,
                    updatedImage,
                    {
                        headers: image ? {'Content-Type': 'multipart/form-data'}
                            : {'Content Type': 'application/json'}
                    }
                );

            setIsLoading(false);
            setImage(null);
            setPreview(null);
            navigate('/doctor');

        } catch (err) {
            console.log(err);
            setIsLoading(false);

        }
    }

    useEffect(() => {
        getCurrentDoctor();
    }, []);

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">

                <div className="registration-title  justify-evenly content-baseline ">
                    <h2 className="mt-3 text-center  text-xl leading-5 font-bold text-gray-500">
                        Update Profile Image
                    </h2>
                    <p className="mt-3 text-center text-sm leading-5 text-gray-500 max-w">
                        <Link to="/doctor"
                              className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150 px-1 border border-b-lime-400 rounded-l  hover:text-lime-600 transition-all">
                            {auth.firstName + " " + auth.lastName}
                        </Link>
                        page
                    </p>
                </div>

                <div className=" sm:px-10 bg-white mb-8 py-8 px-4 shadow-lg sm:rounded-lg">
                    <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">

                        <div className="flex items-center justify-center  w-full mb-4">
                            <label htmlFor="image"
                                   className="flex flex-col items-center justify-center w-6/12 h-[180px]  border-gray-200 border shadow-sm  rounded-full cursor-pointer  dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                                <input id="image" name="image" type="file" className="hidden"
                                       accept="image/*"
                                       onChange={(e) => {
                                           handleImage(e)
                                           handleImagePreview(e)
                                       }}
                                />
                            </label>
                        </div>
                        <div className="mt-6 block w-full flex justify-between rounded-md">
                            <button type="submit" onClick={handleSubmit}
                                    className="w-full flex justify-center py-2 px-4  shadow-sm shadow-lime-400 border border-transparent sm:text-sm font-extrabold rounded-md  text-red-800 border-2 border-stone-400 bg-lime-400 hover:border-indigo-300  transition-all duration-150 ease-in-out">
                                {isLoading ? circleSpinner : <span>Update</span>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfileImage;