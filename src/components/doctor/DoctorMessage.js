// import './
import React, {useEffect, useRef, useState, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom";
import axios from "axios";
import Skeleton from "../Skeleton"
import useAuth from "../../hooks/useAuth";
import Pagination from "../Pagination";
import BASE_URL from "../../app/apis/baseUrl";
import MessageModal from "./MessageModal";
import {HiChevronDown} from "react-icons/hi";
import {IoSearchSharp} from "react-icons/io5";
import {useFetchOrganizationsQuery} from "../../app/apis/organozationApi";
// import OrganizationCard from "../organization/OrganizationCard";


const DoctorCampaigns = () => {
    const {auth} = useAuth();
    const doctor = {...auth};
    // console.log(doctor);

    const dispatch = useDispatch();
    const {data, error, isFetching} = useFetchOrganizationsQuery();

    let content;
    
    const [organizations, setOrganizations] = useState({});
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([])
    const [selectedOrganization, setSelectedOrganization] = useState({});
    const [selectedCountry, setSelectedCountry] = useState('');
    const [countriesSelectShow, setCountriesSelectShow] = useState(false);
    const [countriesClicked, setCountriesClicked] = useState(false);
    const [selectedCountryText, setSelectedCountryText] = useState('');

    const [showMessageModal, setShowMessageModal] = useState(false);
    // const [clearInput, setClearInput] = useState(false);

    /*Pagination const*/
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    //End pagination const

    const [search, setSearch] = useState('');

    const handleClearInput = () => {
        setSelectedCountryText('')
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

    const handleSelectCountry = (id) => {
        setSelectedCountry(id)
        setSelectedCountryText(countries.filter(country => country.id === id)[0].title)
    }

    const handleCountriesSelectShow = () => {
        setCountriesSelectShow(!countriesSelectShow);
    }

    const handleCountriesClicked = () => {
        setCountriesClicked(!countriesClicked);
        // console.log(selectedCountry)
    }


    const handleChildValue = (value) => {
        // console.log(doctorSpecialty)
        // console.log(doctorSpecialty._id)
    }

    const handleShowMessageModal = () => {
        setShowMessageModal(!showMessageModal);
    }

    const handleCloseModal = () => {
        setShowMessageModal(false);
    }

    const handleSelectedOrganization = (organization) => {
        setSelectedOrganization(organization);
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
        return isFetching ? <Skeleton className="w-full h-5" times={5}/>
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
    });

    if (isFetching) {
        content = <Skeleton times={8} className='h-full w-full'/>
    } else if (error) {
        console.log(error)
        content = <div>Error loading organizations.</div>
    } else {
        content = data.data.map((organization) => {
            // console.log(organization)
            return <div className="w-[22%] rounded-lg border-2 overflow-hidden mb-10 pb-2">
                {/*<Link to={`/organization-info/${organization.id}`}>*/}
                <div className="organization-data w-full">
                    <div className="organization_logo w-full h-[200px] overflow-hidden">
                        <img className="w-full h-full" src={organization.logo} alt={`${organization.name} logo`}/>
                    </div>
                    <div className="organization_info mt-5  ml-3 capitalize">
                        <h3 className="text-stone-700 font-semibold">{organization.name.toLowerCase()}</h3>
                        <h3 className="text-stone-700 font-semibold">{organization.country.title.toLowerCase()}</h3>
                        <h3 className="text-stone-700 font-semibold">{organization.industryField.toLowerCase()}</h3>
                    </div>
                    <button
                        className="block bg-lime-200 w-11/12 mx-auto border-2 rounded-lg mt-5 py-2 drop-shadow-md active:drop-shadow-none"
                        onClick={() => {
                            handleSelectedOrganization(organization);
                            handleShowMessageModal();
                        }}
                    > send
                        message
                    </button>
                </div>
                {/*</Link>*/}
            </div>
        })
    }


    return (
        <div className="w-[90%] mx-auto relative flex flex-col mb-8">

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

                    <input type="text" className="selected-country_input border-2 z-10
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
                            <IoSearchSharp className="text-red-600 block "
                                           onClick={() => {
                                               handleClearInput()
                                           }}/>
                        </span>
                    </div>

                    <ul className={`${countriesSelectShow ? "h-[300px] block" : " h-0 hidden"} countries absolute text-center list-none z-30  top-[36px] left-[8px]  w-[88%] cursor-pointer border overflow-y-scroll  bg-stone-100 transition-all
                    `}>
                        {
                            isFetching ? <Skeleton className="h-8 w-30" times={8}/> : countryContent
                        }

                    </ul>

                </div>
            </div>

            <div
                className="w-full max-h-[60%] flex flex-row flex-wrap justify-between items-stretch mt-4 v  overflow-y-hidden">
                {content}
                <div className="flex flex-col w-10/12 ml-2 overflow-y-scroll ">
                    <div className="data-show flex flex-row flex-wrap justify-center  ml-3 pt-2 mr-2">
                        {/*        /!*Pagination*!/*/}


                        {content?.length > 0 &&
                            <Pagination currentPage={currentPage} totalPages={totalPages}
                                        onPageChange={setCurrentPage}/>}

                        <div/>
                        {/*        /!*End Pagination*!/*/}


                    </div>

                </div>
            </div>
            {showMessageModal &&
                <MessageModal sender={doctor} receiver={selectedOrganization} onClose={handleCloseModal}/>}
        </div>
    );
}

export default DoctorCampaigns;