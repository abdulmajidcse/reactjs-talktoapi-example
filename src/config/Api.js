import axios from "axios";

const Api = axios.create({
    baseURL: 'http://talktoapi.test',
  });

export default Api;