import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ov0g24c9ua.execute-api.eu-central-1.amazonaws.com/dev',
});

export default axiosInstance;