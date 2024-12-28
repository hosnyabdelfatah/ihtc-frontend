import React, {createContext, useContext, useState} from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({children}) => {
    const [alert, setAlert] = useState({message: "", visible: false});

    const showAlert = (message, duration = 5000) => {
        setAlert({message, visible: true});

        setTimeout(() => {
            setAlert({message: "", visible: false});
        }, duration);
    };

    return (
        <AlertContext.Provider value={{alert, showAlert}}>
            {children}
        </AlertContext.Provider>
    );
};