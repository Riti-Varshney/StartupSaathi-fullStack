import React, { createContext, useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { authDataContext } from './authContext';
import axios from 'axios';

export const userDataContext = createContext();
const UserContext = ({ children }) => {
    let [userData, setUserData] = useState(null);
    let { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async (req,res) => {
    try {
        let result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, { withCredentials: true });
        setUserData(result.data);
        console.log(result.data);
        console.log(result.data.role);

    } catch (error) {
        setUserData(null);
        console.log(error);
    }
}

    useEffect(() => {
        getCurrentUser();
    }, [])


    let value = {
        userData, setUserData, getCurrentUser
    };

    return (
        <div>
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default UserContext
