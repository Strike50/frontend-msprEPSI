import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://app-76af27ba-b48e-48d9-a763-a8a67ece4a5c.cleverapps.io'
});

export default instance;