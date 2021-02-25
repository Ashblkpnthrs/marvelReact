import axios from 'axios';
import md5 from 'md5'
//import { API_KEY, HASH, TS } from 'react-native-dotenv';

const api = axios.create({
  baseURL: 'https://gateway.marvel.com',
});
const PUBLIC_KEY = '171e1910640a20fe5dd9db069ebb5d51'
const PRIVATE_KEY = '0e82bfd01428234895b37da5f108278344fbd8d1'
let ts = new Date().getTime()

api.interceptors.request.use(config => {
  config.params = config.params || {};
  config.params.apikey = PUBLIC_KEY;
  config.params.hash = md5(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`);
  config.params.ts = ts;
  config.params.format = 'comic'
  config.params.dateDescriptor = 'lastWeek'
  return config;
});

export default api;
