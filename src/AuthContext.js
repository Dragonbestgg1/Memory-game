import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setisLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setisLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
