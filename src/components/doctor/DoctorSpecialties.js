import {useFetchDoctorSpecialtiesQuery} from "../../store";
import React, {useState} from "react";
import Skeleton from "../Skeleton";

const DoctorSpecialties = ({sendParent}) => {
    const {data, error, isFetching} = useFetchDoctorSpecialtiesQuery();


    let content
    if (isFetching) {
        content = <Skeleton className="w-6 h6" times={3}/>
    } else if (error) {
        content = <div>Error loading...</div>
    } else {
        content = data.data.map((specialty, index) => {
            const title = specialty.title.trim()
            return <button key={index}
                           className="block rounded-lg bg-yellow-50 w-full text-left p-2 mb-2 text-indigo-700 font-semibold hover:bg-yellow-400 hover:text-violet-900 transition-all"
                           onClick={() => {
                               sendParent(title)
                           }}
            >{specialty.title.trim()}</button>
        });
    }
    return (
        <div className="border-2 p-2 h-4/12">
            {content ? content : <Skeleton className="w-full h-5" times={10}/>}
        </div>
    );
};

export default DoctorSpecialties;