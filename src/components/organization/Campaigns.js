import './campaign.css';
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import Skeleton from "../Skeleton";
import Pagination from "../Pagination";
import {getCurrentUser} from "../../features/currentUserSlice";
import {useAlert} from "../../context/AlertProvider";
import DoctorSpecialties from "../doctor/DoctorSpecialties";
import React, {useEffect, useRef, useState, useMemo} from "react";
import BASE_URL from "../../app/apis/baseUrl";
import Modal from "./Modal";
import {HiChevronDown} from "react-icons/hi";
import {IoSearchSharp} from "react-icons/io5";

const Campaigns = () => {
    const {showAlert, hideAlert} = useAlert();
    const handleProcess = async (message, type) => {
        showAlert(message, type);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        hideAlert();
    }


    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countryLoading, setCountryLoading] = useState(true);
    const [error, setError] = useState(null);
    const [doctorSpecialty, setDoctorSpecialty] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedDoctorSpecialty, setSelectedDoctorSpecialty] = useState('');
    const [selectedDoctorSpecialtyResult, setSelectedDoctorSpecialtyResult] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [countriesSelectShow, setCountriesSelectShow] = useState(false);
    const [countriesClicked, setCountriesClicked] = useState(false);
    const [selectedCountryText, setSelectedCountryText] = useState('');
    const [selectedCountryTextResult, setSelectedCountryTextResult] = useState('');
    const [searchDoctorsResultCount, setSearchDoctorsResultCount] = useState(0)
    const [searchDoctorsResult, setSearchDoctorsResult] = useState([]);
    const [selectedDoctors, setSelectedDoctors] = useState({});
    const [selectedReceivers, setSelectedReceivers] = useState([]);
    const [allSelectedDoctors, setAllSelectedDoctors] = useState([]);
    const [selectAllResult, setSelectAllResult] = useState();
    const [checkedItems, setCheckedItems] = useState({});
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [clearInput, setClearInput] = useState(false);
    const [clearSpecialty, setClearSpecialty] = useState(false);


    /*Pagination const*/
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    //End pagination const
    // const currentUser = useSelector(getCurrentUser);
    // console.log(currentUser)
    // const [search, setSearch] = useState('');

    const handleClearInput = () => {
        setClearInput(true)
        setTimeout(() => setClearInput(false), 0);
    }
    const handleClearSpecialty = () => {
        setClearSpecialty(true)
        setTimeout(() => setClearSpecialty(false), 0);
    }

    let countryContent;


    const handleClearConditions = () => {
        setIsSelectAll(false);
        handleClearSelectedDoctors()
        console.log(allSelectedDoctors)
        setSelectedCountry('')
        setSelectedDoctorSpecialtyResult('')
        setSelectedCountryTextResult('')
        setSelectedCountryText('');
        handleClearSpecialty()
    }

    const handleSearchDoctors = () => {
        handleSelectedDoctorSpecialtyResult();
        handleClearInput();
    }

    // const handleSelectedDoctor = (e) => {
    //     const isSelected = allSelectedDoctors.indexOf(e.target.value);
    //     // console.log(isSelected)
    //
    //     if (isSelected === -1) {
    //         setAllSelectedDoctors([...allSelectedDoctors, e.target.value]);
    //
    //
    //     } else {
    //         const newSelectedDoctors = allSelectedDoctors.filter(doctor => doctor !== e.target.value)
    //         // console.log(newSelectedDoctors)
    //         setAllSelectedDoctors([...newSelectedDoctors]);
    //     }
    // }

    const handleSelectedDoctorSpecialtyResult = () => {
        setSelectedDoctorSpecialtyResult(selectedDoctorSpecialty.title)
    }
////////Start New Select one and All //////
    const isSelected = (id) => id in selectedDoctors

    const handleChecked = (id) => {
        if (id in selectedDoctors) {
            const {[id]: _, ...rest} = selectedDoctors;
            setSelectedDoctors(rest);
        } else {
            setSelectedDoctors({...selectedDoctors, [id]: true});
        }
    };

    const handleSelectAllChecked = () => setIsSelectAll(!isSelectAll);

    const handleSelectAll = () => {
        console.log(isSelectAll)
        if (!isSelectAll) {
            // setSelectedDoctors((prev) => ({...prev, ...selectAllResult}))
            setSelectedDoctors({...selectedDoctors, ...selectAllResult})
            // console.log(selectedDoctors)
            // console.log(selectAllResult)
            console.log(Object.keys(selectedDoctors).length);
        } else {
            setSelectedDoctors({})
            setSelectedReceivers([])
            console.log(Object.keys(selectedDoctors).length);

        }

        // console.log(isSelectAll)
        // console.log(Object.keys(selectedDoctors).length);
    }

    const handleClearSelectedDoctors = () => {
        setSelectedDoctors({})
        setIsSelectAll(false)
        setCurrentPage(1)
    }

    const handleSelectedReceivers = (id) => {
        const receivers = [];

        for (let key of Object.keys(selectedDoctors)) {
            receivers.push(key)
        }
        setSelectedReceivers([...receivers]);
        console.log(receivers)
    }
    const handleValidateCreateCampaign = () => {

        if (selectedReceivers.length === 0) {
            handleProcess("You have to select at least one doctor to send campaign!", "error");
        }
        return selectedReceivers.length > 0;
    }


