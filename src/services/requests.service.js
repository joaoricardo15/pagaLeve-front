import Axios from 'axios';

const API_CUSTOMERS_URL = 'https://cjzedhi6n9.execute-api.us-east-1.amazonaws.com/prod'

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Bearer XXX'
};

export const customersApi = Axios.create({ baseURL: API_CUSTOMERS_URL, headers });
