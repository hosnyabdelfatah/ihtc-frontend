import './create-doctor.css'
import React, {useState} from 'react';
import Skeleton from "../Skeleton";
import {FaRegEyeSlash} from "react-icons/fa";
import {FaRegEye} from "react-icons/fa";
import {HiChevronDown} from "react-icons/hi";
import {HiChevronUp} from "react-icons/hi";
import logo from '../../assets/images/logo-transparent.webp';
import Egypt from '../../assets/images/flags/egypt.jpg';
import Turkish from '../../assets/images/flags/turkish.jpg';
import English from '../../assets/images/flags/english.jpeg';
import French from '../../assets/images/flags/french.jpg';
import {useFetchCountriesQuery} from '../../store';
// import ProgressBar from "../ProgressBar";

const CreateDoctor = () => {
    let content;
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [languageClicked, setLanguageClicked] = useState(false);
    const [languageSelectShow, setLanguageSelectShow] = useState(false);
    const [selectedCountries, setSelectedCountries] = useState('');
    const [countriesClicked, setCountriesClicked] = useState(false);
    const [countriesSelectShow, setCountriesSelectShow] = useState(false);

    const {data, error, isFetching} = useFetchCountriesQuery();


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    const handleLanguage = (lang) => {
        setSelectedLanguage(lang);
    }
    const handleCountries = (lang) => {
        setSelectedCountries(lang);
    };
    const handleCountriesSelectShow = () => {
        setCountriesSelectShow(!countriesSelectShow);
    }

    const handleLanguageClicked = () => {
        setLanguageClicked(!languageClicked);
    };

    const handleCountriesClicked = () => {
        setCountriesClicked(!countriesClicked);
    }

    const handleLanguageSelectShow = () => {
        setLanguageSelectShow(!languageSelectShow);
    }

    if (isFetching) {
        content = <Skeleton className="w-4 h-4" times={4}/>
    } else if (error) {
        content = <div>Data error loading...</div>
    } else {
        content = data.data.map((country) => {
            return <li key={country.id} value={country.id}
                       onClick={handleCountriesClicked}
                       className="text-left p-1.5 rounded hover:cursor-pointer hover:bg-lime-400"
            >
                {country.title}
            </li>
        });
    }
    // const [progressValue, setProgressValue] = useState(0);
    // const [step, setStep] = useState(1);
    // const [] = useState({});
    //
    //
    // const handleNext = () => {
    //     if (progressValue < 99.999 && step <= 3) {
    //         setProgressValue(progressValue + 33.333);
    //         setStep(step + 1);
    //         console.log(progressValue, step);
    //     }
    // }
    //
    // const handlePrev = () => {
    //     if (progressValue > 0 && step > 0) {
    //         setProgressValue(progressValue - 33.333);
    //         setStep(step - 1);
    //         console.log(progressValue, step);
    //     }
    // }

    return (
        <div className="min-h-screen flex flex-col justify-center  sm:px-6 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <a href="client/src/components/doctor/CreateDoctor" target="_blank"
                       className=" inline-block w-44 ">
                        <img className="mx-auto h-auto w-auto" src={logo}
                             alt="Workflow"/>
                    </a>

                    <div className="registration-title  justify-evenly content-baseline ">
                        <h2 className="mt-3 text-center  text-xl leading-5 font-bold text-gray-500">
                            Doctor registration.
                        </h2>
                        <p className="mt-1 text-center text-sm leading-5 text-gray-500 max-w">
                            I have an account:<span> </span>
                            <a href="client/src/components/doctor/CreateDoctor#"
                               className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150 px-1 border border-b-lime-400 rounded-l  hover:text-lime-600 transition-all">
                                login
                            </a>
                        </p>
                    </div>

                </div>
                <div className=" sm:px-10 bg-white mb-8 py-8 px-4 shadow-lg sm:rounded-lg">
                    <form method="POST" onSubmit={event => event.preventDefault()}>

                        <div className="flex items-center justify-center  w-full mb-4">
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
                                <input id="dropzone-file" type="file" className="hidden"/>
                            </label>
                        </div>

                        <div className=" full-name mt-1 flex flex-row justify-between relative rounded-md ">
                            <div className="fname w-5/12 mt-1 flex flex-row justify-between relative rounded-md ">
                                {/*<label htmlFor="fname"*/}
                                {/*       className="block text-sm font-medium leading-5  text-gray-700">Name</label>*/}
                                <input id="fname" name="fname" placeholder="First name *" type="text" required=""
                                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-lime focus:border-lime-400 transition duration-150 ease-in-out shadow-sm text-lg sm:leading-5"/>
                            </div>
                            <div className="lname w-5/12 mt-1 flex flex-row justify-between relative rounded-md ">
                                {/*<label htmlFor="lname"*/}
                                {/*       className="block text-sm font-medium leading-5  text-gray-700">Name</label>*/}
                                <input id="lname" name="lname" placeholder="Family name *" type="text" required=""
                                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-lime focus:border-lime-400 transition duration-150 ease-in-out text-lg shadow-sm sm:leading-5"/>
                            </div>
                        </div>

                        <div className="mt-4">
                            {/*<label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">*/}
                            {/*    Email*/}
                            {/*</label>*/}
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input id="email" name="email" placeholder="Email: user@example.com *" type="email"
                                       autoComplete="off"
                                       required
                                       className=" block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-lime focus:border-lime-400 transition duration-150
                                       text-lg text-stone-700  ease-in-out  sm:leading-5"/>
                                <div
                                    className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            {/*<label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">*/}
                            {/*    Password*/}
                            {/*</label>*/}
                            <div className="mt-1 rounded-md shadow-sm relative">
                                <input id="password" name="password" type={showPassword ? "text" : "password"}
                                       required=""
                                       placeholder="Password"
                                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5"
                                />
                                <span className="inline-block absolute text-gray-400 right-2 top-3"
                                      onClick={handleShowPassword}>{showPassword ?
                                    <FaRegEye/> :
                                    <FaRegEyeSlash/>}
                                </span>
                            </div>
                        </div>

                        <div className=" password-confirm mt-4">
                            {/*<label htmlFor="password-confirmation"*/}
                            {/*       className="block text-sm font-medium leading-5 text-gray-700">*/}
                            {/*    Confirm Password*/}
                            {/*</label>*/}
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input id="password-confirmation" name="password-confirmation"
                                       type={showPasswordConfirm ? "text" : "password"}
                                       required="" placeholder="Confirm password"
                                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5"
                                />
                                <span className="inline-block absolute text-gray-400 right-2 top-3"
                                      onClick={handleShowPasswordConfirm}>{showPasswordConfirm ?
                                    <FaRegEye/> :
                                    <FaRegEyeSlash/>}
                                </span>
                            </div>
                        </div>

                        <div className="whatsapp mt-4">
                            <input type="text" name="whatsapp" id="whatsapp"
                                   className="appearance-none placeholder-gray-400 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5"
                                   placeholder="Whatsapp number"/>
                        </div>

                        <div className="facebook-id mt-4">
                            <input type="text" name="facebook-id" id="facebook-id"
                                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5"
                                   placeholder="facebook id"/>
                        </div>

                        <div className="language mt-4">
                            <input type="text" name="job-title" id="job-title"
                                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5"
                                   placeholder="Job title"/>
                        </div>


                        <div className="work-place mt-4">
                            <input type="text" name="work-place" id="work-place" placeholder="Work place"
                                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5"
                            />
                        </div>
                        <div className="countries-div mt-4">
                            <div onClick={handleCountriesClicked}
                                 className="language-_input w-full  relative  pr-0.5 text-lg">
                                <input name="countries" id="countries"
                                       className="countries cursor-pointer block w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5 "
                                />
                                <span className={"absolute top-2 right-1"}>
                                     <HiChevronDown
                                         className={`${countriesClicked ? "rotate-180" : "rotate-0"} cursor-pointer   transition-all duration-400`}

                                         onClick={handleCountriesSelectShow}
                                     />
                                </span>
                                <ul
                                    className={`${countriesSelectShow ? "h-auto block" : "h-0 hidden "}language_ul z-10 pl-5 mt-2  cursor-pointer transition-all duration-300`}
                                    onClick={() => handleCountriesClicked()}
                                >
                                    <li className="text-gray-100">Select your country</li>
                                    {content}
                                </ul>
                            </div>
                        </div>

                        <div className="language-div mt-4">
                            <div onClick={handleLanguageClicked}
                                 className="language-_input w-full  relative  pr-0.5 text-lg">
                                <input type="text" id="languages" value={selectedLanguage}
                                       placeholder="Preferred language"
                                       className="cursor-pointer block w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5 "
                                       onClick={handleLanguageSelectShow}
                                />
                                <span className={"absolute top-2 right-1"}>
                                     <HiChevronDown
                                         className={`${languageClicked ? "rotate-180" : "rotate-0"} cursor-pointer   transition-all duration-400`}

                                         onClick={handleLanguageSelectShow}
                                     />
                                </span>
                            </div>
                            <ul className={`${languageSelectShow ? "scale-100 animate-pulse" : "scale-0 animate-ping"}language_ul pl-5 mt-2  cursor-pointer transition-all duration-300`}
                                onClick={() => {
                                    handleLanguageClicked()
                                }}
                            >
                                <li className="flex flex-row hover:bg-lime-200 p-2 rounded-md transition-all ease-in-out duration-300"
                                    onClick={() => {
                                        handleLanguage('English')
                                        handleLanguageClicked()
                                        handleLanguageSelectShow()
                                    }}>
                                    <span className="language-flag w-6 h-6  rounded-full overflow-hidden">
                                        <img className="w-full h-full" src={English} alt="English"/>
                                    </span>
                                    <span className="language_title pl-3">English</span>
                                </li>
                                <li className="flex flex-row hover:bg-lime-200 p-2 rounded-md transition-all ease-in-out duration-300"
                                    onClick={() => {
                                        handleLanguage('Arabic');
                                        handleLanguageClicked()
                                        handleLanguageSelectShow()
                                    }}>
                                    <span className="language_flag w-6 h-6 rounded-full overflow-hidden">
                                        <img className="w-full h-full" src={Egypt} alt="Arabic"/>
                                    </span>
                                    <span className="language_title pl-3">Arabic</span>

                                </li>

                                <li className=" flex flex-row hover:bg-lime-200 p-2 rounded-md transition-all ease-in-out duration-300"
                                    onClick={() => {
                                        handleLanguage('Turkish');
                                        handleLanguageClicked()
                                        handleLanguageSelectShow()
                                    }}>
                                    <span className="language_flag w-6 h-6 rounded-full overflow-hidden">
                                        <img className="w-full h-full" src={Turkish} alt="Turkish"/>
                                    </span>
                                    <span className="language_title pl-3">Turkish</span>

                                </li>
                                <li className=" flex flex-row hover:bg-lime-200 p-2 rounded-md transition-all ease-in-out duration-300"
                                    onClick={() => {
                                        handleLanguage('French');
                                        handleLanguageClicked()
                                        handleLanguageSelectShow()
                                    }}>
                                    <span className="language_flag w-6 h-6 rounded-full overflow-hidden">
                                        <img className="w-full h-full" src={French} alt="French"/>
                                    </span>
                                    <span className="language_title pl-3">French</span>

                                </li>
                            </ul>
                        </div>


                        {/*Button*/}
                        <div className="mt-6 block w-full flex justify-between rounded-md">
                            <button
                                className="w-full flex justify-center py-2 px-4  shadow-sm shadow-lime-400 border border-transparent sm:text-sm font-extrabold rounded-md  text-red-800 border-2 border-stone-400 bg-lime-400 hover:border-indigo-300  transition-all duration-150 ease-in-out">
                                Register
                            </button>
                        </div>
                    </form>
                </div>

                {/*<div className="mt-6 block w-full flex justify-between rounded-md">*/}

                {/*    <button onClick={handlePrev}*/}
                {/*            className={`${step === 1 ? 'invisible' : 'block'} w-1/6 flex justify-center py-2 px-4  shadow-sm border border-transparent sm:text-sm font-medium rounded-md   text-red-800 border-2 border-lime-400 font-extrabold*/}
                {/*                 active:bg-stone-100 transition-all duration-150 ease-in-out`}>*/}
                {/*        Prev*/}
                {/*    </button>*/}
                {/*    <button onClick={handleNext}*/}
                {/*            className={`${step > 3 ? 'invisible' : 'block'} w-1/6 flex justify-center py-2 px-4  shadow-sm border border-transparent sm:text-sm font-extrabold rounded-md  text-red-800 border-2 border-lime-400*/}
                {/*                active:bg-stone-100 transition-all duration-150 ease-in-out`}>*/}
                {/*        Next*/}
                {/*    </button>*/}
                {/*</div>*/}
                {/*<div className="w-full border-b-lime-400">*/}
                {/*    <ProgressBar increase={progressValue}/>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default CreateDoctor;