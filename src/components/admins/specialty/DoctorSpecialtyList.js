import {useFetchDoctorSpecialtiesQuery, useAddDoctorSpecialtyMutation} from "../../../store";
import React, {useState} from "react";
import Skeleton from "../../Skeleton";

const DoctorSpecialtyList = ({specialty}) => {
    const {data, error, isFetching} = useFetchDoctorSpecialtiesQuery(specialty);
    const [addSpecialty, result] = useAddDoctorSpecialtyMutation();
    const [title, setTitle] = useState('');

    const handleAddSpecialty = () => {
        if (title) {
            const newSpecialty = {title: title};
            addSpecialty(newSpecialty);
            setTitle('');

        }
    }

    let content;

    if (isFetching) {
        content = <Skeleton className="w-4 h3" times={3}/>
    } else if (error) {
        content = <div>Error loading...</div>
    } else {
        // setDataCount(data.data.count)
        content = data.data.map((specialty) => {
            return <div key={specialty.id}>{specialty.title}</div>
        });
    }

    return (
        <>
            <div
                className="create-specialty min-w-[80%] my-10 flex flex-row justify-between sm:mx-auto sm:w-full sm:max-w-md">
                <div className="form_add-specialty w-5/12  relative rounded-md">
                    <h2 className="mb-4">Create Doctor Specialty</h2>
                    <form onSubmit={event => event.preventDefault()}>
                        <input type="text" value={title}
                               onChange={(e) => {
                                   setTitle(e.target.value)
                               }}
                               autoComplete="off"
                               required
                               className=" block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none shadow-sm  focus:shadow-outline-lime focus:border-lime-400 transition duration-150
                                       text-lg text-stone-700  ease-in-out  sm:leading-5"
                        />
                        {/*<button onClick={handleAddSpecialty}>create specialty</button>*/}

                    </form>
                    <div className="mt-6 block w-full flex justify-between rounded-md">
                        <button onClick={handleAddSpecialty}
                                className="w-full flex justify-center py-2 px-4  shadow-sm shadow-lime-400 border border-transparent sm:text-sm font-extrabold rounded-md  text-red-800 border-2 border-stone-400 bg-lime-400 hover:border-indigo-300  transition-all duration-150 ease-in-out">
                            Create Specialty
                        </button>
                    </div>
                </div>

                <div className="doctor-specialties-list w-6/12 h-auto text-left">
                    <h2 className="mb-2 border-1 border-lime-400 shadow-sm py-2 text-lg font-bold rounded text-center text-sky-900">Doctor
                        specialties
                        <span className="text-red-700">{` [ ${data && data.count} ]`}</span>
                    </h2>
                    {content}
                </div>
            </div>
        </>
    );
};

export default DoctorSpecialtyList;