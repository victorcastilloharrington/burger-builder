import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-builder-b1403.firebaseio.com/'
});

export default instance;