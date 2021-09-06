export const tokenName = 'reactjs_practise_access_token';

export const setToken = (accessToken) => localStorage.setItem(tokenName, accessToken);

export const getToken = () => localStorage.getItem(tokenName);

export const removeToken = () => localStorage.removeItem(tokenName);
