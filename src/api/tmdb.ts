export const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
export const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + API_KEY
  }
};