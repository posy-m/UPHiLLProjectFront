import axios from 'axios';
const customAxios = axios.create({
    baseURL: 'https://uphillmountain.store:4000',
    timeout: 3000,
    withCredentials: true
})
export default customAxios;