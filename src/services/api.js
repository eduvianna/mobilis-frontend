import axios from 'axios';

const api = axios.create({ baseURL: 'http://app-mobilis:3333' });

export default api;