////////End New Sellect All //////

    const handleSelectAllDoctors = () => {
        if (!isSelectAll) {
            const selectedDoctors = searchDoctorsResult?.map(doctor => setAllSelectedDoctors([...allSelectedDoctors, doctor?._id]));
            setAllSelectedDoctors(Object.keys(checkedItems));
        }
    }

    const handleCheckboxChange = (id) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems, [id]: !prevCheckedItems[id]
        }))
    }

    const handleSelectCountry = (id) => {
        setSelectedCountry(id)
        setSelectedCountryText(countries.filter(country => country._id === id)[0].title)
        setSelectedCountryTextResult(countries.filter(country => country._id === id)[0].title)
    }

    const handleCountriesSelectShow = () => {
        setCountriesSelectShow(!countriesSelectShow);
    }

    const handleCountriesClicked = () => {
        setCountriesClicked(!countriesClicked);
    }


    const handleChildValue = (value) => {
        // console.log(doctorSpecialty)
        setDoctorSpecialty(value)
        setSelectedDoctorSpecialtyResult(value.title)
        // console.log(doctorSpecialty._id)
    }

    const handleShowModal = () => {
        console.log(selectedReceivers)
        if (!handleValidateCreateCampaign()) return;
        setShowModal(!showModal);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    countryContent = countries?.sort((a, b) => {
            if (a.title < b.title) {
                return -1
            }
            if (a.title > b.title) {
                return 1
            }
            return 0
        }
    ).map(country => {
        return countryLoading ? <Skeleton className="w-5 h-5" times={5}/>
            : <li value={country._id} key={country._id}
                  className="py-1.5 border-b-[1px] border-b-amber-400 cursor-pointer hover:bg-yellow-200"
                  onClick={() => {
                      handleCountriesClicked()
                      handleSelectCountry(country._id)
                      handleCountriesSelectShow()
                  }}
            >
                {country.title}
            </li>
    })


    const getAllDoctors = async (page) => {
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/doctors?`, {
                params: {page, limit: itemsPerPage, country: selectedCountry, specialty: selectedDoctorSpecialty._id}
            });

            const result = response?.data.data;
            console.log(response)
            setDoctors(result);
            setSearchDoctorsResultCount(response?.data?.countResultDocuments);
            setTotalPages(response?.data?.totalCurrentSearchDoctorsPages);
            setSelectAllResult(response?.data?.selectAllSearchResult);
            // console.log(totalPages)
            console.log(response?.data?.selectAllSearchResult)
        } catch (error) {
            // console.error('Fetch error:', error);
            setError(`Fetch error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setSelectedDoctorSpecialty(doctorSpecialty)
    }, [doctorSpecialty]);


    useEffect(() => {
        getAllDoctors(currentPage);
    }, [currentPage, searchDoctorsResult]);

    const getCountries = async () => {
        try {
            setCountryLoading(true);
            const response = await axios.get(`${BASE_URL}/countries`)
            const result = response?.data?.data
            // console.log(result)
            setCountryLoading(false);
            setCountries(result)

        } catch (err) {
            setCountryLoading(false);
            console.log(err);
            // handleProcess
        }
    }

    useEffect(() => {
        getCountries();
        getAllDoctors();
    }, []);

    return (
        <div className="w-[90%] mx-auto relative max-h-screen flex flex-col mb-8">

            <div
                className="search-bar  w-full min-h-8 flex flex-row justify-between items-center ">
                <div className="selected-country_container relative w-[20%]
                 outline-none active:outline-none flex flex-row items-center
                ">
                    <span className="relative mr-3"
                          onClick={() => {
                              handleCountriesSelectShow()
                              handleCountriesClicked()
                          }}>

                    <input type="text" className="selected-country border-2 z-10
                    outline-none  text-center hover:cursor-pointer focus:outline-none text-indigo-500 font-semibold"
                           value={selectedCountryText}
                           placeholder="Select country"
                           onChange={(e) => {
                           }}
                    />

                     <HiChevronDown
                         className={`${countriesClicked ? "rotate-180" : "rotate-0"} cursor-pointer text-2xl  transition-all duration-400 block absolute top-[1%] right-1 z-10 `}

                     />
                    </span>

                    <div className="search w-[3%] cursor-pointer bg-red">
                        <span className="search-icon  text-2xl  ">
                            <IoSearchSharp className="text-blue-700 block"
                                           onClick={() => {
                                               handleClearSelectedDoctors()
                                               handleSearchDoctors()
                                               getAllDoctors()
                                               handleClearInput()
                                           }}/>
                        </span>
                    </div>

                    <ul className={`${countriesSelectShow ? "h-auto block" : " h-0 hidden"} countries absolute text-center list-none z-30  top-[36px] left-[8px]  w-[88%] cursor-pointer border overflow-y-scroll  bg-stone-100 transition-all
                    `}>
                        {
                            countryLoading ? <Skeleton className="h-8 w-30" times={8}/> : countryContent
                        }

                    </ul>

                </div>
                <div className="clear-conditions ml-12 text-sm text-red-700 font-bold cursor-pointer"
                     onClick={handleClearConditions}>
                    CLear
                </div>
                <div className="search-data flex flex-row justify-between border-2 border-stone-100 px-2 w-[69%]"
                >
                    <div className="country-selected w-[20%] ">
                        <span>Country</span>
                        <span className="text-indigo-500 font-semibold ml-2">{selectedCountryTextResult}</span>
                    </div>
                    <div className="specialty-selected w-6/12 ">
                        <span>Specialty</span>
                        <span
                            className="text-indigo-500 font-semibold mr-2"> {selectedDoctorSpecialtyResult}
                            </span>
                    </div>
                    <div>
                        <span
                            className="text-indigo-500 font-semibold mr-2">
                            {Object.keys(selectedDoctors).length}
                        </span>
                        <span>selected</span>
                    </div>
                    <div>
                        result
                        <span className="text-indigo-500 h-full font-semibold mx-1"> {searchDoctorsResultCount}
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-full max-h-[60%] flex flex-row justify-between items-stretch mt-4 v  overflow-y-hidden">

                <div className="specialty-bar overflow-y-scroll  w-4/12">
                    <DoctorSpecialties
                        sendParent={handleChildValue}
                        clearInput={clearInput}
                        clearSpecialty={clearSpecialty}
                    />
                </div>

                <div className="flex flex-col w-10/12 ml-2 overflow-y-scroll ">
                    <div className="data-show flex flex-row flex-wrap justify-center  ml-3 pt-2 mr-2">
                        {/*Pagination*/}
                        {doctors?.length > 0 &&
                            <Pagination currentPage={currentPage} totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                            />
                        }
                        <table className="w-full mt-5">
                            <tbody className="w-full">
                            <tr className="w-full flex justify-between items-baseline ">
                                <td className="mr-3">
                                    <input type="checkbox" className=" w-[20px] h-[20px]"
                                           checked={isSelectAll}

                                           onChange={() => {
                                               handleSelectAll();
                                               handleSelectAllChecked()
                                               // handleSelectAllDoctors()
                                           }}
                                    />
                                </td>
                                <td className="text-sm w-[15%]">Select all</td>
                                <td className="text-sm w-[50%] ml-2 ">Select all just if your search include
                                    specialty
                                </td>
                                <td className="  w-[25%] flex flex-row justify-center">
                                    <button onClick={() => {
                                        handleSelectedReceivers()
                                        handleValidateCreateCampaign()
                                        handleShowModal()
                                    }}
                                            className="block p-1 border border-amber-400
                                            rounded-full text-violet-700 font-bold">
                                        Create campaign
                                    </button>
                                </td>
                            </tr>
                            {loading ? <Skeleton className="h-8 w-30" times={20}/>
                                :
                                doctors.length > 0 ? doctors?.map((doctor, index) => {
                                    return <tr key={doctor._id}
                                               className="border-b-[1px] w-full flex flex-row justify-between items-center text-xs mb-2  ">
                                        <td key={doctor._id} className="w-[5%] flex flex-row justify-start relative  ">
                                            <input type="checkbox" value={doctor._id} id={doctor._id}
                                                   className="w-[20px] h-[20px] "
                                                   checked={isSelected(doctor._id)}
                                                //    checked={!!checkedItems[doctor._id]}
                                                // onClick={(e) => handleSelectedDoctor(e)}
                                                   onChange={
                                                       (e) => {
                                                           handleChecked(doctor._id)
                                                           // handleSelectedReceivers(doctor._id)
                                                           // handleCheckboxChange(doctor._id)
                                                           // handleSelectedDoctor(e)
                                                       }
                                                   }
                                            />
                                        </td>
                                        <td className="w-[25%] ">{doctor.fname + "" + doctor.lname}</td>
                                        <td className="w-[32%]">{doctor.specialty.title}</td>
                                        <td className="w-[17%]">{doctor.country.title}</td>
                                        <td className="w-[10%]">{doctor.language.title}</td>
                                        <td className="w-[7%]">
                                            <img src={doctor.image} className="w-10 h-10"
                                                 alt={(doctor.fname + "" + doctor.lname).toUpperCase()}/>
                                        </td>
                                    </tr>
                                }) : <div className="flex justify-center mt-8 font-semibold text-red-600">
                                    No doctors found belong to your conditions.
                                </div>
                            }

                            </tbody>
                        </table>
                        {doctors?.length > 0 &&
                            <Pagination currentPage={currentPage} totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                            />
                        }

                        <div/>
                        {/*End Pagination*/}
                    </div>

                </div>
            </div>
            {showModal && <Modal receivers={[...selectedReceivers]} onClose={handleCloseModal}/>}
        </div>
    );
}

export default Campaigns;