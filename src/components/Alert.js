import React from 'react';
import {useAlert} from "../context/AlertProvider";
import {IoClose} from "react-icons/io5";

function Alert() {
    const {alert, hideAlert} = useAlert();

    if (!alert.visible) return null;
    const alertStyle = {
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: alert.type === "success" ? "#d4edda" : "#f8d7da",
        color: alert.type === "success" ? "#155724" : "#721c24",
        padding: "15px 40px 15px 15px", // Add padding for the close button
        border: `1px solid ${alert.type === "success" ? "#c3e6cb" : "#f5c6cb"}`,
        borderRadius: "5px",
        fontSize: "16px",
        zIndex: 1000,
        transition: "opacity 0.5s ease-in-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    };

    const closeButtonStyle = {
        position: "absolute",
        top: "5px",
        right: "10px",
        padding: "1px",
        background: "none",
        color: alert.type === "success" ? "#155724" : "#721c24",
        border: `1px solid ${alert.type === "success" ? "#155724" : "#721c24"} `,
        borderRadius: "4px",
        fontSize: "16px",
        cursor: "pointer",
    };


    return (
        <div style={alertStyle} className="alert relative">
            <span style={closeButtonStyle} onClick={hideAlert}>
                <IoClose/>
            </span>
            {alert.message}
        </div>
    );
}


export default Alert;