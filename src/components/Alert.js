import React from 'react';
import {useAlert} from "../context/AlertProvider";

function Alert() {
    const {alert} = useAlert();

    if (!alert.visible) return null;
    return (
        <div style={alertStyle}>
            {alert.message}
        </div>
    );
}

const alertStyle = {
    position: "fixed",
    top: "20px",
    left: "20px",
    background: "#d4edda",
    color: "#155724",
    padding: "15px",
    borderRadius: "5px",
    fontSize: "16px",
    zIndex: 1000,
    transition: "opacity 0,5s ease-in-out",
};

export default Alert;