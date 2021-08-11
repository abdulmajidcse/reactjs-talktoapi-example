import axios from "axios";

const Api = axios.create({
    baseURL: 'https://talktoapi.abdulmajid.me/api',
  });

export default Api;