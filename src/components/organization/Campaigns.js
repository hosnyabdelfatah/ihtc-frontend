import './campaign.scss';
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";

import {getCurrentUser} from "../../features/currentUserSlice";
import DoctorSpecialties from "../doctor/DoctorSpecialties";
import {useFetchCountriesQuery} from "../../app/apis/countryApi";
import React, {useEffect, useRef, useState} from "react";
import BASE_URL from "../../app/apis/baseUrl";
import Countries from "../Countries";
import Modal from "../Modal";
import {HiChevronDown} from "react-icons/hi";
import {IoSearchSharp} from "react-icons/io5";

const Campaigns = () => {
    const dispatch = useDispatch()
    const effectRan = useRef(false);

    const organization = useSelector(getCurrentUser);
    const [doctorCategory, setDoctorCategory] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedDoctorCategory, setSelectedDoctorCategory] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [countriesSelectShow, setCountriesSelectShow] = useState(false);
    const [countriesClicked, setCountriesClicked] = useState(false);
    const [selectedCountryText, setSelectedCountryText] = useState('');
    // const [countryText, setCountryText] = useState('...');
    const [doctors, setDoctors] = useState({});
    const [searchDoctorsResult, setSearchDoctorsResult] = useState([])
    const [allSelectedDoctors, setAllSelectedDoctors] = useState([])
    const [checkedItems, setCheckedItems] = useState({});
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [showModal, setShowModal] = useState(false);

    /*Pagination const*/
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    //End pagination const


    let countryContent;
    useEffect(() => {
        const getCountries = async () => {
            const response = await axios.get(`${BASE_URL}countries`)
            const result = response?.data?.data
            setCountries(result)
        }

        (async () => await getCountries())();

    }, []);

    const handleSelectedDoctor = (e) => {
        const isSelected = allSelectedDoctors.indexOf(e.target.value);
        if (isSelected === -1) {
            setAllSelectedDoctors([...allSelectedDoctors, e.target.value]);
        } else {
            const newSelectedDoctors = allSelectedDoctors.filter(doctor => doctor !== e.target.value)
            setAllSelectedDoctors(newSelectedDoctors);
        }
    }

    const handleSelectAll = () => {
        const newCheckedItems = {};
        const doctorsArray = searchDoctorsResult.length > 0 ? searchDoctorsResult : doctors;
        if (!isSelectAll) {
            doctorsArray.forEach(doctor => {
                newCheckedItems[doctor.id] = true; // Mark all items as checked
            });

        }
        setCheckedItems(newCheckedItems);
        setIsSelectAll(!isSelectAll);
    };

    const handleSelectAllDoctors = () => {
        let selectedDoctorsIdsArray
        if (!isSelectAll) {
            const selectedDoctors = searchDoctorsResult.map(doctor => setAllSelectedDoctors([...allSelectedDoctors, doctor._id]));


            setAllSelectedDoctors(Object.keys(checkedItems));
        } else {
            setAllSelectedDoctors([])
        }

        //    :TODO Fix select all when I un check 1 of the select all checkboxes it's increment not decrement.
        // selectedDoctorsIdsArray = [Object.keys(checkedItems)]
        setAllSelectedDoctors([...Object.keys(checkedItems)]);
        console.log(allSelectedDoctors)
        console.log(selectedDoctorsIdsArray)
        console.log(Object.keys(checkedItems).length, checkedItems)
    }

    const handleCheckboxChange = (id) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems, [id]: !prevCheckedItems[id]
        }))
    }

    const handleSelectCountry = (id) => {
        setSelectedCountry(id)
        setSelectedCountryText(countries.filter(country => country._id === id)[0].title)
    }

    const handleSearchDoctors = () => {
        setIsSelectAll(false)
        setAllSelectedDoctors([])
        setCheckedItems([])
        const result = doctors.length > 0 && doctors?.filter((doctor) => {
            if (selectedCountryText !== "" && selectedDoctorCategory !== "") {
                return doctor.country.title === selectedCountryText.trim() && doctor.specialty.title === selectedDoctorCategory.trim();
            } else if (selectedCountryText !== "" && selectedDoctorCategory === "") {
                return doctor.country.title === selectedCountryText
            } else if (selectedCountryText === "" && selectedDoctorCategory !== "") {
                return doctor.specialty.title === selectedDoctorCategory;
            } else {
                return doctor;
            }
        });
        if (result.length > 0) {
            setSearchDoctorsResult(result)
            setMaxPageNumberLimit(Math.ceil(result.length / itemsPerPage))
            setSelectedDoctorCategory('')
            setSelectedCountryText('')
            setSelectedCountry('')
        } else {
            setSearchDoctorsResult([])
        }

    }


    const handleCountriesSelectShow = () => {
        setCountriesSelectShow(!countriesSelectShow);
    }

    const handleCountriesClicked = () => {
        setCountriesClicked(!countriesClicked);
    }

    const handleChildValue = (value) => {
        setDoctorCategory(value)
    }

    const handleShowModal = () => {
        setShowModal(!showModal);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    countryContent = countries?.map(country => {
        return <li value={country._id} key={country._id}
                   className="py-1 border-b-[1px] border-b-amber-400 cursor-pointer hover:bg-yellow-200"
                   onClick={() => {
                       handleCountriesClicked()
                       handleSelectCountry(country._id)
                       handleCountriesSelectShow()
                   }}
        >
            {country.title}
        </li>
    })


    const getAllDoctors = async () => {
        const response = await axios.get(`${BASE_URL}doctors`);
        const result = response?.data?.data

        if (result?.length > 0) {
            setDoctors([...result]);
        }
    }

    useEffect(() => {
        setSelectedDoctorCategory(doctorCategory)
    }, [doctorCategory]);


    /////Pagination
    const renderData = (data) => {
        return (
            <ul>
                {data.length > 0 && data?.map((todo, index) => {
                    return <li key={index}>{todo.title}</li>;
                })}
            </ul>
        );
    };


    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const pages = [];
    for (let i = 1; i <= Math.ceil(doctors.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = searchDoctorsResult.length > 0 ? searchDoctorsResult.slice(indexOfFirstItem, indexOfLastItem) : doctors.length > 0 && doctors.slice(indexOfFirstItem, indexOfLastItem);
    const renderCurrentItems = currentItems.length > 0 && currentItems.map((doctor, index) => {
        return <tr
            className="border-b-[1px] w-full flex flex-row justify-between items-center text-xs mb-2 pb-1 ">
            <td key={doctor._id} className="w-[5%] flex flex-row justify-start relative  ">
                <input type="checkbox" value={doctor._id} id={doctor._id} className="w-[20px] h-[20px] "
                       checked={!!checkedItems[doctor._id]}
                       onClick={(e) => handleSelectedDoctor(e)}
                       onChange={() => handleCheckboxChange(doctor._id)}
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

    })

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage === number ? "active" : null}
                >
                    {number}
                </li>
            );
        } else {
            return null;
        }
    });
    //:TODO set maxPageNumberLimit, minPageNumberLimit and pageNumberLimit by select options
    const handleNextBtn = () => {
        setCurrentPage(currentPage + 1);
        // console.log(maxPageNumberLimit)
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextBtn}> &hellip; </li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevBtn}> &hellip; </li>;
    }
    ////////End Pagination

    useEffect(() => {
        if (effectRan.current === true) {
            (async () => await getAllDoctors())();
            handleSearchDoctors();
        }
        return () => {
            effectRan.current = true;
        }
    }, []);


    return (
        <div className="w-[90%] mx-auto relative max-h-screen flex flex-col mb-8">

            <div
                className="search-bar  w-full min-h-8 flex flex-row justify-between items-center ">
                <div className="selected-country_container relative w-[30%]
                p-2 outline-none active:outline-none flex flex-row items-center
                ">
                    <span className="relative mr-3"
                          onClick={() => {
                              handleCountriesSelectShow()
                              handleCountriesClicked()
                          }}>

                    <input type="text" className="selected-country border-2 z-10
                    outline-none  text-center focus:outline-none text-indigo-500 font-semibold"
                           value={selectedCountryText}
                           placeholder="Select country"/>

                     <HiChevronDown
                         className={`${countriesClicked ? "rotate-180" : "rotate-0"} cursor-pointer text-2xl  transition-all duration-400 block absolute top-[1%] right-1 z-10 `}

                     />
                    </span>

                    <div className="search w-[3%]" onClick={() => {
                        handleSearchDoctors()
                    }}>
                        <span className="search-icon text-xl text-[#0657A8]"><IoSearchSharp/></span>
                    </div>

                    <ul className={`${countriesSelectShow ? "h-auto block" : " h-0 hidden"} countries absolute text-center list-n top-[36px] left-[8px]  w-3/4 cursor-pointer  bg-stone-100 transition-all
                    `}>
                        {countryContent}
                    </ul>

                </div>
                <div className="search-data flex flex-row justify-between   border-2 border-stone-100 px-2 w-[69%]">
                    <div>
                        <span className="mr-1">Country selected is </span>
                        <span className="font-semibold text-indigo-500">
                            {selectedCountryText ? selectedCountryText : "......"}
                        </span>
                    </div>
                    <div>
                        <span className="text-indigo-500 font-semibold mr-2"> {allSelectedDoctors.length}</span>
                        <span>doctors selected</span>
                    </div>
                    <div>
                        <span>result</span>
                        <span className="text-indigo-500 font-semibold"> {searchDoctorsResult.length} </span>doctors
                    </div>
                </div>
            </div>

            <div className="w-full max-h-[60%] flex flex-row justify-between mt-4 v  overflow-y-scroll">

                <div className="specialty-bar overflow-y-scroll  w-4/12">
                    <DoctorSpecialties sendParent={handleChildValue}/>
                </div>

                <div className="flex flex-col w-10/12 ml-2">
                    <div className="data-show flex flex-row flex-wrap h-auto justify-center  ml-3 pt-2 mr-2">
                        {/*Pagination*/}
                        <table className="w-full">
                            <tbody className="w-full">
                            <tr className="w-full flex justify-start items-baseline">
                                <td className="mr-3">
                                    <input type="checkbox" className=" w-[20px] h-[20px]"
                                           checked={isSelectAll}
                                           onChange={() => {
                                               handleSelectAll();
                                               handleSelectAllDoctors()
                                           }}
                                    />
                                </td>
                                <td>Select all</td>
                                <td className="  w-[60%] flex flex-row justify-center">
                                    <button onClick={handleShowModal}
                                            className="block p-1 border border-amber-400
                                            rounded-full text-violet-700 font-bold">
                                        Create
                                        campaign
                                    </button>
                                </td>
                            </tr>
                            {renderCurrentItems}
                            </tbody>
                        </table>
                        {/*:TODO fix pagination*/}

                        <ul
                            className="pageNumbers w-[50%] list-none flex flex-row justify-evenly items-center"
                        >
                            <li>
                                <button className={`${currentPage === pages[0] && " unactive "}`}
                                        onClick={handlePrevBtn}
                                        disabled={currentPage === pages[0]}
                                >
                                    Prev
                                </button>
                            </li>
                            {pageDecrementBtn}
                            {renderPageNumbers}
                            {pageIncrementBtn}

                            <li>
                                <button className={`${currentPage === pages[pages.length - 1] && " unactive "}`}

                                        onClick={handleNextBtn}
                                        disabled={currentPage === pages[pages.length - 1]}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                        <div/>
                        {/*End Pagination*/}
                    </div>

                </div>
            </div>
            {showModal && <Modal receivers={[...Object.keys(checkedItems)]} onClose={handleCloseModal}/>}
        </div>
    );
}

export default Campaigns;