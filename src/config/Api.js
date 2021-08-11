import axios from "axios";

const Api = axios.create({
    baseURL: 'http://talktoapi.test/api',
  });

export default Api;