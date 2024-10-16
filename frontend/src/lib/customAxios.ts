import axios from 'axios';
const customAxios = axios.create({
    baseURL: true ? 'http://127.0.0.1:4000' : 'http://api주소',
    timeout: 3000,
    withCredentials: true
})
export default customAxios;