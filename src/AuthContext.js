import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setisLoggedIn, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
