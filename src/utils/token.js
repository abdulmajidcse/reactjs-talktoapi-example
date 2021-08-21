export const tokenName = 'reactjs_practise_access_token';

export const setToken = (accessToken) => {
    return localStorage.setItem(tokenName, accessToken);
};

export const getToken = () => {
    return localStorage.getItem(tokenName);
};

export const removeToken = () => {
    return localStorage.removeItem(tokenName);
};