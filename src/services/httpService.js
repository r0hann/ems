import axios from 'axios';
import logger from './logService';
import {toast} from 'react-toastify';
import jwtDecode from "jwt-decode";

const tokenKey = 'token';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedError) {
        logger.log(error);
        toast.error('An upexpected error occured.');
    }

    return Promise.reject(error);
});

axios.interceptors.request.use(
    request => {
        checkToken();
        return request;
    }
);

function setJwt(jwt) {
    axios.defaults.headers.common['Authorization'] = jwt;
}

function checkToken() {
    // jwtDecode cannot be empty
    const jwt = localStorage.getItem(tokenKey);
    if (jwt) {
        const decodeToken = jwtDecode(jwt);
        if (decodeToken.exp*1000 < new Date()) {
            localStorage.removeItem(tokenKey);
            window.location = '/'
        }
    }
}


export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
};
