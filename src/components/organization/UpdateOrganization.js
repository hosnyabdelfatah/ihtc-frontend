import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useFetchCountriesQuery} from "../../app/apis/countryApi";
import useAuth from "../../hooks/useAuth";
import Skeleton from "../Skeleton";
import axios from "axios";
import BASE_URL from "../../app/apis/baseUrl";
import {HiChevronDown} from "react-icons/hi";
import {useAlert} from "../../context/AlertProvider";

function UpdateOrganization(props) {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const errRef = useRef(false);

    const {showAlert, hideAlert} = useAlert();
    const handleProcess = async (message, type) => {
        showAlert(message, type);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        hideAlert();
    }

    let content;


    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [countriesClicked, setCountriesClicked] = useState(false);
    const [countriesSelectShow, setCountriesSelectShow] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [phone, setPhone] = useState('');
    const [mobile, setMobile] = useState('');
    const [industry, setIndustry] = useState('');
    const [country, setCountry] = useState('');
    const [selectedCountryText, setSelectedCountryText] = useState();
    const [description, setDescription] = useState('');

    const {data, error, isFetching} = useFetchCountriesQuery();

    const handleSelectCountry = (countryId) => setSelectedCountry(countryId)
    const handleSelectedCountryText = (countryText) => setSelectedCountryText(countryText)
    const handleCountriesSelectShow = () => setCountriesSelectShow(!countriesSelectShow);
    const handleCountriesClicked = () => setCountriesClicked(!countriesClicked);

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

    if (isFetching) {
        content = <Skeleton className="w-full h-4" times={4}/>
    } else {
        content = data?.data?.map((country) => {
            return <li key={country?.id} value={country?.id}
                       onClick={() => {
                           handleCountriesClicked()
                           handleSelectCountry(country?.id)
                           handleSelectedCountryText(country?.title)
                       }}
                       className="text-left p-1 rounded hover:cursor-pointer hover:bg-lime-200"
            >
                {country.title}
            </li>
        });
    }


    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePhone = (e) => setPhone(e.target.value);
    const handleMobile = (e) => setMobile(e.target.value);
    const handleIndustry = (e) => setIndustry(e.target.value);
    // const handleSelectedCountry = (e) => setCountry()
    const handleDescription = (e) => setDescription(e.target.value);

    let errors = {}
    const validate = () => {
        let formError = {};

        if (!name || name === '') {
            formError['name'] = 'Name is require!';
            errors['name'] = true;
        }
        if (!email || email === '') {
            formError['email'] = 'Email is require!';
            errors['email'] = true;
        }

        if (!phone || phone === '') {
            errors['phone'] = true
            formError['phone'] = 'Phone is require!';
        }
        if (!mobile || mobile === '') {
            formError['mobile'] = 'Mobile is require!';
            errors['mobile'] = true;
        }
        if (!industry || industry === '') {
            formError['industry'] = 'Industry field is require!';
            errors['industry'] = true;
        }
        if (!selectedCountry || selectedCountry === '') {
            // console.log(selectedCountry)
            formError['country'] = 'Country is require!';
            errors['country'] = true;
        }
        if (!description || description === '') {
            formError['description'] = 'Description is require!';
            errors['description'] = true;
        }

        if (Object.keys(formError).length > 0) {
            // formError.map(err => setErrMsg(prevState => prevState + "" + err))
            for (const value of Object.values(formError)) {
                setErrMsg(prevState => prevState + "|" + value);
            }
            // setErrMsg('Please fill all require fields. thank you');
            console.log(formError)
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        setErrMsg('')
    }, [name, email, industry, country, selectedCountry, description]);

    const updatedOrganizationData = {
        name, email, phone, mobile,
        industryField: industry,
        country: selectedCountry,
        description
    }

    const currentOrganizationData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/organizations/me/${auth.id}`, {
                withCredentials: true
            });
            const result = response?.data?.data
            setName(result?.name);
            setEmail(result?.email);
            setPhone(result?.phone);
            setMobile(result?.mobile);
            setIndustry(result?.industryField);
            setCountry(result?.country.id);
            setSelectedCountry(result?.country.id);
            setSelectedCountryText(result?.country.title);
            setDescription(result?.description);

        } catch (err) {
            console.log(err)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(updatedOrganizationData)

        if (!validate()) return false;
        if (Object.keys(errors) > 0) return false;

        try {
            setLoading(true);
            const response = await axios.patch(`${BASE_URL}/organizations/updateOrganization/${auth.id}`, updatedOrganizationData, {
                withCredentials: true,
            });

            setName('');
            setEmail('');
            setPhone('');
            setMobile('');
            setIndustry('');
            setSelectedCountry('')
            setSelectedCountryText('');
            setDescription('');

            setLoading(false);
            handleProcess("Update success");
            navigate('/organization');
        } catch (err) {
            if (err.response?.status === 409) {

                setErrMsg("Username taken");
            } else {
                setErrMsg(err?.response?.data.message);
            }
            errRef.current.focus();
        }
    }

    useEffect(() => {
        currentOrganizationData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center  sm:px-6 lg:px-8 relative">
            {/*top-[-190px] top-[-88] translate-y-[your value px]  */}
            <div
                className={`${errMsg ? "translate-y-[3px] " : 'translate-y-[-190px]'} error-message fixed top-0 z-20  left-[20%] w-[60%] h-auto mx-auto bg-red-700  text-md  text-white text-center font-semibold p-4 transition-all rounded-md`}
                ref={errRef}>
                {errMsg}
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="registration-title  justify-evenly content-baseline ">
                        <h2 className="mt-3 text-center  text-xl leading-5 font-bold text-gray-500">
                            Update Organization Profile.
                        </h2>
                        <p className="my-3 text-left text-sm leading-5 text-gray-500 max-w">

                            <Link to="/organization"
                                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150 px-1 border border-b-amber-400 rounded-l  hover:text-lime-600 transition-all">
                                Organization Page
                            </Link>
                        </p>
                    </div>

                </div>
                <div className=" sm:px-10 bg-white mb-8 py-8 px-4 shadow-lg sm:rounded-lg">
                    <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">

                        <div className=" full-name mt-1 flex flex-row justify-between relative rounded-md ">
                            <div className="name w-full mt-1 flex flex-row justify-between relative rounded-md ">
                                {/*<label htmlFor="name"*/}
                                {/*       className="block text-sm font-medium leading-5  text-gray-700">Name</label>*/}
                                <input id="name" name="name" placeholder="Organization name *" type="text"
                                       required
                                       value={name}
                                       onChange={(e) => handleName(e)}
                                       className={`${errors.name ? "border-red-600" : "border-gray-300"} appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-lime focus:border-lime-400 transition duration-150 ease-in-out text-lg shadow-sm sm:leading-5`}/>
                            </div>
                        </div>

                        <div className="mt-4">
                            {/*<label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">*/}
                            {/*    Email*/}
                            {/*</label>*/}
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input id="email" name="email" placeholder="Email: user@example.com *" type="email"
                                       value={email}
                                       onChange={(e) => handleEmail(e)}
                                       autoComplete="off"
                                       required={true}
                                       className={`${errors.email && "border-red-600"} block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-lime focus:border-lime-400 transition duration-150
                                       text-lg text-stone-700  ease-in-out  sm:leading-5`}/>
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

                        <div className="phone mt-4">
                            <input type="text" name="phone" id="phone"
                                   required
                                   value={phone}
                                   onChange={(e) => handlePhone(e)}
                                   className={`${errors.phone && "border-red-600"} appearance-none placeholder-gray-400 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5`}
                                   placeholder="Phone number *"/>
                        </div>

                        <div className="mobile mt-4">
                            <input type="text" name="job-title" id="job-title"
                                   required
                                   value={mobile}
                                   onChange={(e) => handleMobile(e)}
                                   className={`${errors.mobile && "border-red-600"} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5`}
                                   placeholder="Mobile *"/>
                        </div>


                        <div className="industry-field mt-4">
                            <input type="text" name="industry-field" id="industry-field" placeholder="Industry Field *"
                                   required
                                   value={industry}
                                   onChange={(e) => handleIndustry(e)}
                                   className={`${errors.industry && "border-red-600"} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5`}
                            />
                        </div>
                        <div className="countries-div mt-4">
                            <div onClick={handleCountriesClicked}
                                 className="language-_input w-full  relative  pr-0.5 text-lg">
                                <input name="country" id="countries"
                                       className={`${errors.country && "border-red-600"} countries cursor-pointer block w-full px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5`}
                                    // required
                                       autoComplete="off"
                                       value={selectedCountryText ? selectedCountryText : ''}
                                       placeholder="Select country *"
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
                                    className={`${countriesSelectShow ? "h-[120px] block" : "h-0 hidden "} country_ul z-30 bg-white w-full px-2 absolute border cursor-pointer transition-all duration-300 overflow-y-scroll`}
                                    onClick={() => {
                                        handleCountriesClicked()
                                        handleCountriesSelectShow()
                                    }}
                                >
                                    {content}
                                </ul>
                            </div>
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
                            <button type="submit"
                                    onClick={handleSubmit}
                                    className="w-full flex justify-center py-2 px-4  shadow-sm shadow-lime-400 border border-transparent sm:text-lg font-bold rounded-md  text-red-800 border-2 border-stone-400 bg-lime-400 hover:border-indigo-300  transition-all duration-150 ease-in-out">
                                {loading ? circleSpinner : <span>Update</span>}

                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default UpdateOrganization;