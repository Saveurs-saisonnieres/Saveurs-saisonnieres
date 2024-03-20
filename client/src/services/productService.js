import { API_URL_PRODUCTS } from '../constants';
import axios from 'axios';


function GetProducts() {
  return axios.get(API_URL_PRODUCTS);
}
export default GetProducts