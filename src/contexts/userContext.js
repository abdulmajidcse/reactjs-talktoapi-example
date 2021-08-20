import React, { useContext, useState } from 'react';

export const UserContext = React.createContext({
    user: {
        authIs: false,
    },
    login: () => {},
    logout: () => {}
});

const USER = { authIs: false, name: 'Guest' };

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(USER);

    const login = (accessToken, user) => {
        localStorage.setItem('reactjs_practise_access_token', accessToken);
        setUser({authIs: true, ...user});
    };

    const logout = () => {
        localStorage.removeItem('reactjs_practise_access_token');
        setUser(USER);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const { user, login, logout } = useContext(UserContext);
    return { user, login, logout };
};