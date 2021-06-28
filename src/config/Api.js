import axios from "axios";

const Api = axios.create({
    baseURL: 'https://talktoapi.abdulmajid.me',
  });

export default Api;