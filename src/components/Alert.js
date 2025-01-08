import React from 'react';
import {useAlert} from "../context/AlertProvider";
import {IoClose} from "react-icons/io5";

function Alert() {
    const {alert} = useAlert();

    if (!alert.visible) return null;
    const alertStyle = {
        position: "fixed",
        top: "30px",
        left: "30px",
        background: alert.type === "success" ? "#d4edda" : "#f8d7da",
        color: "#155724",
        padding: "15px",
        border: `1px solid ${alert.type === "success" ? "#c3e6cb" : "#f5c6cb"} `,
        borderRadius: "5px",
        fontSize: "16px",
        fontWeight: "bold",
        zIndex: 1000,
        transition: "opacity 0,5s ease-in-out",
    };

    const handleCloseAlert = () => alert.hideAlert();

    return (
        <div style={alertStyle} className="alert relative">
            <span
                className={`${alert.type === 'success' ? "text-green-500" : "text-red-600"} close-alert absolute right-2 top-1 text-lg border rounded rounded-md`}
                onClick={handleCloseAlert}
            >
                <IoClose/>
            </span>
            {alert.message}
        </div>
    );
}


export default Alert;