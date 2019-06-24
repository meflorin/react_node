//import axios from 'axios';
const axios = require('axios');

export const axiosApiInstance = axios.create({
  baseURL: 'http://localhost:9000',
  xsrfCookieName: null,
});

export function about () {
  return axiosApiInstance
    .get('/', {})
    .catch(response => {
      throw response;
    });
}

export function regions () {
  return axiosApiInstance
    .get('/regions', {})
    .catch(response => {
      throw response;
    });
}

export function getCities(region) {
  return axiosApiInstance
    .get('/cities_by_region?region='+region, {})
    .catch(response => {
      throw response;
    });
}

export function addRegion(region) {
  return axiosApiInstance
    .post('/add_region', {
      region: region
    })
    .catch(response => {
      throw response;
    });
}

export function addCity(region, city) {
  return axiosApiInstance
    .post('/add_city', {
      region: region,
      city: city
    })
    .catch(response => {
      throw response;
    });
}