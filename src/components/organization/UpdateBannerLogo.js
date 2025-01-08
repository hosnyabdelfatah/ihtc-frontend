import React, {useEffect, useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import BASE_URL from "../../app/apis/baseUrl";
import {useAlert} from "../../context/AlertProvider";

function UpdateBannerLogo() {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const {showAlert} = useAlert();

    const [isLoading, setIsLoading] = useState(false);
    const [currentData, setCurrentData] = useState({});
    const [bannerPreview, setBannerPreview] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [banner, setBanner] = useState('');
    const [logo, setLogo] = useState('');


    const handleImagePreview = (event) => {
        const {id, files} = event.target;
        const file = files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (id === 'banner') {
                    setBannerPreview(reader.result);
                } else if (id === 'logo') {
                    setLogoPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const handleBanner = (e) => setBanner(e.target.files[0]);
    const handleLogo = (e) => setLogo(e.target.files[0]);

    const handleLoading = () => {
        //     setTimeout(()=> {
        //
        // }, [50000]);
    }

    const handleGetCurrentOrganizationData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/organizations/me/${auth.id}`, {
                withCredentials: true
            })

            setCurrentData(response?.data?.data);
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        banner && formData.append("banner", banner);
        logo && formData.append("logo", logo);
        const updatedData = banner || logo ? formData : '';
        try {
            setIsLoading(true);

            const response = await axios.patch(`${BASE_URL}/organizations/updateBannerLogo/${auth?.id}`, updatedData, {
                withCredentials: true
            });
            setIsLoading(false);
            setBannerPreview(null);
            setLogoPreview(null);
            setBanner('');
            setLogo('');
            navigate('/organization')

        } catch (err) {
            console.log(err);
            setIsLoading(false);

        }
    }

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

    useEffect(() => {
        handleGetCurrentOrganizationData();
    }, []);
    return (
        <div className="min-h-screen flex flex-col justify-center  sm:px-6 lg:px-8 relative">
            <div className="mx-auto text-stone-500 font-semibold">
                <span>Go to</span>
                <Link to="/organization"
                      className="mx-3  p-1 text-violet-700 font-semibold border border-amber-400 rounded">
                    {auth.name.toUpperCase()}
                </Link>
                <span> page</span>
            </div>
            <div className=" sm:px-10 bg-white mb-8 mt-4 py-8 px-4 shadow-lg sm:rounded-lg border">
                <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="upload-banner flex items-stretch justify-evenly w-full mb-4 ">
                        <div className="old-banner w-[35%] p-5 rounded-lg flex flex-col justify-between border">
                            <span className="text-sm text-stone-600 font-bold">Old Banner</span>
                            <img src={currentData.banner} alt=""/>
                        </div>
                        <label htmlFor="banner"
                               className="flex flex-col items-center justify-center w-[60% h-30  border-gray-200 border shadow-sm  rounded-lg cursor-pointer  dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div
                                className="flex flex-col items-center justify-center p-5">
                                {bannerPreview ? (
                                        <div className="w-full h-full">
                                            <img src={bannerPreview} alt="Banner Preview"
                                                 style={{width: '300px', height: 'auto'}}
                                            />
                                        </div>
                                    ) :
                                    (
                                        <div className="flex flex-col items-center justify-center">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                 aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 text-center dark:text-gray-400">
                                                Click to upload New organization
                                                <span
                                                    className="inline-block bg-red-100 font-bold ml-2 mt-3 p-1 rounded">banner </span>
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                            <input id="banner" name="banner" type="file" className="hidden"
                                   accept="image/*"
                                   onChange={(e) => {
                                       handleImagePreview(e)
                                       handleBanner(e)
                                   }}
                            />
                        </label>
                    </div>

                    <div className="upload-logo  flex items-stretch justify-evenly  mb-4 ">
                        <div className="ml-4 old-logo w-[20%] p-5 rounded-lg flex flex-col justify-between border">
                            <span className="text-sm text-stone-600 font-bold">
                                Old Logo
                            </span>
                            <img src={currentData.logo} alt=""/>
                        </div>
                        <label htmlFor="logo"
                               className="ml-16 flex flex-col items-center justify-center w-3/12 h-30  border-gray-200 border shadow-sm  rounded-lg cursor-pointer  dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {logoPreview ? (
                                        <div className="w-full h-full">
                                            <img src={logoPreview} alt="Logo Preview"
                                                 style={{width: '100px', height: 'auto'}}/>
                                        </div>) :

                                    (<div className="flex flex-col items-center justify-center">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                 aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 text-center dark:text-gray-400 ">
                                                Click to upload organization<br/>
                                                <span
                                                    className="inline-block mt-3 bg-red-100 font-bold ml-2 p-1 rounded">new logo</span>
                                            </p>
                                        </div>
                                    )}
                            </div>
                            <input id="logo" name="logo" type="file" className="hidden"
                                   accept="image/*"
                                   onChange={(e) => {
                                       handleImagePreview(e)
                                       handleLogo(e)
                                   }}
                            />
                        </label>
                    </div>
                    <div className="mt-6 block  flex justify-end rounded-md">

                        <button type="submit"
                                onClick={handleSubmit}
                                className="mr-52 flex justify-center py-2 px-4  shadow-sm shadow-lime-400 border border-transparent sm:text-lg font-bold rounded-md  text-red-800 border-2 border-stone-400 bg-lime-400 hover:border-indigo-300  transition-all duration-150 ease-in-out">
                            {isLoading ? circleSpinner : <span>Update</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateBannerLogo;