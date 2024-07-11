import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://185.178.46.58:5010',
});

export default instance;