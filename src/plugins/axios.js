import Axios from 'axios';

const token = JSON.parse(localStorage.getItem('auth'));
const apiClient = Axios.create({
   /*  baseURL: 'http://localhost:3200/api', */
   baseURL:'https:proyecto-1-js.onrender.com/api',
    headers: {
        "x-token": token.token
    }
});

export default apiClient;