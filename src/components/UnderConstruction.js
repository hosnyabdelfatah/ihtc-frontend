import React from 'react';
import {Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";

function UnderConstruction(props) {
    const {auth} = useAuth();
    return (
        <div className="mx-auto mt-12 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-semibold text-red-600">
                Under Construction
            </h2>
            <div className="home mt-8">
                <Link to={auth.lastName ? "/user" : "/"}
                      className="text-lg text-violet-700 font-semibold underline"
                >
                    Home
                </Link>

            </div>
        </div>
    );
}

export default UnderConstruction;