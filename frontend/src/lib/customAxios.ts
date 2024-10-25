import axios from 'axios';
const customAxios = axios.create({
    baseURL: 'https://uphillmountain.store/back',
    timeout: 3000,
    withCredentials: true
})
export default customAxios;