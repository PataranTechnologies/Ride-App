import * as axios from 'axios';

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  baseURL: 'http://ride.danthoppruebas.com/api',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  },
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
  APIKit.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  /*APIKit.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });*/
};

export default APIKit;