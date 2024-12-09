import React, {useEffect, useState} from 'react';
import useAuth from "../../hooks/useAuth";

import Skeleton from "../Skeleton";
import axios from "axios";
import BASE_URL from "../../app/apis/baseUrl";
import Pagination from "../Pagination";
import {HiChevronDown} from "react-icons/hi";
import {IoSearchSharp} from "react-icons/io5";
import DoctorSpecialties from "./DoctorSpecialties";
import Modal from "../organization/Modal";
import {Link} from "react-router-dom";

const DoctorsList = ({doctor}) => {

    const {auth} = useAuth();
    const doctorData = {...auth}

    const [doctors, setDoctors] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [doctorSpecialty, setDoctorSpecialty] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedDoctorSpecialty, setSelectedDoctorSpecialty] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [countriesSelectShow, setCountriesSelectShow] = useState(false);
    const [countriesClicked, setCountriesClicked] = useState(false);
    const [selectedCountryText, setSelectedCountryText] = useState('');
    const [searchDoctorsResult, setSearchDoctorsResult] = useState([])
    const [allSelectedDoctors, setAllSelectedDoctors] = useState([])
    const [checkedItems, setCheckedItems] = useState({});
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [clearInput, setClearInput] = useState(false);

    /*Pagination const*/
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    //End pagination const

    const [search, setSearch] = useState('');

    const handleClearInput = () => {
        setClearInput(true)
        setTimeout(() => setClearInput(false), 0);
    }

    let countryContent;
    useEffect(() => {
        const getCountries = async () => {
            const response = await axios.get(`${BASE_URL}/countries`)
            const result = response?.data?.data
            setCountries(result)
        }

        (async () => await getCountries())();
    }, []);

    const handleSearchDoctors = () => {
        setSelectedCountryText('');
        handleClearInput();
    }

    const handleSelectedDoctor = (e) => {
        const isSelected = allSelectedDoctors.indexOf(e.target.value);
        console.log(isSelected)

        if (isSelected === -1) {
            setAllSelectedDoctors([...allSelectedDoctors, e.target.value]);


        } else {
            const newSelectedDoctors = allSelectedDoctors.filter(doctor => doctor !== e.target.value)
            console.log(newSelectedDoctors)
            setAllSelectedDoctors([...newSelectedDoctors]);
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
        // console.log(doctorSpecialty._id)
    }

    const handleShowModal = () => {
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
        return loading ? <Skeleton className="w-5 h-5" times={5}/>
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


    useEffect(() => {
        setSelectedDoctorSpecialty(doctorSpecialty)
    }, [doctorSpecialty]);


    const getAllDoctors = async (page) => {
        // console.log(selectedCountry, selectedDoctorSpecialty)
        setSelectedCountry('');
        setSelectedDoctorSpecialty('')
        try {
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/doctors?`, {
                params: {page, limit: itemsPerPage, country: selectedCountry, specialty: selectedDoctorSpecialty._id}
            });
            const result = response?.data.data;

            setDoctors(result);
            setTotalPages(response?.data.pages);
            // console.log(totalPages)
            // console.log(result)
        } catch (error) {
            // console.error('Fetch error:', error);
            setError(`Fetch error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllDoctors(currentPage);
    }, [currentPage, searchDoctorsResult]);


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

                    <div className="search w-[3%] cursor-pointer bg-red ">
                        <span className="search-icon text-2xl  ">
                            <IoSearchSharp className="text-red-600 block"
                                           onClick={() => {
                                               handleSearchDoctors()
                                               getAllDoctors()
                                               handleClearInput()
                                           }}/>
                        </span>
                    </div>

                    <ul className={`${countriesSelectShow ? "h-auto block" : " h-0 hidden"} countries absolute text-center list-none z-30  top-[36px] left-[8px]  w-[88%] cursor-pointer border overflow-y-scroll  bg-stone-100 transition-all
                    `}>
                        {
                            loading ? <Skeleton className="h-8 w-30" times={8}/> : countryContent
                        }

                    </ul>

                </div>
                {/*<div className="search-data flex flex-row justify-between   border-2 border-stone-100 px-2 w-[69%]">*/}
                {/*    <div>*/}
                {/*        <span*/}
                {/*            className="text-indigo-500 font-semibold mr-2">*/}
                {/*            {Object.keys(allSelectedDoctors).length}*/}
                {/*        </span>*/}
                {/*        <span>doctors selected</span>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <span>result</span>*/}
                {/*        <span className="text-indigo-500 font-semibold"> {doctors.length} </span>doctors*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

            <div className="w-full max-h-[60%] flex flex-row justify-between items-stretch mt-4 v  overflow-y-hidden">

                <div className="specialty-bar overflow-y-scroll  w-4/12">
                    {/*<input type="text"*/}
                    {/*    // onChange={(e) => handleSearch(e)}*/}
                    {/*       className="border w-full rounded mb-2 text-base  outline-none focus:outline-none p-1"*/}
                    {/*    // value={search}*/}
                    {/*/>*/}
                    <DoctorSpecialties sendParent={handleChildValue} clearInput={clearInput}/>
                </div>

                <div className="flex flex-col w-10/12 ml-2 overflow-y-scroll ">
                    <div className="data-show flex flex-row flex-wrap justify-center  ml-3 pt-2 mr-2">
                        {/*Pagination*/}
                        <table className="w-full">
                            <tbody className="w-full">
                            {/*<tr className="w-full flex justify-start items-baseline">*/}
                            {/*    <td className="mr-3">*/}
                            {/*        <input type="checkbox" className=" w-[20px] h-[20px]"*/}
                            {/*               checked={isSelectAll}*/}
                            {/*               onChange={() => {*/}
                            {/*                   handleSelectAll();*/}
                            {/*                   handleSelectAllDoctors()*/}
                            {/*               }}*/}
                            {/*        />*/}
                            {/*    </td>*/}
                            {/*    <td>Select all</td>*/}
                            {/*    <td className="  w-[60%] flex flex-row justify-center">*/}
                            {/*        <button onClick={handleShowModal}*/}
                            {/*                className="block p-1 border border-amber-400*/}
                            {/*                rounded-full text-violet-700 font-bold">*/}
                            {/*            Create*/}
                            {/*            campaign*/}
                            {/*        </button>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            {loading && <Skeleton className="h-8 w-30" times={20}/>}
                            {error && <div>Error Loading</div>}
                            {
                                doctors.length > 0 ? doctors?.map((doctor, index) => {
                                    return <Link to={`/doctor-info/${doctor._id}`} key={doctor.id}>
                                        <tr key={doctor._id}
                                            className="border-b-[1px] w-full flex flex-row justify-between items-center text-xs mb-2  ">
                                            {/*<td key={doctor._id} className="w-[5%] flex flex-row justify-start relative  ">*/}
                                            {/*    <input type="checkbox" value={doctor._id} id={doctor._id}*/}
                                            {/*           className="w-[20px] h-[20px] "*/}
                                            {/*        // checked={!!checkedItems[doctor._id]}*/}
                                            {/*           checked={!!checkedItems[doctor._id]}*/}
                                            {/*        // onClick={(e) => handleSelectedDoctor(e)}*/}
                                            {/*           onChange={*/}
                                            {/*               (e) => {*/}
                                            {/*                   handleCheckboxChange(doctor._id)*/}
                                            {/*                   handleSelectedDoctor(e)*/}
                                            {/*               }*/}
                                            {/*           }*/}
                                            {/*    />*/}
                                            {/*</td>*/}
                                            <td className="w-[25%] ">{doctor.fname + "" + doctor.lname}</td>
                                            <td className="w-[32%]">{doctor.specialty.title}</td>
                                            <td className="w-[17%]">{doctor.country.title}</td>
                                            <td className="w-[10%]">{doctor.language.title}</td>
                                            <td className="w-[7%]">
                                                <img src={doctor.image} className="w-10 h-10"
                                                     alt={(doctor.fname + "" + doctor.lname).toUpperCase()}/>
                                            </td>
                                        </tr>
                                    </Link>
                                }) : <div className="flex justify-center mt-8 font-semibold text-red-600">
                                    No doctors found belong to your conditions.
                                </div>
                            }

                            </tbody>
                        </table>
                        {doctors?.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages}
                                                            onPageChange={setCurrentPage}/>}

                        <div/>
                        {/*End Pagination*/}
                    </div>

                </div>
            </div>
            {/*{showModal && <Modal receivers={[...allSelectedDoctors]} onClose={handleCloseModal}/>}*/}
        </div>
    );
};

export default DoctorsList;