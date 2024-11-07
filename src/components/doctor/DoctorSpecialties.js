import {useFetchDoctorSpecialtiesQuery} from "../../store";
import React, {useState} from "react";
import Skeleton from "../Skeleton";

const DoctorSpecialties = ({sendParent}) => {
    const {data, error, isFetching} = useFetchDoctorSpecialtiesQuery();

    const [search, setSearch] = useState('');
    
    let content
    if (isFetching) {
        content = <Skeleton className="w-full h-6" times={10}/>
    } else if (error) {
        content = <div>Error loading...</div>
    } else {
        content = data.data.filter((specialty) => {
            return search.toLowerCase() === ''
                ? specialty
                : specialty.title.toLowerCase().startsWith(search);
        }).sort((a, b) => {
                if (a.title < b.title) {
                    return -1
                }
                if (a.title > b.title) {
                    return 1
                }
                return 0
            }
        ).map((specialty, index) => {
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
            <form>
                <input type="text" onChange={(e) => setSearch(e.target.value)}
                       className="border w-full rounded mb-2 text-base  outline-none focus:outline-none p-1"
                />
            </form>
            {content ? content : <Skeleton className="w-full h-5" times={10}/>}
        </div>
    );
};

export default DoctorSpecialties;