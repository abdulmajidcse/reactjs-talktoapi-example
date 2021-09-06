import React, { useContext, useState } from 'react';
import Api from '../config/Api';
import { getToken, removeToken } from '../utils/token';

export const UserContext = React.createContext({
    user: {
        authIs: false,
    },
    login: () => {},
    logout: () => {},
});

const USER = { authIs: false, name: 'Guest' };

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(USER);

    const logout = () => {
        const token = getToken();
        if (token) {
            Api.post(`/logout?token=${token}`).then(() => {});
        }
        removeToken();
        setUser(USER);
    };

    const login = () => {
        const token = getToken();
        if (token) {
            Api.get(`/user?token=${token}`)
                .then(({ data: { data } }) => {
                    setUser({ authIs: true, ...data });
                })
                .catch(() => {
                    logout();
                });
        }
    };

    return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
    const { user, login, logout } = useContext(UserContext);
    return { user, login, logout };
};
