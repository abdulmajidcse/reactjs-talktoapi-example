const IsAuth = () => {
    let accessToken = localStorage.getItem('reactjs_practise_access_token');
    return accessToken ? true : false;
}

export default IsAuth;