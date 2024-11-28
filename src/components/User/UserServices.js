import React from 'react';
import {MdConstruction} from "react-icons/md";

function UserServices() {
    return (
        <div className="w-full flex flex-row justify-center items-center ">
            <div className=" my-[10%]  flex flex-row justify-center items-center">
                <span className="mx-auto text-3xl font-semibold">Under Construction </span>
                <span className="text-[100px] text-yellow-400 ml-8"><MdConstruction/></span>
            </div>

        </div>
    );
}

export default UserServices;