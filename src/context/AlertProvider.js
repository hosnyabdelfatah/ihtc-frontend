import React, {createContext, useContext, useState} from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({children}) => {
    const [alert, setAlert] = useState({message: "", type: "success", visible: false});

    const showAlert = (message, type = "success", duration = 5000) => {
        setAlert({message, type, visible: true});

        setTimeout(() => {
            setAlert({message: "", type: "success", visible: false});
        }, duration);
    };

    const hideAlert = () => {
        setAlert(({message: "", type: "success", visible: false}));
    }
    return (
        <AlertContext.Provider value={{alert, showAlert, hideAlert}}>
            {children}
        </AlertContext.Provider>
    );
};