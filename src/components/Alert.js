import React from 'react';
import {useAlert} from "../context/AlertProvider";
import {IoClose} from "react-icons/io5";

function Alert() {
    const {alert, hideAlert} = useAlert();

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

    const closeButtonStyle = {
        position: "absolute",
        top: "5px",
        right: "10px",
        background: "none",
        border: "none",
        color: alert.type === "success" ? "#155724" : "#721c24",
        fontSize: "16px",
        cursor: "pointer",
    };

    // const handleCloseAlert = () => setAlert(({message: "", type: "success", visible: false}));


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