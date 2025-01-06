import React, {useState, useRef, useEffect} from 'react';
import {useFetchCountriesQuery} from "../../app/apis/countryApi";
import {Link, useNavigate} from "react-router-dom";
import Skeleton from "../Skeleton";
import logo from "../../assets/images/logo-transparent.webp";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {HiChevronDown} from "react-icons/hi";
import axios from "axios";
import BASE_URL from "../../app/apis/baseUrl";
import {useAlert} from "../../context/AlertProvider";


const OrganizationSignup = () => {
    const navigate = useNavigate();
    const errRef = useRef(false);

    const {showAlert, hideAlert} = useAlert();
    const handleProcess = async (message, type) => {
        showAlert(message, type);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        hideAlert();
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

    let content;
    const [bannerPreview, setBannerPreview] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [success, setSuccess] = useState(false)

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [countriesClicked, setCountriesClicked] = useState(false);
    const [countriesSelectShow, setCountriesSelectShow] = useState(false);

    const [banner, setBanner] = useState('');
    const [logo, setLogo] = useState('');
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

    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
    const handleSelectCountry = (countryId) => setSelectedCountry(countryId)
    const handleSelectedCountryText = (countryText) => setSelectedCountryText(countryText)
    const handleCountriesSelectShow = () => setCountriesSelectShow(!countriesSelectShow);
    const handleCountriesClicked = () => setCountriesClicked(!countriesClicked);


    if (isFetching) {
        content = <Skeleton className="w-full h-4" times={4}/>
    } else {
        content = data.data.map((country) => {
            return <li key={country.id} value={country.id}
                       onClick={() => {
                           handleCountriesClicked()
                           handleSelectCountry(country.id)
                           handleSelectedCountryText(country.title)
                       }}
                       className="text-left p-1 rounded hover:cursor-pointer hover:bg-lime-200"
            >
                {country.title}
            </li>
        });
    }

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
    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPassword = (e) => setPasswordConfirm(e.target.value);
    const handlePhone = (e) => setPhone(e.target.value);
    const handleMobile = (e) => setMobile(e.target.value);
    const handleIndustry = (e) => setIndustry(e.target.value);
    // const handleSelectedCountry = (e) => setCountry()
    const handleDescription = (e) => setDescription(e.target.value);

    let errors = {}
    const validate = () => {
        let formError = {};
        if (!banner || banner === '') {
            formError['banner'] = 'Banner is require!';
            errors['banner'] = true
        }

        if (!logo || logo === '') {
            formError['logo'] = 'Logo is require!';
            errors['logo'] = true;
        }
        if (!name || name === '') {
            formError['name'] = 'Name is require!';
            errors['name'] = true;
        }
        if (!email || email === '') {
            formError['email'] = 'Email is require!';
            errors['email'] = true;
        }
        if (!password || password === '') {
            formError['password'] = 'Password is require!';
            errors['password'] = true;
        }
        if (!passwordConfirm || passwordConfirm === '') {
            formError['passwordConfirm'] = 'Password is require!';
            errors['passwordConfirm'] = true;
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
            setErrMsg('Please fill all require fields. thank you');
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        setErrMsg('')
    }, [logo, banner, name, email, password, passwordConfirm, industry, country, selectedCountry, description]);

    const newOrganization = {
        banner, logo, name, email, password, passwordConfirm, phone, mobile, industryField: industry,
        country: selectedCountry, description
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            handleProcess("Password not match password confirm!", 'error');
            return
        }
        if (!validate()) return false;
        if (Object.keys(errors) > 0) return false;

        const formData = new FormData();

        formData.append("banner", banner);
        formData.append("logo", logo);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("passwordConfirm", passwordConfirm);
        formData.append("phone", phone);
        formData.append("mobile", mobile);
        formData.append("industryField", industry);
        formData.append("country", selectedCountry);
        formData.append("description", description);

        try {
            setIsLoading(true);
            const response = await axios.post(`${BASE_URL}/organizations/organization-signup`, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
                data: formData,
                transformRequest: [
                    (data) => data,
                ]
            });

            setBanner('')
            setLogo('')
            setName('')
            setEmail('')
            setPassword('');
            setPasswordConfirm('');
            setPhone('');
            setMobile('');
            setIndustry('');
            setSelectedCountry('')
            setSelectedCountryText('');
            setDescription('');

            setSuccess(true);
            setIsLoading(false)
            handleProcess("Welcome inIHTC Community, please check your email");
            navigate('/')
        } catch (err) {
            setIsLoading(false)
            if (err.response?.status === 409) {
                // setErrMsg("Username taken");
                handleProcess("Username taken", "error");
            } else {
                // setErrMsg(err?.response?.data.message);
                handleProcess(err?.response?.data.message, "error");
            }
            errRef.current.focus();
        }
    }

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
                            Organization registration.
                        </h2>
                        <p className="mt-1 text-center text-sm leading-5 text-gray-500 max-w">
                            I have an account:<span> </span>
                            <Link to="/login"
                                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150 px-1 border border-b-lime-400 rounded-l  hover:text-lime-600 transition-all">
                                login
                            </Link>
                        </p>
                    </div>

                </div>
                <div className=" sm:px-10 bg-white mb-8 py-8 px-4 shadow-lg sm:rounded-lg">
                    <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">

                        <div className="upload-banner flex items-center justify-center w-full mb-4 ">
                            <label htmlFor="banner"
                                   className={`${errors.banner === true && "border-red-600"} flex flex-col items-center justify-center w-full h-30  border-gray-200 border shadow-sm  rounded-lg cursor-pointer  dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}>
                                <div
                                    className="flex flex-col items-center justify-center pt-5 pb-6">
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
                                                <p className="mb-2 text-sm text-gray-500 text-center dark:text-gray-400">Click
                                                    to
                                                    upload organization
                                                    <span className="bg-red-100">banner *</span></p>
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

                        <div className="upload-logo flex items-center justify-center  w-full mb-4">
                            <label htmlFor="logo"
                                   className={`${errors.logo === true && "border-red-600"} flex flex-col items-center justify-center w-8/12 h-30  border-gray-200 border shadow-sm  rounded-lg cursor-pointer  dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}>
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
                                                <p className="mb-2 text-sm text-gray-500 text-center dark:text-gray-400 ">Click
                                                    to
                                                    upload organization
                                                    <span className="bg-red-100"> logo *</span></p>
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

                        <div className="mt-4">
                            {/*<label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">*/}
                            {/*    Password*/}
                            {/*</label>*/}
                            <div className="mt-1 rounded-md shadow-sm relative">
                                <input id="password" name="password" type={showPassword ? "text" : "password"}
                                       required
                                       value={password}
                                       onChange={(e) => handlePassword(e)}
                                       placeholder="Password *"
                                       className={`${errors.password && "border-red-600"} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5`}
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
                                       required
                                       value={passwordConfirm}
                                       onChange={(e) => handleConfirmPassword(e)}
                                       placeholder="Confirm password *"
                                       className={`${errors.passwordConfirm && "border-red-600"} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-lime-400 transition duration-150 ease-in-out text-lg sm:leading-5`}
                                />
                                <span className="inline-block absolute text-gray-400 right-2 top-3"
                                      onClick={handleShowPasswordConfirm}>{showPasswordConfirm ?
                                    <FaRegEye/> :
                                    <FaRegEyeSlash/>}
                                </span>
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
                                {isLoading ? circleSpinner : <span>Register</span>}

                            </button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    );
};

export default OrganizationSignup;