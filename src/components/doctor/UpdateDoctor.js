import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import BASE_URL from "../../app/apis/baseUrl";
import useAuth from "../../hooks/useAuth";
import {Link, useNavigate} from "react-router-dom";
import {HiChevronDown} from "react-icons/hi";
import {useFetchCountriesQuery} from "../../app/apis/countryApi";
import Skeleton from "../Skeleton";


function UpdateDoctor() {
    const {auth} = useAuth();
    const errRef = useRef(false);
    const navigate = useNavigate();
    const currentDoctor = {...auth};

    let content;
    let specialtyContent;

    const {data, error, isFetching} = useFetchCountriesQuery();

    const [doctorData, setDoctorData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [facebook, setFacebook] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [workPlace, setWorkPlace] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [specialties, setSpecialties] = useState([])
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [selectedSpecialtyText, setSelectedSpecialtyText] = useState("");
    const [specialtyShow, setSpecialtyShow] = useState(false);
    const [specialtyClicked, setSpecialtyClicked] = useState(false);
    const [selectedCountryText, setSelectedCountryText] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedLanguageText, setSelectedLanguageText] = useState("");
    const [description, setDescription] = useState("");
    const [languageClicked, setLanguageClicked] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [languageSelectShow, setLanguageSelectShow] = useState(false);
    const [countriesClicked, setCountriesClicked] = useState(false);
    const [countriesSelectShow, setCountriesSelectShow] = useState(false);

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

    if (isFetching) {
        content = <Skeleton className="w-full h-4" times={4}/>
    } else if (error) {
        content = <div>Data error loading...</div>
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

    const getDoctorData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/doctors/me`, {
                withCredentials: true
            });
            const result = response?.data?.data;
            console.log(result)
            setDoctorData(result);
            setFname(result.firstName);
            setLname(result.lastName);
            setEmail(result.email);
            setWhatsapp(result.whatsapp);
            setFacebook(result.facebook);
            setJobTitle(result.jobTitle);
            setWorkPlace(result.workPlace);
            setSelectedCountry(result.country.id)
            setSelectedSpecialty(result.specialty._id);
            setSelectedSpecialtyText(result.specialty.title);
            setSelectedCountryText(result.country.title);
            setSelectedLanguage(result.language.id);
            setSelectedLanguageText(result.language.title);
            setDescription(result.description);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getSpecialties();
        getLanguages();
        if (auth?.token) {
            getDoctorData();
        }
    }, []);

    useEffect(() => {
        setErrMsg('')
    }, [fname, lname, email, whatsapp, facebook, selectedSpecialty, jobTitle, workPlace, selectedCountry, selectedLanguage, description]);

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        validate();

        if (Object.keys(errors).length > 0) {
            setErrMsg('Please fill all require fields!')
            return false;
        }

        const updatedData = {
            fname,
            lname,
            email,
            whatsapp,
            facebookId: facebook,
            specialty: selectedSpecialty,
            jobTitle,
            workPlace,
            country: selectedCountry,
            language: selectedLanguage,
            description
        }

        console.log(updatedData)

        try {
            setIsLoading(true);
            const response = await axios.patch(`${BASE_URL}/doctors/updateMe`,
                updatedData,
                {withCredentials: true,}
            );
            console.log(response)
            const result = await response.data
            // console.log(response)
            // console.log("Signup successful:", result);
            setFname('');
            setLname('');
            setEmail('');
            setWhatsapp('');
            setFacebook('');
            setSelectedSpecialty('');
            setSelectedSpecialtyText('');
            setJobTitle('');
            setWorkPlace('')
            setWhatsapp('')
            setSelectedCountry('');
            setSelectedCountryText('');
            setSelectedLanguage('');
            setSelectedLanguageText('');
            setDescription('')
            setIsLoading(false)
            navigate('/doctor')


        } catch (err) {
            if (err?.response?.status === 400) {
                setErrMsg(err.response?.data)
                setIsLoading(false)

            } else if (err.response?.status === 409) {
                setErrMsg("Username taken");
                setIsLoading(false)

            } else {
                // console.log(`Error code is: ${err.code}`)
                // console.log(`Error is: ${(err?.response?.data)}`)
                console.log(err)
                setIsLoading(false)

                // setErrMsg(err?.response.data)
            }
            errRef.current.focus();
        }
    }


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
                            Doctor registration.
                        </h2>
                        <p className="mt-1 text-center text-sm leading-5 text-gray-500 max-w">
                            I have an account:<span> </span>
                            <Link to="/doctor"
                                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150 px-1 border border-b-lime-400 rounded-l  hover:text-lime-600 transition-all">
                                Doctor Page
                            </Link>
                        </p>
                    </div>

                </div>
                <div className=" sm:px-10 bg-white mb-8 py-8 px-4 shadow-lg sm:rounded-lg">
                    <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">


                        <div className=" full-name mt-1 flex flex-row justify-between relative rounded-md ">
                            <div className="fname w-5/12 mt-1 flex flex-row justify-between relative rounded-md ">
                                {/*<label htmlFor="fname"*/}
                                {/*       className="block text-sm font-medium leading-5  text-gray-700">Name</label>*/}
                                <input id="fname" name="fname" placeholder="First name *" type="text" required=""
                                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-lime focus:border-lime-400 transition duration-150 ease-in-out shadow-sm text-lg sm:leading-5"
                                       value={fname}
                                       onChange={(e) => handleFname(e)}
                                />
                            </div>
                            <div className="lname w-5/12 mt-1 flex flex-row justify-between relative rounded-md ">
                                {/*<label htmlFor="lname"*/}
                                {/*       className="block text-sm font-medium leading-5  text-gray-700">Name</label>*/}
                                <input id="lname" name="lname" placeholder="Family name *" type="text" required=""
                                       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-lime focus:border-lime-400 transition duration-150 ease-in-out text-lg shadow-sm sm:leading-5"
                                       value={lname}
                                       onChange={(e) => handleLname(e)}
                                />
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
                                       text-lg text-stone-700  ease-in-out  sm:leading-5"
                                       value={email}
                                       onChange={(e) => handleEmail(e)}
                                />
                            </div>
                        </div>

                        <div className="whatsapp mt-4">
                            <input type="text" name="whatsapp" id="whatsapp"
                                   className="appearance-none placeholder-gray-400 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5"
                                   placeholder="Whatsapp number"
                                   value={whatsapp}
                                   onChange={(e) => handleWhatsapp(e)}
                            />
                        </div>

                        <div className="facebook-id mt-4">
                            <input type="text" name="facebook-id" id="facebook-id"
                                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5"
                                   placeholder="facebook id"
                                   value={facebook}
                                   onChange={(e) => handleFacebook(e)}
                            />
                        </div>

                        <div className="specialty mt-4 relative">
                            <input type="text" name="specialty" id="specialty"
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

                        <div className="job-title mt-4">
                            <input type="text" name="job-title" id="job-title"
                                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5"
                                   placeholder="Job title"
                                   value={jobTitle}
                                   onChange={(e) => handleJobTitle(e)}
                            />
                        </div>

                        <div className="work-place mt-4">
                            <input type="text" name="work-place" id="work-place" placeholder="Work place"
                                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5"

                                   value={workPlace}
                                   onChange={(e) => handleWorkPlace(e)}
                            />
                        </div>
                        <div className="countries-div mt-4"
                        >
                            <div onClick={(e) => {
                                handleCountriesClicked()
                            }}
                                 className="countries-input w-full  relative  pr-0.5 text-lg">
                                <input name="countries" id="countries"
                                       className="countries cursor-pointer block w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5 "
                                       autoComplete="off"
                                       value={selectedCountryText ? selectedCountryText : ''}
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
                                    {content}
                                </ul>
                            </div>
                        </div>

                        <div className="language-div mt-4 relative ">
                            <input type="text" id="languages"
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

                        <div className="description">
                            <textarea name="description" id="description" cols="30" rows="6"
                                      className={`${errors.description === true ? "border-red-600" : "border-gray-300"} appearance-none block w-full mt-4 px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5`}
                                      required
                                      value={description}
                                      onChange={(e) => handleDescription(e)}
                                      placeholder="Description *"
                            >

                            </textarea>
                        </div>

                        {/*Button*/}
                        <div className="mt-6 block w-full flex justify-between rounded-md">
                            <button type="submit" onClick={handleSubmit}
                                    className="w-full flex justify-center py-2 px-4  shadow-sm shadow-lime-400 border border-transparent sm:text-sm font-extrabold rounded-md  text-red-800 border-2 border-stone-400 bg-lime-400 hover:border-indigo-300  transition-all duration-150 ease-in-out">
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default UpdateDoctor;