import React, {useState, useRef, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Skeleton from "../Skeleton";
import {useFetchCountriesQuery} from "../../app/apis/countryApi";
import axios from "axios";
import BASE_URL from "../../app/apis/baseUrl";
import {HiChevronDown} from "react-icons/hi";

function UpdateUserData(props) {
    const {auth} = useAuth();

    let content;
    let specialtyContent;

    const errRef = useRef(false);
    const navigate = useNavigate();

    const {data, error, isFetching} = useFetchCountriesQuery();
    if (isFetching) {
        content = <Skeleton className="w-full h-4" times={4}/>
    } else {
        content = data.data.map((country) => {
            return <li key={country.id} value={country.id}
                       onClick={(e) => {
                           e.stopPropagation()
                           handleCountriesClicked()
                           handleCountriesSelectShow()
                           handleSelectedCountry(country.id)
                           handleSelectedCountryText(country.title)
                       }}
                       className="text-left p-1 rounded hover:cursor-pointer
                       hover:bg-lime-200"
            >
                {country.title}
            </li>
        });
    }

    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [facebook, setFacebook] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [workPlace, setWorkPlace] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [specialties, setSpecialties] = useState([])
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedSpecialtyText, setSelectedSpecialtyText] = useState('');
    const [specialtyShow, setSpecialtyShow] = useState(false);
    const [specialtyClicked, setSpecialtyClicked] = useState(false);
    const [selectedCountryText, setSelectedCountryText] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedLanguageText, setSelectedLanguageText] = useState('');
    const [description, setDescription] = useState('');

    const [languageClicked, setLanguageClicked] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [languageSelectShow, setLanguageSelectShow] = useState(false);
    const [countriesClicked, setCountriesClicked] = useState(false);
    const [countriesSelectShow, setCountriesSelectShow] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSelectedLanguage = (lang) => setSelectedLanguage(lang);
    const handleSelectedLanguageText = (lang) => setSelectedLanguageText(lang);
    const handleSelectedCountry = (countryId) => setSelectedCountry(countryId);
    const handleSelectedCountryText = (countryTitle) => setSelectedCountryText(countryTitle);
    const handleCountriesSelectShow = () => setCountriesSelectShow(!countriesSelectShow);
    const handleLanguageClicked = () => setLanguageClicked(!languageClicked);
    const handleCountriesClicked = () => setCountriesClicked(!countriesClicked);
    const handleLanguageSelectShow = () => setLanguageSelectShow(!languageSelectShow);

    const handleSpecialtyClicked = () => setSpecialtyClicked(!specialtyClicked);
    const handleSpecialtyShow = () => setSpecialtyShow(!specialtyShow);


    const handleFname = (e) => setFname(e.target.value)
    const handleLname = (e) => setLname(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value);
    const handleWhatsapp = (e) => setWhatsapp(e.target.value);
    const handleFacebook = (e) => setFacebook(e.target.value);

    const handleSelectedSpecialty = (specialtyId) => setSelectedSpecialty(specialtyId);
    const handleSelectedSpecialtyText = (specialtyText) => {
        setSelectedSpecialtyText(specialtyText);
    }
    const handleJobTitle = (e) => setJobTitle(e.target.value);
    const handleWorkPlace = (e) => setWorkPlace(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);

    const getSpecialties = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/specialties`);
            setSpecialties([...response?.data?.data]);
        } catch (err) {
            // console.log(err)
        }
    }

    const getLanguages = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/languages`);
            const result = response?.data.data
            setLanguages(result);
        } catch (err) {
            // console.log(err)
            setErrMsg(err.message)
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

    specialtyContent = specialties?.sort((a, b) => {
            if (a.title < b.title) {
                return -1
            }
            if (a.title > b.title) {
                return 1
            }
            return 0
        }
    ).map((specialty, index) => {
        return <li key={index} value={specialty.id}
                   className="text-left p-1  rounded hover:cursor-pointer hover:bg-lime-200"
                   onClick={(e) => {
                       handleSpecialtyShow()
                       handleSpecialtyClicked(e)
                       handleSelectedSpecialty(specialty._id)
                       handleSelectedSpecialtyText(specialty.title)
                   }}
        >
            {specialty.title}
        </li>
    });

    const languagesContent = languages?.map(language => {
        return <li key={language._id}
                   className="flex flex-row hover:bg-lime-200 p-2 rounded-md transition-all ease-in-out duration-300"
                   onClick={() => {
                       handleSelectedLanguage(language._id)
                       handleSelectedLanguageText(language.title)
                       handleLanguageClicked()
                       handleLanguageSelectShow()
                   }}>
                                    <span className="language-flag w-6 h-6  rounded-full overflow-hidden">
                                    </span>
            <span className="language_title pl-3">{language.title}</span>
        </li>
    });

    const errors = {}
    const validate = () => {
        if (!fname || fname === '') errors['fname'] = true;
        if (!lname || lname === '') errors['lname'] = true;
        if (!email || email === '') errors['email'] = true;
        if (!whatsapp || whatsapp === '') errors['whatsapp'] = true;
        if (!facebook || facebook === '') errors['facebook'] = true;
        if (!jobTitle || jobTitle === '') errors['jobTitle'] = true;
        if (!workPlace || workPlace === '') errors['workPlace'] = true;
        if (!selectedCountry || selectedCountry === '') errors['selectedCountry'] = true;
        if (!selectedLanguage || selectedLanguage === '') errors['selectedLanguage'] = true;
    }

    const updatedData = {
        fname, lname, email, whatsapp,
        facebookId: facebook,
        specialty: selectedSpecialty,
        jobTitle, workPlace,
        country: selectedCountry,
        language: selectedLanguage
    }


    const handleSubmit = async (e) => {

        e.preventDefault();
        validate();

        if (Object.keys(errors).length > 0) {
            setErrMsg('Please fill all require fields!')
            return false;
        }

        try {
            setIsLoading(true);
            const response = await axios.patch(`${BASE_URL}/users/updateMe/${auth.id}`, updatedData);

            const result = await response?.data?.data;

            setErrMsg(`Registration is ${response.data.status}`);

            setFname('');
            setLname('');
            setEmail('');
            setWhatsapp('');
            setFacebook('');
            setSelectedSpecialty('');
            setSelectedSpecialtyText('');
            setJobTitle('');
            setWhatsapp('')
            setSelectedCountry('');
            setSelectedCountryText('');
            setSelectedLanguage('');
            setSelectedLanguageText('');
            setDescription('')
            setSuccess(true)
            setIsLoading(false);

            navigate('/user');


        } catch (err) {
            setIsLoading(false);
            if (err.response?.status === 409) {
                setErrMsg("Username taken");
            } else {
                // console.log(`Error is: ${err}`)
                // console.log(`Error is: ${(err.response.data)}`)
                setErrMsg(err?.response)
            }
            errRef.current.focus();
        }
    }

    const getCurrentUser = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/me/${auth.id}`, {
                withCredentials: true
            });

            const result = response?.data?.data;
            setCurrentUser(result)

            setFname(result.fname);
            setLname(result.lname);
            setEmail(result?.email);
            setWhatsapp(result?.whatsapp);
            setFacebook(result?.facebookId);
            setJobTitle(result?.jobTitle);
            setWorkPlace(result?.workPlace);
            setSelectedCountry(result?.country?.id);
            setSelectedSpecialty(result?.specialty?._id);
            setSelectedSpecialtyText(result?.specialty?.title);
            setSelectedCountryText(result?.country?.title);
            setSelectedLanguage(result?.language?.id);
            setSelectedLanguageText(result?.language?.title);
            setDescription(result?.description);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setErrMsg('')
    }, [fname, lname, email, whatsapp, facebook, , selectedSpecialty, jobTitle, workPlace, selectedCountry, selectedLanguage, description]);


    useEffect(() => {
        getCurrentUser();
        getSpecialties();
        getLanguages();
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center  sm:px-6 lg:px-8">
            <div
                className={`${errMsg ? "translate-y-[3px] " : 'translate-y-[-190px]'} error-message fixed top-0 z-20  left-[20%] w-[60%] h-auto mx-auto bg-red-700  text-md  text-white text-center font-semibold p-4 transition-all rounded-md`}
                ref={errRef}>
                {errMsg}
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">

                    <div className="registration-title  justify-evenly content-baseline ">
                        <h2 className="mt-3 text-center  text-xl leading-5 font-bold text-gray-500">
                            Update User.
                        </h2>
                        <p className="mt-1 text-center text-sm leading-5 text-gray-500 max-w">
                            Go to
                            <Link to="/user"
                                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150 px-1 border border-b-lime-400 rounded-l  hover:text-lime-600 transition-all">
                                {auth.firstName + " " + auth.lastName}
                            </Link>
                        </p>
                    </div>

                </div>
                <div className=" sm:px-10 bg-white mb-8 py-8 px-4 shadow-lg sm:rounded-lg">
                    <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className=" full-name mt-1 flex flex-row justify-between relative rounded-md ">
                            <div
                                className="fname w-5/12 mt-1 flex flex-row justify-between relative rounded-md relative">
                                <label htmlFor="fname"
                                       className="block text-sm font-medium leading-5
                                         text-xs text-blue-700 absolute top-[-18px] left-[-8px]">
                                    First Name
                                </label>
                                <input id="fname" name="fname" placeholder="First name *" type="text" required
                                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-lime focus:border-lime-400 transition duration-150 ease-in-out shadow-sm text-lg sm:leading-5"
                                       value={fname}
                                       onChange={(e) => {
                                           handleFname(e);
                                       }
                                       }
                                />
                            </div>
                            <div className="lname w-5/12 mt-1 flex flex-row justify-between relative rounded-md ">
                                <label htmlFor="lname"
                                       className="block text-sm font-medium leading-5
                                         text-xs text-blue-700 absolute top-[-18px] left-[-8px]">
                                    Last Name
                                </label>
                                <input id="lname" name="lname" placeholder="Family name *" type="text" required
                                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-lime focus:border-lime-400 transition duration-150 ease-in-out text-lg shadow-sm sm:leading-5"
                                       value={lname}
                                       onChange={(e) => {
                                           handleLname(e)
                                       }
                                       }
                                />
                            </div>
                        </div>

                        <div className="mt-4 relative">
                            <label htmlFor="email"
                                   className="block text-sm font-medium leading-5
                                         text-xs text-blue-700 absolute top-[-18px] left-[-8px]">
                                Email
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input id="email" name="email" placeholder="Email: user@example.com *" type="email"
                                       autoComplete="off"
                                       required
                                       className=" block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-lime focus:border-lime-400 transition duration-150
                                       text-lg text-stone-700  ease-in-out  sm:leading-5"
                                       value={email}
                                       onChange={(e) => {
                                           handleEmail(e)
                                       }}
                                />
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

                        <div className="whatsapp mt-4 relative">
                            <label htmlFor="whatsapp"
                                   className="block text-sm font-medium leading-5
                                         text-xs text-blue-700 absolute top-[-18px] left-[-8px]">
                                Whatsapp
                            </label>
                            <input type="text" name="whatsapp" id="whatsapp"
                                   className="appearance-none placeholder-gray-400 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5"
                                   placeholder="Whatsapp number"
                                   value={whatsapp}
                                   onChange={(e) => {
                                       handleWhatsapp(e)
                                   }}
                            />
                        </div>

                        <div className="facebook-id mt-4 relative">
                            <label htmlFor="facebook"
                                   className="block text-sm font-medium leading-5
                                         text-xs text-blue-700 absolute top-[-18px] left-[-8px]">
                                Facebook
                            </label>
                            <input type="text" name="facebook" id="facebook"
                                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5"
                                   placeholder="facebook id"
                                   value={facebook}
                                   onChange={(e) => {
                                       handleFacebook(e)
                                   }}
                            />
                        </div>

                        <div className="specialty mt-4 relative"
                        >
                            <label htmlFor="specialty"
                                   className="block text-sm font-medium leading-5
                                         text-xs text-blue-700 absolute top-[-18px] left-[-8px]">
                                Specialty
                            </label>
                            <input name="specialty" type="hidden" value={selectedSpecialty} onChange={() => {
                            }}/>
                            <input type="text" id="specialty"
                                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 cursor-pointer focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5"
                                   autoComplete="off"
                                   placeholder="Specialty"
                                   value={selectedSpecialtyText}
                                   onClick={handleSpecialtyShow}
                                   onChange={(e) => {
                                       handleSpecialtyClicked(e)
                                   }}
                            />
                            <span className={"absolute top-2 right-1"}>
                                     <HiChevronDown
                                         className={`${specialtyShow ? "rotate-180" : "rotate-0"} cursor-pointer   transition-all duration-400`}
                                         onClick={(e) => {
                                             handleSpecialtyShow()
                                             handleSpecialtyClicked(e)
                                         }}
                                     />
                                </span>
                            <ul className={`${specialtyShow ? "h-[100px] block overflow-y-scroll " : "h-0 hidden"} specialty-list absolute w-full bg-white border-2`}
                            >
                                {specialtyContent}

                            </ul>
                        </div>

                        <div className="job-title mt-4 relative">
                            <label htmlFor="jobTitle"
                                   className="block text-sm font-medium leading-5
                                         text-xs text-blue-700 absolute top-[-18px] left-[-8px]">
                                Job Title
                            </label>
                            <input type="text" name="jobTitle" id="jobTitle"
                                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5"
                                   placeholder="Job title"
                                   value={jobTitle}
                                   onChange={(e) => {
                                       handleJobTitle(e)
                                   }}
                            />
                        </div>

                        <div className="work-place mt-4 relative">
                            <label htmlFor="workPlace"
                                   className="block text-sm font-medium leading-5
                                         text-xs text-blue-700 absolute top-[-18px] left-[-8px]">
                                Work Place
                            </label>
                            <input type="text" name="workPlace" id="workPlace" placeholder="Work place"
                                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5"

                                   value={workPlace}
                                   onChange={(e) => {
                                       handleWorkPlace(e)
                                   }}
                            />
                        </div>
                        <div className="countries-div mt-4 relative"
                        >
                            <label htmlFor="country"
                                   className="block text-sm font-medium leading-5
                                         text-xs text-blue-700 absolute top-[-18px] left-[-8px]">
                                Country
                            </label>
                            <div onClick={(e) => {
                                handleCountriesClicked()
                            }}
                                 className="countries-input w-full  relative  pr-0.5 text-lg">
                                <input name="country" type="hidden" value={selectedCountry} onChange={() => {
                                }}/>
                                <input name="countries" id="countries"
                                       className="countries cursor-pointer block w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5 "
                                       autoComplete="off"
                                       value={selectedCountryText}
                                       placeholder="Select Country"
                                       onChange={() => {
                                       }}
                                       onClick={handleCountriesSelectShow}
                                />
                                <span className={"absolute top-2 right-1"}>
                                     <HiChevronDown
                                         className={`${countriesClicked ? "rotate-180" : "rotate-0"} cursor-pointer   transition-all duration-400`}
                                         onClick={handleCountriesSelectShow}
                                     />
                                </span>
                                <ul
                                    className={`${countriesSelectShow ? "h-[100px] block" : "h-0 hidden "} language_ul w-full bg-white absolute overflow-y-scroll z-10 pl-5 border-2 cursor-pointer transition-all duration-300`}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleCountriesClicked()
                                    }}
                                >
                                    {
                                        isFetching
                                            ? <Skeleton className="w-full h-4" times={6}/>
                                            : content
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className="language-div mt-4 relative ">
                            <label htmlFor="language"
                                   className="block text-sm font-medium leading-5
                                         text-xs text-blue-700 absolute top-[-18px] left-[-8px]">
                                Language
                            </label>
                            <input name="language" type="hidden" value={selectedLanguage} onChange={() => {
                            }}/>
                            <input type="text"
                                   placeholder="Preferred language"
                                   autoComplete="off"
                                   className="cursor-pointer block w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5 "
                                   value={selectedLanguageText ? selectedLanguageText : ''}
                                   onChange={(e) => {
                                   }}
                                   onClick={handleLanguageSelectShow}
                            />
                            <div onClick={handleLanguageClicked}
                                 className="language-_input w-full    pr-0.5 text-lg">

                                <span className={"absolute top-2 right-1"}>
                                     <HiChevronDown
                                         className={`${languageClicked ? "rotate-180" : "rotate-0"} cursor-pointer   transition-all duration-400`}
                                         onClick={handleLanguageSelectShow}
                                     />
                                </span>
                            </div>
                            <ul className={`${languageSelectShow ? "h-auto block" : "h-0 hidden"} language_ul w-full bg-white pl-5   z-30 cursor-pointer absolute transition-all`}
                                onClick={() => {
                                    handleLanguageClicked()
                                }}
                            >
                                {languagesContent}
                            </ul>
                        </div>

                        <div className="description relative">
                            <label htmlFor="description"
                                   className="block text-sm font-medium leading-5
                                         text-xs text-blue-700 absolute top-[-18px] left-[-8px]">
                                Description
                            </label>
                            <textarea name="description" id="description" cols="30" rows="6"
                                      className={`${errors.description === true ? "border-red-600" : "border-gray-300"} appearance-none block w-full mt-4 px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5`}
                                      required
                                      value={description}
                                      onChange={(e) => {
                                          handleDescription(e)
                                      }}
                                      placeholder="Description *"
                            >

                            </textarea>
                        </div>

                        {/*Button*/}
                        <div className="mt-6 block w-full flex justify-between rounded-md">
                            <button type="submit" onClick={handleSubmit}
                                    className="w-full flex justify-center py-2 px-4  shadow-sm shadow-lime-400 border border-transparent sm:text-sm font-extrabold rounded-md  text-red-800 border-2 border-stone-400 bg-blue-400 hover:border-indigo-300  transition-all duration-150 ease-in-out">
                                {isLoading ? circleSpinner : <span>Update</span>}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default UpdateUserData;