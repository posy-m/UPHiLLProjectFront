import axios from 'axios';
const customAxios = axios.create({
    baseURL: 'http://127.0.0.1:4000',
    timeout: 3000,
    withCredentials: true
})
export default customAxios;