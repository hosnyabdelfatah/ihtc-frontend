import {useDispatch} from "react-redux";
import {useFetchCountriesQuery} from "../app/apis/countryApi";
import React, {useEffect} from "react";

const Countries = ({sendTitle, countryClicked}) => {
    const dispatch = useDispatch();
    const {data, error, isLoading} = dispatch(useFetchCountriesQuery)
    let countryContent;

    const handleCountryClicked = () => {
        countryClicked()
    }

    const handleSendTitle = (e) => {
        sendTitle(e.target.title)
    }


    if (isLoading) {
        countryContent = <div>Is Loading...</div>
    } else if (error) {
        countryContent = <div>Error Loading</div>
    } else {
        countryContent = data?.data?.map(country => {
            return <li value={country._id} key={country._id}
                       className="py-1 border-b-[1px] border-b-amber-400 cursor-pointer hover:bg-yellow-200"
                       onClick={() => {
                           // handleCountriesClicked()
                           // handleSelectCountry(country._id)
                           // handleCountriesSelectShow()
                           handleCountryClicked();
                       }}
            >
                {country.title}
            </li>
        })
    }


    return (
        <div>
            {countryContent}
        </div>
    );
};

export default Countries;