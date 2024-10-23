import axios from 'axios';
const customAxios = axios.create({
    baseURL: 'https://uphillmountainapi.store',
    timeout: 3000,
    withCredentials: true
})
export default customAxios;